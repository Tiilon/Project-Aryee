from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
def staff(request):
    if request.method == 'GET':
        staff = Staff.objects.all()
        serializer = StaffSerializer(staff, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        contact = request.data.get('contact')
        gender = request.data.get('gender')
        role = request.data.get('role')
        branch = Branch.objects.get(id=request.data.get('branch'))
        image = request.data.get('image')

        Staff.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            contact=contact,
            gender=gender,
            branch=branch,
            role=role,
            profile_image=image
        )
        return Response({'Success': 'Created successfully'}, status=status.HTTP_201_CREATED)


class StaffDetails(RetrieveAPIView):

    def get(self, request):
        staff = get_object_or_404(Staff, user=request.user)
        data = StaffSerializer(staff).data
        return Response(data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def staff_details(request,uuid):
    if request.method == "GET":
        staff = Staff.objects.get(uuid=uuid)
        serializer = StaffSerializer(staff)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'data':serializer.data,'branch':staff.branch.name}, status=status.HTTP_200_OK)