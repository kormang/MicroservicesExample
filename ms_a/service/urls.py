from django.urls import include, path

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('cars', views.CarViewSet)
router.register('drivers', views.DriverViewSet)

urlpatterns = [
    path('', views.service, name='service'),
    path('', include(router.urls)),
    path('trips/', views.TripCustomView.as_view()),
    path('trips/end_trip/<str:trip_id>/', views.end_trip),
    path('trips/assign_driver/', views.assign_driver),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
