from rest_framework import serializers
from .models import *
from pharm.serializer import BranchSerializer

class StaffSerializer(serializers.ModelSerializer):
    
    branch = BranchSerializer()
    
    class Meta:
        model = Staff
        fields = ['branch', 'first_name', 'last_name', 'contact', 'email', 'gender', 'uuid', 'role', 'profile_image', 'staffID']