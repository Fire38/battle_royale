from django.db import models
from django.contrib.auth.models import AbstractUser


class Team(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)
    registration_date = models.DateField(auto_now_add=True)
    team = models.ForeignKey(Team,
                             related_name='members',
                             on_delete=models.CASCADE,
                             blank=True,
                             null=True)

    def __str__(self):
        return 'Профиль {}'.format(self.username)


class Captain(models.Model):
    team = models.OneToOneField(Team, on_delete=models.SET_NULL, null=True)
    user = models.OneToOneField(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return '{} капитан команды {}'.format(self.user.username, self.team)


class Game(models.Model):
    name = models.CharField(max_length=400)
    date = models.DateTimeField()
    author = models.ManyToManyField(CustomUser,
                                    related_name='writed_games',
                                    blank=False)
    teams = models.ManyToManyField(Team,
                                   related_name='games',
                                   blank=True)

    def __str__(self):
        return self.name


class InviteMemberToTeam(models.Model):
    invite_from = models.ForeignKey(Team, related_name='invite_to', on_delete=models.CASCADE)
    invite_to = models.ForeignKey(CustomUser, related_name='invited_from', on_delete=models.CASCADE)

    def __str__(self):
        return 'Команда {} пригласила {}'.format(self.invite_from, self.invite_to.username)

