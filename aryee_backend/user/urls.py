from django.urls import path
from .views import users
from .views import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', users),
    path('user-info/', user_info),
    path('login/', sign_in),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('m_sign_up/', manager_sign_up),
]