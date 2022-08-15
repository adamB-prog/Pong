class Logic {
  #playerRepository;
  #endGame;

  constructor(playerRepository) {
    this.#playerRepository = playerRepository;
    this.#endGame = true;
  }
  StartGame() {
    //TODO SETTIMEOUT
  }
  Tick() {
    this.#playerRepository.GetPlayers().forEach((player) => {
      player.Tick();
    });
  }
  HandleInput(data) {
    const findPlayer = this.#playerRepository.FindPlayerById(data.clientid);
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
