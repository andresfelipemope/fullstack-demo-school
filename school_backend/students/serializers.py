from rest_framework import serializers
from .models import Student, StudentGroup


class StudentGroupSerializer(serializers.ModelSerializer):
    """Serializer para el modelo StudentGroup"""
    
    class Meta:
        model = StudentGroup
        fields = ['id', 'name', 'room_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class StudentSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Student"""
    
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'email', 'code', 'group']
        read_only_fields = ['id']

