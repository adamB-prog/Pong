const connectionHandler = require("./ConnectionHandler");
const repo = require("./Repositories/PlayerRepository");
const player = require("./Models/Player");
const logic = require("./Logic/Logic");
const ball = require("./Models/Ball");

var players = new repo.PlayerRepository();
var ingameball = new ball.Ball(0.5, 0.5, 0.01, 0.01, 0.015625, 1, 1);
var ingameLogic = new logic.Logic(players, ingameball);
var server = new connectionHandler.ConnectionHandler(3000, 2);

server.RegisterMiddleWare("ActiveInput", (data) => {
  ingameLogic.HandleInput(data);
});

//add player to the array and welcome it
server.SubscribeOnConnected((socket) => {
  players.AddPlayer(new player.Player(socket.id));
  let playerid = players.GetPlayers().length;

  server.SendToOneClient(socket.id, "welcome", {
    playerId: playerid,
    size: {
      X: 0.015625,
      Y: 0.13,
    },
    startPos: 0.5,
    acceleration: 0.01,
  });
});
//if there are enough players then start the game
server.SubscribeOnConnected(() => {
  if (players.GetPlayers().length == 2) {
    ingameLogic.StartGame();
  }
});
//remove the disconnected player from the array
server.SubscribeOnDisconnected((socket) => {
  players.RemovePlayerById(socket.id);
});
//send to clients that movement happened and the necessery information to it
ingameLogic.SubscribeOnPlayerMove((index, playerY) => {
  server.SendToEveryone("moveplayer", {
    clientindex: index + 1,
    y: playerY,
  });
});

ingameLogic.SubscribeOnBallMove((ballX, ballY) => {
  server.SendToEveryone("moveball", {
    x: ballX,
    y: ballY,
  });
});
