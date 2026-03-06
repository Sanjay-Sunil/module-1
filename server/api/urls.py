from django.urls import path
from .views import user_list_create, update_delete, match_user_by_overlap

urlpatterns = [
  path('users/', user_list_create, name='user_list_create'),
  path('users/<int:id>', update_delete, name="edit_user" ),
  path('match/', match_user_by_overlap, name="match_users")
]

