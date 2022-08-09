class NetworkManager
{
    #socket;

    static #instance = null;
    constructor()
    {
        this.#socket = null;
        
    }

    static GetInstance()
    {
        if(NetworkManager.#instance == null) this.#instance = new NetworkManager();
        return this.#instance;
    }

    Connect(endpoint)
    {
        this.#socket = io.connect(endpoint);
        this.#socket.on("connect", () => {
            console.log("Connected as: " + this.#socket.id);
        });
        this.#socket.on("disconnect", () => {
            console.log("Disconnected.");
        });
    }

    AddListener(key, method)
    {
        this.#socket.on(key, method);
    }
    SendToServer(key, data)
    {
        this.#socket.emit(key, data);
    }
    Disconnect()
    {
        this.#socket.disconnect();
    }
}