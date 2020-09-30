from django.urls import path
from . import views


urlpatterns = [
    path('get_game_list/', views.GameList.as_view())
]