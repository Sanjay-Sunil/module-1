from rest_framework import serializers
from .models import Users, Interest

class InterestSerializer(serializers.ModelSerializer):
  class Meta:
    model = Interest
    fields = ['id', 'name']
    

class UserSerializer(serializers.ModelSerializer):
  interests = InterestSerializer(many=True, read_only=True)
  interest_list = serializers.ListField(child = serializers.CharField(), write_only=True)
  class Meta:
    model = Users
    fields = ['id', 'name', 'image','location', 'interests', 'interest_list']
  
  def create(self, validated_data):
    interest_names = validated_data.pop('interest_list')
    user = Users.objects.create(**validated_data)
    for name in interest_names:
        interest_obj, _ = Interest.objects.get_or_create(name=name.strip())
        user.interests.add(interest_obj)
    return user