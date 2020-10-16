import jwt
from urllib.parse import parse_qs
from django.conf import settings
from rest_framework_simplejwt.tokens import UntypedToken
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser

from core.models import CustomUser


@database_sync_to_async
def get_user(user_id):
    try:
        return CustomUser.objects.get(id=user_id)
    except:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        token = parse_qs(self.scope['query_string'].decode('utf8'))['token'][0][0:-1]
        UntypedToken(token)

        secret = settings.SECRET_KEY
        data = jwt.decode(token, secret, algorithms='HS256')
        user_id = data['user_id']
        self.scope['user'] = await get_user(int(user_id))

        inner = self.inner(self.scope)

        return await inner(receive, send)



"""
class JwtAuthMiddleware:
    Используется для проверки аутентифицирован ли пользователь до подключения к веб сокету
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope):

        token = parse_qs(scope['query_string'].decode('utf8'))['token'][0]
        try:
            UntypedToken(token)
            secret = settings.SECRET_KEY
            data = jwt.decode(token, secret, algorithms='HS256')
            user_id = data['user_id']
            user = await get_user(user_id)
            print(user)
            return await self.inner(dict(scope, user=user))
        except:
            print('ERROR!!!')
"""