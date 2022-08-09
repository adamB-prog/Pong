class PlayerRepository
{
    #players;
    constructor()
    {
        this.#players = [];
    }

    AddPlayer(player)
    {
        this.#players.push(player);
    }
    RemovePlayer(player)
    {
        let index = this.#players.indexOf(player)
        if (index > -1)
        {
            this.#players.slice(index, 1);
        }
    }
    GetPlayers()
    {
        return this.#players;
    }
    
}


module.exports = {PlayerRepository};