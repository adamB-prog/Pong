class Player {
  constructor(y, a, sizeX, sizeY) {
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.v = 0;
    this.a = a;
    this.point = 0;
  }
  Tick() {
    this.y = this.Clamp(this.y + this.v, 0, 1);
  }
  AddPoint(amount) {
    this.point += amount;
  }

  MoveDown() {
    this.v += this.a;
  }

  MoveUp() {
    this.v -= this.a;
  }
  StopMovement() {
    this.v = 0;
  }

  Clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }
}
