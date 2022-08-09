class Logic
{
    #playerRepository;
    #endGame;

    constructor(playerRepository)
    {
        this.#playerRepository = playerRepository;
        this.#endGame = true;
    }
    StartGame()
    {
        this.#Tick();
    }
    #Tick()
    {
        this.#playerRepository.forEach(player => {
            
        });
    }

}

module.exports = {Logic};