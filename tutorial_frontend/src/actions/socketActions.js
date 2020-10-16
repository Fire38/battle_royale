export const socketConnecting = () => ({type: 'SOCKET_CONNECTING'});

export const socketConnect = () => ({type: 'SOCKET_CONNECT'});

export const socketDisconnecting = () => ({type: 'SOCKET_DISCONNECTING'});

export const socketDisconnect = () => ({type: 'SOCKET_DISCONNECT'});

export const socketMessageSending = (payload) => ({type: 'SOCKET_MESSAGE_SENDING', payload});

export const socketMessageReceiving = () => ({type: 'SOCKET_MESSAGE_RECEIVING'});
