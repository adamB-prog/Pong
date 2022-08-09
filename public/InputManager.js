class InputManager
{

    #keys;
    #allowedKeys;

    static #instance = null;
    //array that acts like the holder for event methods
    static #keyPressed = [];
    static #keyReleased = [];
    constructor()
    {
        this.#keys = [];
        this.#allowedKeys = ["ArrowUp", "ArrowDown"];
    }
    
    static GetInstance()
    {
        if(InputManager.#instance == null) this.#instance = new InputManager();

        return this.#instance;
    }

    SubscribeOnElement(element)
    {
        element.addEventListener('keyup', (e) => {
            let success = this.#OnKeyUp(e.key);
            if (success)
            {
                InputManager.#keyReleased.forEach(method => {
                    //trigger all the subscribed methods
                    method();
                });
            }
            
        });
        element.addEventListener('keydown', (e) => {
            let success = this.#OnKeyDown(e.key);
            
            if(success)
            {
                InputManager.#keyPressed.forEach(method => {
                    //trigger all the subscribed methods
                    method();
                });
            }
            
        })
    }
    
    #OnKeyUp(key)
    {
        let index = this.#keys.indexOf(key);
        
        if(index > -1)
        {
            this.#keys.splice(index, 1);
            return true;
        }

        
        console.log(this.GetKeys());

        return false;
    }
    #OnKeyDown(key)
    {   
        
        if(!this.#allowedKeys.includes(key) || this.#keys.includes(key))
        {
            return false;
        }

        this.#keys.push(key);
        console.log(this.GetKeys());
        return true;
    }
    SubscribeToKeyPressed(method)
    {
        InputManager.#keyPressed.push(method);
    }
    SubscribeToKeyReleased(method)
    {
        InputManager.#keyReleased.push(method);
    }
    GetKeys()
    {
        return this.#keys;
    }
}