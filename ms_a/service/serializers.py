from rest_framework import serializers

from .models import Car, Driver, Trip

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = serializers.ALL_FIELDS

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = serializers.ALL_FIELDS

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = serializers.ALL_FIELDS
