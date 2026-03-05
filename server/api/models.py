from django.db import models


#Intreset Manytomany relation

class Interest(models.Model):
  name = models.CharField(max_length=50, unique=True)
  def __str__(self):
    return self.name

# user Model

class Users(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=250)
  location = models.CharField(max_length=50)
  interests = models.ManyToManyField(Interest, related_name="user_profiles")

  def __str__(self):
    return self.name  

  