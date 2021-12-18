
const uuidv4 = require("uuid").v4;

const http = require("http");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"));



const wsServer = new websocketServer({
    "httpServer" : httpServer
});


wsServer.on("request", (request) => {

    //Variables
    var gameId = "";
    var username = "";
    var inLobbyState = false;
    var isLobbyFull = false;

    //Connect
    const connection = request.accept(null, request.origin);

    const clientId = uuidv4();
    players[clientId] = {
        "connection" : connection
    };

    let payload = {
        "method" : "connect",
        "clientid" : clientId
    }
    
    console.log("Player Connected, ClientId : "+ clientId);
    connection.send(JSON.stringify(payload));



    //On Close Callback
    connection.on("close", () => console.log("closed!!"));


    
    connection.on("message", (message) =>{
        const result = JSON.parse(message.utf8Data);


    });
});
