var connectionHandler = require("./ConnectionHandler");
var repo = require("./PlayerRepository");
var player = require("./Player");
var logic = require("./Logic");

var ingameLogic = new logic.Logic();

var players = new repo.PlayerRepository();

players.AddPlayer();


var server = new connectionHandler.ConnectionHandler(3000, 2);

server.RegisterMiddleWare('ActiveInput', (data) => {

    console.log(data);

});

