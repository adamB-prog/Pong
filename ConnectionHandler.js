class ConnectionHandler
{
    #express;
    #app;
    #server;
    #socket;
    #io;
    #maxConnection;
    constructor(port = 3000, maxConnection = Infinity)
    {
        
        this.#express = require('express');
        this.#app = this.#express();
        this.#server = this.#app.listen(port);
        this.#app.use(this.#express.static('public'));
        this.#socket = require('socket.io')
        this.#io = this.#socket(this.#server);
        this.#maxConnection = maxConnection;
        
        console.log(`Server running at port ${port}.`);

        this.#SetupDefaultMiddleWares();
    }

    #SetupDefaultMiddleWares()
    {

        
        this.#io.on("connection", (socket) => {
            console.log("new connection: " + socket.id + " Connection count: " + this.#io.engine.clientsCount);
            
            if(this.#io.engine.clientsCount > this.#maxConnection)
            {
                
                socket.disconnect();
                console.log("disconnected: " + socket.id);
            }
            socket.on("close", () => {
                console.log("disconnected: " + socket.id + " Connection count: " + this.#io.engine.clientsCount);
            });
            
            socket.on("disconnect", (reason) => {
                console.log("disconnected: " + socket.id + " Connection count: " + this.#io.engine.clientsCount);
            });

        });
    }
    RegisterMiddleWare(key, method)
    {
        this.#io.on("connection", (socket) => {
            socket.on(key,method);
            
        });
        
    }
}


module.exports = {ConnectionHandler};