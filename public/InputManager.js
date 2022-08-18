class InputManager {
  #keys;
  #allowedKeys;

  static #instance = null;
  static #keyPressed = [];
  static #keyReleased = [];
  constructor() {
    this.#keys = [];
    this.#allowedKeys = ["ArrowUp", "ArrowDown"];
  }

  static GetInstance() {
    if (InputManager.#instance == null) this.#instance = new InputManager();

    return this.#instance;
  }

  SubscribeOnElement(element) {
    element.addEventListener("keyup", (e) => {
      let success = this.#OnKeyUp(e.key);
      if (success) {
        InputManager.#keyReleased.forEach((method) => {
          method();
        });
      }
    });
    element.addEventListener("keydown", (e) => {
      let success = this.#OnKeyDown(e.key);

      if (success) {
        InputManager.#keyPressed.forEach((method) => {
          method();
        });
      }
    });
  }

  #OnKeyUp(key) {
    let index = this.#keys.indexOf(key);

    if (index > -1) {
      this.#keys.splice(index, 1);
      return true;
    }

    return false;
  }
  #OnKeyDown(key) {
    if (!this.#allowedKeys.includes(key) || this.#keys.includes(key)) {
      return false;
    }

    this.#keys.push(key);

    return true;
  }
  SubscribeToKeyPressed(method) {
    InputManager.#keyPressed.push(method);
  }
  SubscribeToKeyReleased(method) {
    InputManager.#keyReleased.push(method);
  }
  GetKeys() {
    return this.#keys;
  }
}
