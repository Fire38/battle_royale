from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import tutorial_frontend.routing
from .jwt_ws_middleware import TokenAuthMiddleware

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddleware(
        URLRouter(
            tutorial_frontend.routing.websocket_urlpatterns
        )
    ),
})