import WebSocket from 'ws';

const user1Ws = new WebSocket('ws://localhost:3000');
const user2Ws = new WebSocket('ws://localhost:3000');

user1Ws.on('open', function open() {
    console.log('User 1 connected');
    const message = JSON.stringify({
        content: 'Hello User 2!',
        recipientId: 2,
    });
    user1Ws.send(message);
});

user2Ws.on('open', function open() {
    console.log('User 2 connected');
});

user2Ws.on('message', function incoming(data: WebSocket.RawData) {
    console.log(`User 2 received message: ${data}`);
});

user1Ws.on('message', function incoming(data: WebSocket.RawData) {
    console.log(`User 1 received message: ${data}`);
});
