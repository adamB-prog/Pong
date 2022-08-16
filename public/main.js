var canvas;
var players = [];
var myID;
players.push(new Player(0.5, 0.01));
players.push(new Player(0.5, 0.01));
window.addEventListener("beforeunload", () => {
  NetworkManager.GetInstance().Disconnect();
});

function SetupNetwork() {
  let networkManager = NetworkManager.GetInstance();
  networkManager.Connect(window.location.href);
  networkManager.AddListener("welcome", (data) => {
    console.log(data);
    myID = data.playerId;
    NetworkManager.GetInstance().RemoveListener("welcome");
  });

  networkManager.AddListener("move", (data) => {
    console.log(data);
    //if (data.clientIndex == myID) {
    //  return;
    //}
    console.log(players);
    if (data.movement == "ArrowDown") {
      players[data.clientIndex - 1].MoveDown();
    } else if (data.movement == "ArrowUp") {
      players[data.clientIndex - 1].MoveUp();
    } else {
      players[data.clientIndex - 1].StopMovement();
    }
  });
}

function SetupInput() {
  InputManager.GetInstance().SubscribeOnElement(document);
  InputManager.GetInstance().SubscribeToKeyPressed(() => {
    let inputManager = InputManager.GetInstance();
    let networkManager = NetworkManager.GetInstance();

    if (inputManager.GetKeys().length == 1)
      networkManager.SendToServer("ActiveInput", inputManager.GetKeys()[0]);
    else networkManager.SendToServer("ActiveInput", null);
  });

  InputManager.GetInstance().SubscribeToKeyPressed(() => {
    console.log(InputManager.GetInstance().GetKeys());
  });

  InputManager.GetInstance().SubscribeToKeyReleased(() => {
    let inputManager = InputManager.GetInstance();
    let networkManager = NetworkManager.GetInstance();
    if (inputManager.GetKeys().length == 1)
      NetworkManager.GetInstance().SendToServer(
        "ActiveInput",
        inputManager.GetKeys()[0]
      );
    else networkManager.SendToServer("ActiveInput", null);
  });
}

function setup() {
  SetupNetwork();
  SetupInput();
  canvas = createCanvas(windowWidth, windowHeight);

  frameRate(60);
}

function draw() {
  background(0, 0, 0, 50);
  noStroke();
  rect(0, players[0].y * (canvas.height - 150), 30, 150);
  rect(width - 30, players[1].y * (canvas.height - 150), 30, 150);
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function Tick() {
  players.forEach((player) => {
    player.Tick();
  });
  console.log("tick");
}

var gameloop = setInterval(Tick, 1000 / 60);
