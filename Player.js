class Player
{
  #socket;
  #lastInput;
  #y;
  #vy;
  #a;
  #point;
  constructor(socket)
  {
    this.socket = socket;
    
    this.#y = 0.5;
    this.#vy = 0;
    this.#a = 0.01;
    this.#point = 0;
  }
  Tick()
  {
    this.#y = this.Clamp(this.#y + this.#vy, 0, 1);
  }
  AddPoint(amount)
  {
    this.#point += amount;
  }

  MoveDown()
  {
    this.#vy += this.#a;
  }

  MoveUp()
  {
    this.#vy -= this.#a;
  }
  StopMovement()
  {
    this.#vy = 0;
  }
  
  Clamp(num, min, max)
  {
    return num <= min ? min : num >= max ? max : num;
  }
}

module.exports = {Player};