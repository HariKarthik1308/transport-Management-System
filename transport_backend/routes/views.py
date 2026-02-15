from django.core.mail import send_mail
from django.conf import settings

from rest_framework import viewsets, permissions
from .models import Route, Booking
from .serializers import RouteSerializer, BookingSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import json

User = get_user_model()


# ----------------------
# ROUTE VIEWSET
# ----------------------
class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer


# ----------------------
# BOOKING VIEWSET
# ----------------------
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
    # def perform_create(self, serializer):
    #     # TEMP FIX: assign default user id = 1
    #     serializer.save(user=User.objects.get(id=1))
    def perform_create(self, serializer):
        booking = serializer.save()

        # Send confirmation email
        send_mail(
            subject="🎫 Ticket Confirmation - Transport Booking",
            message=f"""
Your ticket has been confirmed!

Route: {booking.route.from_location} → {booking.route.to_location}
Bus: {booking.route.bus_name}
Seats Booked: {booking.seats_booked}
Departure: {booking.route.departure_time}

Thank you for booking with us!
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["useremail@gmail.com"],  # Replace with real user email later
            fail_silently=False,
        )

    # def perform_create(self, serializer):
    #     # TEMP FIX: Always assign booking to user ID 1
    #     serializer.save()


# ----------------------
# SEARCH ROUTES
# ----------------------
@csrf_exempt
def search_routes(request):
    from_location = request.GET.get("from")
    to_location = request.GET.get("to")

    routes = Route.objects.filter(
        from_location__iexact=from_location,
        to_location__iexact=to_location
    )

    data = []
    for route in routes:
        data.append({
            "id": route.id,
            "bus_name": route.bus_name,
            "departure_time": route.departure_time,
            "arrival_time": route.arrival_time,
            "price": route.price,
            "available_seats": route.available_seats
        })

    return JsonResponse(data, safe=False)


# ----------------------
# SIGNUP
# ----------------------
@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "User already exists"}, status=400)

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({"message": "User created successfully"}, status=201)

    return JsonResponse({"error": "Invalid request"}, status=400)


# ----------------------
# LOGIN
# ----------------------
@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            return JsonResponse({"message": "Login successful"}, status=200)

        return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
