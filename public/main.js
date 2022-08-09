var canvas;
var players = [];
window.addEventListener('beforeunload', () => {
    NetworkManager.GetInstance().Disconnect();
});

function SetupNetwork()
{
    NetworkManager.GetInstance().Connect(window.location.href);
    NetworkManager.GetInstance().AddListener("packet", (data) => {
        console.log(data);
    })
}

function SetupInput()
{
    InputManager.GetInstance().SubscribeOnElement(document);
    InputManager.GetInstance().SubscribeToKeyPressed(() => {
        let inputManager = InputManager.GetInstance();
        let networkManager = NetworkManager.GetInstance();
        
        if(inputManager.GetKeys().length == 1) networkManager.SendToServer("ActiveInput", inputManager.GetKeys()[0]); 
        
        else networkManager.SendToServer("ActiveInput", null);
        
            
        
    });
    InputManager.GetInstance().SubscribeToKeyReleased(() =>
    {
        let inputManager = InputManager.GetInstance();
        let networkManager = NetworkManager.GetInstance();
        if(inputManager.GetKeys().length == 1) NetworkManager.GetInstance().SendToServer("ActiveInput", inputManager.GetKeys()[0]); 
        
        else networkManager.SendToServer("ActiveInput", null);
        
    });
}

function setup()
{
    SetupNetwork();
    SetupInput();
    canvas = createCanvas(windowWidth, windowHeight);
    
    frameRate(60);
}

function draw()
{
    background(0,0,0, 50);
    noStroke();
    rect(0,0.5 * (canvas.height - 150),30,150);
    rect(width - 30, 0.5 * (canvas.height - 150), 30, 150);
}
function windowResized()
{
    resizeCanvas(window.innerWidth,window.innerHeight)
}

