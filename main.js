var connectionHandler = require("./ConnectionHandler");
var repo = require("./PlayerRepository");
var player = require("./Player");
var logic = require("./Logic");

var players = new repo.PlayerRepository();
var ingameLogic = new logic.Logic(players);
var server = new connectionHandler.ConnectionHandler(3000, 2);

server.RegisterMiddleWare("ActiveInput", (data) => {
  ingameLogic.HandleInput(data);
});

//add player to the array and welcome it
server.SubscribeOnConnected((socket) => {
  players.AddPlayer(new player.Player(socket.id));
  let playerid = players.GetPlayers().length;

  server.SendToOneClient(socket.id, "welcome", { playerId: playerid });
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
ingameLogic.SubscribeOnMove((index) => {
  server.SendToEveryone("move", {
    clientindex: index + 1,
    y: ingameLogic.playerRepository.GetPlayers()[index].y,
  });
});
