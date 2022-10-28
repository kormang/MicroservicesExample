from rest_framework import serializers

from service.models import Trip

class TripSerializer(serializers.Serializer):
    class Meta:
        model = Trip
        fields = serializers.ALL_FIELDS

