const { keyboard, Key, mouse, left, right, up, down, screen, Point } = require("@nut-tree/nut-js");
const uuidv4 = require("uuid").v4;

const http = require("http");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090", httpServer.address()));



const wsServer = new websocketServer({
    "httpServer" : httpServer
});


  
  const performAction = async () => {

    await keyboard.pressKey(Key.LeftControl, Key.Q);
    await keyboard.releaseKey(Key.LeftControl, Key.Q);


  };
  

//   (async () => {
//     console.log("Started");
//     //   await square();
//     await console.log(mouse.getPosition());

//     // connection.send(JSON.stringify(payload));
//     await keyboard.type("package"); 
//     await keyboard.type(Key.Return);

//     console.log("Performed");
// })();

async function asyncCall(connection, payload) {
  console.log("Started");
  //   await square();
  await performAction();
  console.log("Performed");
  connection.send(JSON.stringify(payload));
  // await keyboard.type("package"); 
  // await keyboard.type(Key.Return);
}

// asyncCall();

wsServer.on("request", (request) => {

    //Variables
    var gameId = "";
    var username = "";
    var inLobbyState = false;
    var isLobbyFull = false;

    //Connect
    const connection = request.accept(null, request.origin);

    const clientId = uuidv4();


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

        if(result.t == "msg")
        {
          console.log("Message recieved : " + result.data);
        } else if(result.t == "btnPressed")
        {

          // { Recived DATA
          //   t : btnPressed,
          //   btnId : 0
          // }

          const payload = {
            "method" : "btnResponse",
            "btnId" : result.btnId,
            "status" : 1
          }
          asyncCall(connection, payload);
          //   (async () => {
          //     console.log("Started");
          //     //   await square();
          //     await performAction();
          //     console.log("Performed");
          //     connection.send(JSON.stringify(payload));
          //     // await keyboard.type("package"); 
          //     // await keyboard.type(Key.Return);
          // })();
        }
    });

     
});
