var connectionHandler = require("./ConnectionHandler");
var repo = require("./PlayerRepository");
var player = require("./Player");
var logic = require("./Logic");

var players = new repo.PlayerRepository();
var ingameLogic = new logic.Logic(players);

var server = new connectionHandler.ConnectionHandler(3000, 2);

server.RegisterMiddleWare("ActiveInput", (data) => {
  console.log(data);
  ingameLogic.HandleInput(data);
});

server.SubscribeOnConnected((socket) => {
  players.AddPlayer(new player.Player(socket.id));
  let playerid = players.GetPlayers().length;

  server.SendToOneClient(socket.id, "welcome", { playerId: playerid });
});

server.SubscribeOnDisconnected((socket) => {
  players.RemovePlayerById(socket.id);
});

ingameLogic.StartGame();
