var canvas;
var players = [];
var myID;

window.addEventListener("beforeunload", () => {
  NetworkManager.GetInstance().Disconnect();
});

function SetupNetwork() {
  let networkManager = NetworkManager.GetInstance();
  networkManager.Connect(window.location.href);
  networkManager.AddListener("welcome", (data) => {
    console.log(data);
    myID = data.playerId;
    players.push(
      new Player(data.startPos, data.acceleration, data.size.X, data.size.Y)
    );
    players.push(
      new Player(data.startPos, data.acceleration, data.size.X, data.size.Y)
    );
    console.log("welcome received");
    NetworkManager.GetInstance().RemoveListener("welcome");
  });

  networkManager.AddListener("move", (data) => {
    players[data.clientindex - 1].y = data.y;
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
  if (players.length > 0) {
    rect(
      0,
      players[0].y * (canvas.height * (1 - players[0].sizeY)),
      canvas.width * players[0].sizeX,
      canvas.height * players[0].sizeY
    );
    rect(
      canvas.width - canvas.width * 0.015625,
      players[1].y * (canvas.height * (1 - players[1].sizeY)),
      canvas.width * players[1].sizeY,
      canvas.height * players[1].sizeY
    );
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
