class Logic {
  #onMove;
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
    this.#onMove = [];
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
        this.#TriggerOnMove(index);
      }
    });
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
  SubscribeOnMove(method) {
    this.#onMove.push(method);
  }
  #TriggerOnMove(index) {
    this.#onMove.forEach((method) => {
      method(index);
    });
  }
}

module.exports = { Logic };
