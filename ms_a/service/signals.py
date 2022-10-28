from service.producers import publish_to_trips
from django.db.models.signals import post_save
from django.dispatch import receiver
from service.models import Trip
from service.serializers import TripSerializer


@receiver(post_save, sender=Trip)
def on_trip_post_save(sender, **kwargs):
    created = kwargs['created']
    trip = kwargs['instance']

    if created:
        type = 'started'
    elif trip.end_time is not None:
        type = 'ended'
    else:
        type = None

    if type is not None:
        full_trip = Trip.objects.select_related('car', 'driver').get(id=trip.id)
        trip_data = TripSerializer(full_trip).data

        trip_data['car_id'] = trip_data['car']
        del trip_data['car']
        trip_data['car_model'] = full_trip.car.model
        trip_data['driver_id'] = trip_data['driver']
        del trip_data['driver']
        trip_data['driver_name'] = full_trip.driver.name

        publish_to_trips(type, trip_data)
