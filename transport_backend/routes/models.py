from django.db import models
from django.conf import settings

class Route(models.Model):
    from_location = models.CharField(max_length=100)
    to_location = models.CharField(max_length=100)
    bus_name = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    price = models.IntegerField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f"{self.bus_name} - {self.from_location} to {self.to_location}"


class Booking(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    seats_booked = models.IntegerField()


    def __str__(self):
        return f"{self.user.username} - {self.route.bus_name}"
