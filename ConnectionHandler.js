class ConnectionHandler {
  //private fields
  #express;
  #app;
  #server;
  #socket;
  #io;
  #maxConnection;
  //events
  #onConnected;
  #onDisconnected;

  constructor(port = 3000, maxConnection = Infinity) {
    this.#express = require("express");
    this.#app = this.#express();
    this.#server = this.#app.listen(port);
    this.#app.use(this.#express.static("public"));
    this.#socket = require("socket.io");
    this.#io = this.#socket(this.#server, {
      pingInterval: 100,
      pingTimeout: 1000,
      connectTimeout: 1000,
    });

    this.#maxConnection = maxConnection;
    this.#onConnected = [];
    this.#onDisconnected = [];

    console.log(`Server running at port ${port}.`);

    this.#SetupDefaultMiddleWares();
  }
  GetIO() {
    return this.#io;
  }
  #SetupDefaultMiddleWares() {
    this.#io.on("connection", (socket) => {
      //if we reach the player limit, all of the incoming connection are going to be disconnected
      if (this.#io.engine.clientsCount > this.#maxConnection) {
        socket.disconnect();
        console.log(
          `Max number reached(${this.#io.engine.clientsCount}/ ${
            this.#maxConnection
          }}), disconnected: ${socket.id} `
        );
        return;
      } else {
        console.log(
          `New Connection: ${socket.id}\nConnection count: ${
            this.#io.engine.clientsCount
          }`
        );
        this.#TriggerOnConnected(socket);
      }
      //onConnectionClosed
      socket.on("close", (reason) => {
        console.log(
          `Connection closed: ${
            socket.id
          } Reason: ${reason}\nConnection count: ${
            this.#io.engine.clientsCount
          }`
        );
      });
      //onDisconnected
      socket.on("disconnect", (reason) => {
        console.log(
          `Disconnected: ${socket.id} Reason: ${reason}\nConnection count: ${
            this.#io.engine.clientsCount
          }`
        );

        this.#TriggerOnDisconnected(socket);
      });
    });
  }
  //Add MiddleWares runtime
  RegisterMiddleWare(key, method) {
    this.#io.on("connection", (socket) => {
      socket.on(key, method);
    });
  }
  //Subscribe #onConnected
  SubscribeOnConnected(method) {
    this.#onConnected.push(method);
  }
  SubscribeOnDisconnected(method) {
    this.#onDisconnected.push(method);
  }
  #TriggerOnConnected(socket) {
    this.#onConnected.forEach((method) => {
      method(socket);
    });
  }
  #TriggerOnDisconnected(socket) {
    this.#onDisconnected.forEach((method) => {
      method(socket);
    });
  }

  SendToOneClient(socketid, key, data) {
    this.#io.to(socketid).emit(key, data);
  }
}

module.exports = { ConnectionHandler };
