import {socketConnecting, socketConnect, socketDisconnecting, socketMessageReceiving, socketMessageSending} from './actions/socketActions';
import { autoLogin } from './actions/userActions';


const socketMiddleware = (function(){
    var socket = null;

    const onOpen = (ws, store, token) => evt => {
        store.dispatch(socketConnecting())
    }

    const onClose = (ws, store) => evt => {
        store.dispatch(socketDisconnecting())
    }

    const onMessage = (ws, store) => evt => {
        var msg = JSON.parse(evt.data);
        console.log('ya zdes', msg)
        store.dispatch(socketMessageReceiving(msg))
        switch(msg.type) {
            case 'CHAT_MESSAGE':
                store.dispatch(socketMessageReceiving(msg))
                break;
            default:
                console.log('Received unknown message')
                break;
        }
    }

    const onError = (ws, store) => evt => {
        store.dispatch(socketConnect())
    }


    return store => next => action => {
        switch(action.type) {
            case 'SOCKET_CONNECT':
                if (socket != null) {
                    socket.close()
                }

                store.dispatch(socketConnecting())

                document.cookie = 'X-Authorization=' + localStorage.access_token + '; path=/';
                const token = localStorage.access_token
                // незарегистрированных пропускаем
                if (typeof token !== 'undefined'){
                    store.dispatch(autoLogin())
                    socket = new WebSocket(`ws://192.168.88.247:8000/ws/tutorial/?token=${token}/`);
                    socket.onmessage = onMessage(socket, store)
                    socket.onclose = onClose(socket, store)
                    socket.onopen = onOpen(socket, store)
                    socket.onerror = onError(socket, store)
                    break;
                }

            case 'SOCKET_DISCONNECT':
                if(socket != null){
                    socket.close();
                }
                socket = null;
                store.dispatch(socketDisconnecting())
                break;
            case 'SOCKET_MESSAGE_SENDING':
                socket.send(action.payload);

                break;
            default:
                return next(action);
        }
    }
})();


export default socketMiddleware