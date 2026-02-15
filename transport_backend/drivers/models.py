from django.db import models
from vehicles.models import Vehicle

class Driver(models.Model):
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    assigned_vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
