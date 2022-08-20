class Ball {
  constructor(
    startX,
    startY,
    startVX,
    startVY,
    radius,
    levelSizeX,
    levelSizeY
  ) {
    this.x = startX;
    this.y = startY;
    this.vx = startVX;
    this.vy = startVY;
    this.levelSizeX = levelSizeX;
    this.levelSizeY = levelSizeY;
    this.radius = radius;
  }
  Tick() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.IsCollideX()) {
      this.BounceX();
    }
    if (this.IsCollideY()) {
      this.BounceY();
    }
  }
  IsCollideX(object) {
    if (this.x + this.radius >= this.levelSizeX || this.x - this.radius <= 0) {
      return true;
    }
    return false;
  }
  IsCollideY() {
    if (this.y + this.radius >= this.levelSizeY || this.y - this.radius <= 0) {
      return true;
    }
    return false;
  }
  BounceX() {
    this.vx = -this.vx;
  }
  BounceY() {
    this.vy = -this.vy;
  }
  IsOutofZone() {
    return false;
  }
}

module.exports = { Ball };
