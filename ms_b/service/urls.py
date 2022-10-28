from django.urls import include, path

from . import views
from rest_framework import routers

urlpatterns = [
    path('trips/', views.get_trips),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

