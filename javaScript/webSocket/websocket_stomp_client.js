/**
 *
 */
 import SockJS from 'sockjs-client';
 import Stomp from 'stomp-websocket';
 
 
 class WebSocketStompClient {
     constructor(url, header, topics) {
         this.url = url;
         this.header = header;
         this.topics = topics;
     }
 
     connect() {
         if (this.socket == null) {
             this.socket = new SockJS(this.url);
         }
 
         if (this.stompClient == null) {
             this.stompClient = Stomp.over(this.socket);
         }
         this.connectWithCallback(this);
     }
 
     connectWithCallback(connectResultListener) {
         if (!this.isConnected()) {
             this.stompClient.connect(this.header,
                 function() {
                     connectResultListener.subscriveTopics(connectResultListener);
                 },
                 function() {
                     connectResultListener.disconnect();
                     connectResultListener.connect();
                 });
         }
     }
 
     disconnect() {
         if (this.socket != null) {
             this.socket.close();
             this.socket = null;
         }
 
         if (this.stompClient != null) {
             this.stompClient.disconnect();
             this.stompClient = null;
         }
     }
 
     isConnected() {
         return (this.stompClient != null && this.stompClient.connected);
     }
 
     subscriveTopics(receiveMessageListener) {
         for (var i = 0; i < this.topics.length; i++) {
             this.stompClient.subscribe(this.topics[i],
                 function(message) {
                     // console.log("-------------> callback topic : " + message.headers.destination);
                     receiveMessageListener.receivedMessage(message.headers.destination, message.body);
                 });
         }
     }
 
     receivedMessage(topic, message) {
         if (this.receiveMessgeCallback != null) {
             this.receiveMessgeCallback(topic, message);
         }
     }
 
     setReceiveMessageCallback(receiveMessgeCallback) {
         this.receiveMessgeCallback = receiveMessgeCallback;
     }
 
     sendMessge(topic, message) {
         var isSended = false;
         if (this.isConnected()) {
             this.stompClient.send("/app" + topic, {}, message);
             isSended = true;
         }
         return isSended;
     }
 }
 
 var webSocketclient1, webSocketclient2, webSocketclient3;
 
 export function connectAicmWebSocket(server1Url, server2Url, receiveMessgeCallback, subscribeTopicList) {
 
     console.log("-------------> connectAicmWebSocket server1Url : " + server1Url + " server2Url : " + server2Url + " subscribeTopicList : " + subscribeTopicList);
     if (server1Url != null) {
         webSocketclient1 = new WebSocketStompClient(server1Url, {}, subscribeTopicList);
         webSocketclient1.setReceiveMessageCallback(receiveMessgeCallback);
         webSocketclient1.connect();
     }
 
     if (server2Url != null) {
         webSocketclient2 = new WebSocketStompClient(server2Url, {}, subscribeTopicList);
         webSocketclient2.setReceiveMessageCallback(receiveMessgeCallback);
         webSocketclient2.connect();
     }
 }
 
 export function disconnectAicmWebSokcet(soketState) {
     console.log("-------------> disconnectAicmWebSokcet webSocketclient1 : " + webSocketclient1);
     if (webSocketclient1 != null) {
         webSocketclient1.disconnect();
     }
 
     console.log("-------------> disconnectAicmWebSokcet webSocketclient2 : " + webSocketclient2);
     if (webSocketclient2 != null) {
         webSocketclient2.disconnect();
     }
 
     console.log("-------------> disconnectAicmWebSokcet webSocketclient3 : " + webSocketclient3);
     if (webSocketclient3 != null) {
         webSocketclient3.disconnect();
     }
     soketState = 'disconnect'
 }
 
 export function sendMessage(topic, message) {
     // console.log("-------------> message : " + message);
     var isSended = false;
     if (webSocketclient1 != null && webSocketclient1.isConnected()) {
         isSended = webSocketclient1.sendMessge(topic, message);
     } else if (webSocketclient2 != null && webSocketclient1.isConnected()) {
         isSended = webSocketclient1.sendMessge(topic, message);
     } else {
         // console.log("-------------> not exist connected client");
     }
 
     return isSended;
 }