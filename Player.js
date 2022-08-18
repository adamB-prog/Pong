class Player {
  constructor(socketid) {
    this.socketid = socketid;

    this.y = 0.5;
    this.vy = 0;
    this.a = 0.01;
    this.point = 0;
  }
  Tick() {
    if (this.vy != 0) {
      this.y = this.Clamp(this.y + this.vy, 0, 1);
      return true;
    }

    return false;
  }
  AddPoint(amount) {
    this.point += amount;
  }

  MoveDown() {
    this.vy += this.a;
  }

  MoveUp() {
    this.vy -= this.a;
  }
  StopMovement() {
    this.vy = 0;
  }
  GetSocketId() {
    return this.socketid;
  }
  Clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }
}

module.exports = { Player };
