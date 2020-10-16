from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import datetime
from django.utils import timezone

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer, GameListSerializer, TeamSerializer, InviteMemberToTeamSerializer
from .models import Game, CustomUser, Team, Captain, InviteMemberToTeam


class ObtainTokenPairView(TokenObtainPairView):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                print(json)
                return Response(status=status.HTTP_201_CREATED)
        #print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUser(APIView):

    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetFutureGames(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        now = timezone.now()
        games = Game.objects.filter(date__gte=now)
        serializer = GameListSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetTeam(APIView):
    def get(self, request):
        serializer = TeamSerializer(request.user.team)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveMemberFromTeam(APIView):
    def post(self, request):
        member_id = request.data['id']
        try:
            captain = Captain.objects.get(user=request.user, team=request.user.team)
            member = CustomUser.objects.get(id=member_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        team = request.user.team
        if member in team.members.all() and member != captain.user:
            member.team = None
            member.save()
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AsignCaptain(APIView):
    def post(self, request):
        member_id = request.data['id']
        try:
            captain = Captain.objects.get(user=request.user, team=request.user.team)

            future_captain = CustomUser.objects.get(id=member_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        team = request.user.team

        if future_captain in team.members.all() and future_captain != captain.user:
            captain.user = future_captain
            captain.save()
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class InviteMember(APIView):
    def post(self, request):
        member_id = request.data['id']
        try:
            captain = Captain.objects.get(user=request.user, team=request.user.team)
            member = CustomUser.objects.get(id=member_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        team = request.user.team
        if member not in team.members.all() \
                and captain.user != member \
                and not InviteMemberToTeam.objects.filter(invite_from=team, invite_to=member).exists():
            invite = InviteMemberToTeam(invite_from=team, invite_to=member)
            invite.save()
            serializer = TeamSerializer(team)
            sss = InviteMemberToTeamSerializer(invite)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetInviteList(APIView):
    def post(self, request):
        invite_list = InviteMemberToTeam.objects.filter(invite_to=request.user)
        return Response(status=status.HTTP_200_OK)



class AcceptInvite(APIView):
    def post(self, request):
        team_id = request.data['team_id']
        try:
            team = Team.objects.get(id=team_id)
            user = CustomUser.objects.get(id=request.user.id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        is_captain = Captain.objects.filter(user=request.user).exists()
        if not is_captain and user not in team.members.all():
            user.team = team
            user.save()

            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
