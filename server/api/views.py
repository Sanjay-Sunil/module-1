from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count, Q
from .models import Users
from .serializers import UserSerializer

# creating user , get and post
@api_view(['GET', 'POST'])
def user_list_create(request):
  if request.method == 'POST':
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'GET':
    users = Users.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# updating or deleting users, put and delete
@api_view(['PUT', 'DELETE'])
def update_delete(request, id):
  try:
    user = Users.objects.get(id=id)
  except Users.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'DELETE':
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  elif request.method == 'PUT':
    data = request.data
    serializer = UserSerializer(user, data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
  return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


# the matching process

@api_view(['POST'])
def match_user_by_overlap(request):
  interests = request.data.get('interests', [])
  
  if not interests:
    return Response({'error', "No keywords Provided"}, status=status.HTTP_400_BAD_REQUEST)
  
  matched_users = Users.objects.filter(
    interests__name__in = interests
  ).annotate(
    overlap_count = Count('interests', filter=Q(interests__name__in=interests))
  ).order_by('-overlap_count')
  
  serializer = UserSerializer(matched_users, many=True)
  return Response(serializer.data)