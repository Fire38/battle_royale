import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # добавляем дополнительные данные в токен
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
    captain = serializers.CharField(required=False)
    #invited_from = serializers.CharField(source='invited_from.name', read_only=True)
    invities = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'team', 'captain', 'invities')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    #https://stackoverflow.com/questions/28309507/django-rest-framework-filtering-for-serializer-field
    def get_invities(self, user):
        qs = InviteMemberToTeam.objects.filter(invite_to=user)
        serializer = InviteMemberToTeamSerializer(qs, many=True)
        return serializer.data


class GameListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    members = CustomUserSerializer(many=True)

    class Meta:
        model = Team
        fields = '__all__'


class InviteMemberToTeamSerializer(serializers.ModelSerializer):

    invite_from_name = serializers.CharField(source='invite_from.name', read_only=True)
    # invite_to = serializers.ReadOnlyField(source='invite_to.username')

    class Meta:
        model = InviteMemberToTeam
        fields = ('id', 'invite_from_name', 'invite_from')



