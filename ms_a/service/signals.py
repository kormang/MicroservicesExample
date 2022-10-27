from service.producers import publish_to_trips
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from service.models import Trip
from service.serializers import TripSerializer


@receiver(post_save, sender=Trip)
def on_trip_post_save(sender, **kwargs):
    created = kwargs['created']
    trip = kwargs['instance']
    trip_data = TripSerializer(trip).data

    if created:
        type = 'started'
    elif trip.end_time is not None:
        type = 'ended'
    else:
        type = None

    if type is not None:
        publish_to_trips(type, trip_data)
