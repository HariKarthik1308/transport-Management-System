from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
import json

User = get_user_model()


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


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            return JsonResponse({"message": "Login successful"}, status=200)

        return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
