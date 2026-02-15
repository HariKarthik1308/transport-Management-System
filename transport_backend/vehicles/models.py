from django.db import models

class Vehicle(models.Model):
    vehicle_number = models.CharField(max_length=20)
    vehicle_type = models.CharField(max_length=50)
    capacity = models.IntegerField()
    availability_status = models.BooleanField(default=True)
