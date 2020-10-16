import json
from channels.generic.websocket import AsyncWebsocketConsumer


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            await self.close()
        else:
            await self.accept()




    async def disconnect(self, code):
        pass


    async def receive(self, text_data):
        print(json.loads(text_data))
        mes = json.loads(text_data)
        await self.send(text_data=json.dumps({
            'message': mes
        }))

