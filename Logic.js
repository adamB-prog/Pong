class Logic {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
    this.endGame = true;
    this.gameLoop = null;
  }
  StartGame(tps) {
    console.log("Starting the game");
    this.gameLoop = setInterval(() => this.Tick(), 1000 / 60);
  }
  Tick() {
    this.playerRepository.players.forEach((player) => {
      player.Tick();
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

    console.log(findPlayer);
  }
}

module.exports = { Logic };
