from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def branches(request):
    if request.method == 'GET':
        branches = Branch.objects.all()
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        name = request.data.get('name')

        Branch.objects.create(
            name=name,
            created_by=request.user,
        )
        return Response({'Success': 'Created successfully'}, status=status.HTTP_201_CREATED)
