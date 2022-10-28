from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status

from ms_b.service.trips_manager import tripsManager

@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def get_trips(request):
    trips = tripsManager.trips
    return Response(trips, status=status.HTTP_200_OK)
