from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from .models import User
from .serializer import UserSerializer


@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def user_info(request):
    if request.method == 'GET':
        user= User.objects.get(userID=request.user.userID)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny, ))
def sign_in(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email:
            return ValueError('Please enter an email address')
        if not password:
            return ValueError('Please enter a password')

        user=None
        refresh=None
        
        try:
            user = authenticate(request,email=email,password=password)
            if user is not None and user.is_active:
                login(request,user)
            refresh = RefreshToken.for_user(user)
        except User.DoesNotExist:pass

        return Response (
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'name': request.user.get_full_name()
            }
        )

@api_view(['POST'])
@permission_classes((AllowAny, ))
def manager_sign_up(request):
    if request.method == 'POST':
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username = request.data.get('username')
        gender = request.data.get('gender')
        profile_image = request.data.get('profile_image')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if not email:
            return Response({'error':'Please enter an email address'}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({'error':'Please enter a password'}, status=status.HTTP_400_BAD_REQUEST)
        if password != password2:
            return Response({'error':'Passwords do not tally'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            return Response({'error':'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                gender=gender,
                role="MANAGER",
                profile_image=profile_image,
            )
            user.set_password(password)
            user.is_active = False
            user.save()

        return Response ({'success': 'Created successfully'}, status=status.HTTP_201_CREATED)
