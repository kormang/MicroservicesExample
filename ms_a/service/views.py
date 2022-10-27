from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, views
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status

from .models import Car, Driver, Trip
from .serializers import CarSerializer, DriverSerializer, TripSerializer


def service(request):
    return HttpResponse("This is service app.")


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class TripCustomView(views.APIView):
    def get(self, request):
        filter_args = {}
        if 'car_id' in request.GET:
            filter_args['car'] = request.GET['car_id']

        if 'driver_id' in request.GET:
            filter_args['driver'] = request.GET['driver_id']

        queryset = Trip.objects.filter(**filter_args)
        ser = TripSerializer(instance=queryset, many=True)
        return Response(ser.data)


    def post(self, request):
        data = {
            'driver': request.data.get('driver_id'),
            'car': request.data.get('car_id')
        }
        ser = TripSerializer(data=data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)

        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
@renderer_classes((JSONRenderer,))
def get_trip(request, trip_id):
    try:
        trip = Trip.objects.get(id=trip_id)
        return Response(TripSerializer(instance=trip).data)
    except Trip.DoesNotExist:
        return Response(
            {"res": f"Trip with id {str(trip_id)} doesn't exist!"},
            status=status.HTTP_404_NOT_FOUND)

@api_view(('PUT',))
@renderer_classes((JSONRenderer,))
def end_trip(request, trip_id):
    try:
        trip = Trip.objects.get(id=trip_id)
        if trip.end_time is not None:
            return Response(
                {"res": f"Trip with id {str(trip_id)} is already finished!"},
                status=status.HTTP_400_BAD_REQUEST)

        trip.end_time = timezone.now()
        trip.save()
        response_data = TripSerializer(instance=trip).data
        return Response(response_data)
    except Trip.DoesNotExist:
        return Response(
            {"res": f"Trip with id {str(trip_id)} doesn't exist!"},
            status=status.HTTP_404_NOT_FOUND)


@api_view(('PUT',))
@renderer_classes((JSONRenderer,))
def assign_driver(request):
    car_id = request.data.get('car_id')
    driver_id = request.data.get('driver_id')
    try:
        car = Car.objects.get(id=car_id)
        driver = Driver.objects.get(id=driver_id)
        assert driver is not None
        car.driver = driver
        car.save()
        return Response({'res': 'success'})
    except Car.DoesNotExist:
        return Response(
            {"res": f"Car with id {str(car_id)} doesn't exist!"},
            status=status.HTTP_400_BAD_REQUEST)
    except Driver.DoesNotExist:
        return Response(
            {"res": f"Driver with id {str(driver_id)} doesn't exist!"},
            status=status.HTTP_400_BAD_REQUEST)

