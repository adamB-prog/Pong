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
    players.push(new Player(0.5, 0.01, data.size));
    players.push(new Player(0.5, 0.01, data.size));
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
      players[0].y * (canvas.height * (1 - players[0].size)),
      30,
      canvas.height * players[0].size
    );
    rect(
      width - 30,
      players[1].y * (canvas.height * (1 - players[1].size)),
      30,
      canvas.height * players[1].size
    );
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
