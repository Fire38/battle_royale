from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *


urlpatterns = [
    path('token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name='create_user'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('get_user/', GetUser.as_view()),
    path('get_game_list/', GetFutureGames.as_view(), name='get_future_games'),
    path('get_team/', GetTeam.as_view()),
    path('remove-from-team/', RemoveMemberFromTeam.as_view(), name='remove_from_team'),
    path('asign-cap/', AsignCaptain.as_view(), name='assign-cap'),
    path('invite-member/', InviteMember.as_view(), name='invite-member'),
    path('accept-invite-to-team/', AcceptInvite.as_view(), name='accept-invite')
]
