class PlayerRepository {
  constructor() {
    this.players = [];
  }

  AddPlayer(player) {
    this.players.push(player);
  }
  RemovePlayerById(socketid) {
    this.players = this.players.filter((data) => data.socketid != socketid);
    console.log(this.players.length);
  }
  GetPlayers() {
    return this.players;
  }
}

module.exports = { PlayerRepository };
