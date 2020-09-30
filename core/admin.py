from django.contrib import admin
from .models import *

admin.site.register(Team)
admin.site.register(Game)
admin.site.register(Captain)
admin.site.register(InviteMemberToTeam)


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser


admin.site.register(CustomUser, CustomUserAdmin)
