from django.urls import path
from .views import user_list_create, update_delete

urlpatterns = [
  path('users/', user_list_create, name='user_list_create'),
  path('users/<int:id>', update_delete, name="edit_user" ),
]