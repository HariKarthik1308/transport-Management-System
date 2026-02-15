from django.db import models

class Bus(models.Model):
    bus_number = models.CharField(max_length=20)
    bus_type = models.CharField(max_length=50)
    total_seats = models.IntegerField()

    def __str__(self):
        return self.bus_number
