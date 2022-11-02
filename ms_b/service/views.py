import json

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status

from service.trips_manager import tripsManager
from service.dataconverters import TripEncoder

@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def get_trips(request):
    trips = tripsManager.trips
    return Response(json.dumps(trips, cls=TripEncoder), status=status.HTTP_200_OK)
