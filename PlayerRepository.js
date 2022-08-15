class PlayerRepository {
  constructor() {
    this.players = [];
  }

  AddPlayer(player) {
    this.players.push(player);
  }
  RemovePlayerById(socketid) {
    this.players = this.players.filter((data) => data.socketid != socketid);
  }
  GetPlayers() {
    return this.players;
  }
  FindPlayerById(socketid) {
    return this.players.find((player) => player.GetSocketId() == socketid);
  }
}

module.exports = { PlayerRepository };
