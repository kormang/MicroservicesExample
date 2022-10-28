import uuid
from django.db import models

class Driver(models.Model):
    name = models.CharField(max_length=30)

class Car(models.Model):
    model = models.CharField(max_length=30)
    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        default=None
    )

class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    driver = models.ForeignKey(
        Driver,
        on_delete=models.RESTRICT,
        null=False,
        related_name='driver'
    )
    car = models.ForeignKey(
        Car,
        on_delete=models.RESTRICT,
        null=False,
        related_name='car'
    )
    start_time = models.DateTimeField(auto_now_add=True, null=False)
    end_time = models.DateTimeField(null=True)
