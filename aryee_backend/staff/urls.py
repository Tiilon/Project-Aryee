from django.urls import path
from .views import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('staff/', staff),
    path('staff-details/<uuid>', staff_details),
]