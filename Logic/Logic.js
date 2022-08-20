class Logic {
  #onPlayerMove;
  #onBallMove;
  constructor(playerRepository, ball) {
    this.playerRepository = playerRepository;
    this.ball = ball;
    this.#onPlayerMove = [];
    this.#onBallMove = [];
    this.endGame = true;
    this.gameLoop = null;
  }
  StartGame(tps) {
    console.log("Starting the game");
    //if any gameloop is in progress, then clear it
    clearInterval(this.gameLoop);
    this.gameLoop = setInterval(() => this.Tick(), 1000 / 60);
  }
  Tick() {
    this.playerRepository.players.forEach((player, index) => {
      //if a player moved, then notify the subscribers
      let move = player.Tick();
      if (move) {
        this.#TriggerOnPlayerMove(index, player.y);
      }
    });
    //this.ball.Tick();
    this.#TriggerOnBallMove(this.ball.x, this.ball.y);
  }
  HandleInput(data) {
    const findPlayer = this.playerRepository.FindPlayerById(data.clientid);
    if (data.data == "ArrowDown") {
      findPlayer.MoveDown();
    } else if (data.data == "ArrowUp") {
      findPlayer.MoveUp();
    } else {
      findPlayer.StopMovement();
    }
  }
  SubscribeOnPlayerMove(method) {
    this.#onPlayerMove.push(method);
  }
  #TriggerOnPlayerMove(index, playerY) {
    this.#onPlayerMove.forEach((method) => {
      method(index, playerY);
    });
  }
  SubscribeOnBallMove(method) {
    this.#onBallMove.push(method);
  }
  #TriggerOnBallMove(ballX, ballY) {
    this.#onBallMove.forEach((method) => {
      method(ballX, ballY);
    });
  }
}

module.exports = { Logic };
