from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Users, Interest
from .serializers import UserSerializer, InterestSerializer


@api_view(['GET', 'POST'])
def user_list_create(request):
  serializer = UserSerializer(data = request.data)
  
  
  if request.method == 'POST': 
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'GET':
    users = Users.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
