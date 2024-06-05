"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var user1Token = 'USER1_JWT_TOKEN'; // Remplacez par le token JWT de l'utilisateur 1
var user2Token = 'USER2_JWT_TOKEN'; // Remplacez par le token JWT de l'utilisateur 2
var user1Ws = new WebSocket('ws://localhost:3001', {
    headers: {
        Authorization: "Bearer ".concat(user1Token)
    }
});
var user2Ws = new WebSocket('ws://localhost:3001', {
    headers: {
        Authorization: "Bearer ".concat(user2Token)
    }
});
user1Ws.on('open', function open() {
    console.log('User 1 connected');
    var message = JSON.stringify({
        content: 'Hello User 2!',
        recipientId: 2 // Assurez-vous que l'utilisateur 2 a cet ID
    });
    user1Ws.send(message);
});
user2Ws.on('open', function open() {
    console.log('User 2 connected');
});
user2Ws.on('message', function incoming(data) {
    console.log("User 2 received message: ".concat(data));
});
user1Ws.on('message', function incoming(data) {
    console.log("User 1 received message: ".concat(data));
});
