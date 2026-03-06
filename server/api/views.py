from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Users
from .serializers import UserSerializer


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


@api_view(['PUT', 'DELETE'])
def update_delete(request, id):
  try:
    user = Users.objects.get(id=id)
  except Users.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'DELETE':
    user.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
  elif request.method == 'PUT':
    data = request.data
    serializer = UserSerializer(user, data=data)
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)