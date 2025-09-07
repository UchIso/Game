
const Character = document.getElementById("Character")

const Spikes = [
        { id: 'Spike1', x: 550, y: 100, width: 50, height: 50},
        { id: 'Spike2', x: 430, y: 520, width: 50, height: 50},
        { id: 'Spike3', x: 200, y: 305, width: 50, height: 50},
        { id: 'Spike4', x: 650, y: 650, width: 50, height: 50},
        { id: 'Spike5', x: 500, y: 505, width: 50, height: 50},
]

const Walls = [
    {id: 'Wall1', x: 230, y: 900, width: 1000, height: 50, type: 'horizon'},
    {id: 'Wall2', x: 650, y: 180, width: 20, height: 200, type: 'vector'},
    {id: 'Wall3', x: 555, y: 500, width: 200, height: 50, type: 'horizon'},
    {id: 'Wall4', x: 350, y: 455, width: 50, height: 200, type: 'vector'},
    {id: 'Wall5', x: 765, y: 390, width: 250, height: 50, type: 'horizon'},
]

Character.textContent = 100
let cX=0
let cY=0
const MoveSpeed = -5
const JumpPower = -10
// let RunSpeed = -10

const Keys = {
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
}

document.addEventListener("keydown",Event => {
    
    let EventCode = Event.code

    if(Keys.hasOwnProperty(EventCode)) {
        Keys[EventCode] = true
        Event.preventDefault()
    }
})

document.addEventListener("keyup",Event => {
    
    let EventCode = Event.code

    if(Keys.hasOwnProperty(EventCode)){
        Keys[EventCode] = false
    }
})

function UpdateCharPos(){
    Character.style.left = cX + "px"
    Character.style.top = cY + "px"
}

document.addEventListener("keydown",BlockFunc)
function BlockFunc(Event){
    if(Event.ctrlKey || Event.metaKey){
        
        Event.preventDefault()
        return false
        
    }if(Event.key === "Shift"){
        
        Event.preventDefault()
        for(let key in Keys){
            Keys[key] = false
        }
        return false
    }
}

function GameLoop(){
    
// if(MoveSpeed == RunSpeed){

    if(Keys.KeyW) cY += MoveSpeed
    if(Keys.KeyS) cY -= MoveSpeed
    if(Keys.KeyA) cX += MoveSpeed
    if(Keys.KeyD) cX -= MoveSpeed
    if(Keys.Space){ 
        cY += JumpPower
        // Cooldown = true
        setTimeout(()=> {
            cY -= JumpPower
            // Cooldown = false
        },500)
    }

// }
// if(RunSpeed < MoveSpeed){

//     if(Keys.w) cY += RunSpeed
//     if(Keys.s) cY -= RunSpeed
//     if(Keys.a) cX += RunSpeed
//     if(Keys.d) cX -= RunSpeed

// }
    
Damage()
WallFunc()
UpdateCharPos()
requestAnimationFrame(GameLoop)
}

let Cooldown = false

Spikes.forEach(Spike => {
    const SpikeElement = document.createElement('div');
    SpikeElement.id = Spike.id;
    SpikeElement.className = `Spike`;
    SpikeElement.style.top = Spike.y + 'px';
    SpikeElement.style.left = Spike.x + 'px';
    SpikeElement.style.width = Spike.width + "px"
    SpikeElement.style.height = Spike.height + "px"
            
    SpikeElement.textContent = Spike.id;
    document.body.appendChild(SpikeElement);
})

Walls.forEach(Wall => {
    const WallElement = document.createElement("div")
    WallElement.id = Wall.id
    WallElement.className = `Wall ${Wall.type}`
    WallElement.style.top = Wall.y + 'px'
    WallElement.style.left = Wall.x + 'px'
    WallElement.style.width = Wall.width + 'px'
    WallElement.style.height = Wall.height + 'px'

    if(Wall.type === 'horizon'){
        WallElement.style.width = Wall.width + 'px';
        WallElement.style.height = Wall.height + 'px';
    }else{
        WallElement.style.width = Wall.width + 'px';
        WallElement.style.height = Wall.height + 'px';
    }
    
    WallElement.textContent = Wall.id
    document.body.appendChild(WallElement)
})

function WallFunc(){
    
    let CharCor = Character.getBoundingClientRect()

    Walls.forEach(Wall => {
    const WallCor = {
        top: Wall.y,
        bottom: Wall.y + Wall.height,
        left: Wall.x,
        right: Wall.x + Wall.width
    } 

    const Collision = (
        CharCor.top <= WallCor.bottom&&
        CharCor.bottom >= WallCor.top&&
        CharCor.left <= WallCor.right&&
        CharCor.right >= WallCor.left
    )

    if (Collision){

        if(CharCor.right > WallCor.left && CharCor.left < WallCor.left){
            cX = WallCor.left - CharCor.width
        }else if(CharCor.left < WallCor.right && CharCor.right > WallCor.right){
            cX = WallCor.right
        }
        if(CharCor.bottom > WallCor.top && CharCor.top < WallCor.top){
            cY = WallCor.top - CharCor.height
        }else if(CharCor.top < WallCor.bottom && CharCor.bottom > WallCor.bottom){
            cY = WallCor.bottom
        }
    }
    
    })
}

function Damage(){
    
    let CharHP = Number(Character.textContent)
    let CharCor = Character.getBoundingClientRect()
    
    Spikes.forEach(Spike => {
        
    const SpikeCor = {
        left: Spike.x,
        right: Spike.x + Spike.width,
        top: Spike.y,
        bottom: Spike.y + Spike.height
    }

    const Collision =(
        CharCor.top <= SpikeCor.bottom&& 
        CharCor.bottom >= SpikeCor.top&&
        CharCor.left <= SpikeCor.right&&
        CharCor.right >= SpikeCor.left
    )   
    
    if(Collision && !Cooldown){
            
        Character.textContent = CharHP - 5

        Cooldown = true
        setTimeout(()=> Cooldown = false , 500)

        let SpikeElement = document.getElementById(Spike.id)
            
        const CharCenter = getCenterCoordinates(Character)
        const SpikeCenter = getCenterCoordinates(SpikeElement)

        const HalfDX = CharCenter.centerX - SpikeCenter.centerX
        const HalfDY = CharCenter.centerY - SpikeCenter.centerY

        const Length = Math.sqrt(HalfDX*HalfDX + HalfDY*HalfDY)
        const NormalDX = HalfDX / Length
        const NormalDY = HalfDY / Length
        
        cX += NormalDX * 30
        cY += NormalDY * 30
    }
})
    if (Character.textContent === "0") {
        document.body.style.background = "black"
    }
}

document.addEventListener("keypress",Damage)
document.addEventListener("keyup",Damage)

GameLoop()

//! ------------------------------------------------------------------------------------- Console -----------------------------------------------------------------------------

document.addEventListener("keydown",Cordinate)
document.addEventListener("keyup",Cordinate)

function Cordinate(){   

    let CharCor = Character.getBoundingClientRect()
    const CharacterPos={
        TOP: CharCor.top,
        BOTTOM: CharCor.bottom,
        LEFT: CharCor.left,
        RIGHT: CharCor.right,
    }

    // console.log(CharacterPos);
    // let centerC = getCenterCoordinates(Character)
    // console.log(centerC);
    
    // console.log("----------------------------------------------------------------------------------------------------------------------");
    
    Spikes.forEach(Spike => {

        const SpikeCor = {
            left: Spike.x,
            right: Spike.x + Spike.width,
            top: Spike.y,
            bottom: Spike.y + Spike.height
        } 
        const SpikePos={
            TOP: SpikeCor.top,
            BOTTOM: SpikeCor.bottom,
            LEFT: SpikeCor.left,
            RIGHT: SpikeCor.right,
        }
    })
    
    // console.log(SpikePos,"Spike");
    // let centerS = getCenterCoordinates(Spike)
    // console.log(centerS);
    
    // console.log("");

    // console.log(Keys);
    
    // console.log("");
    // console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
    // console.log("");
}

function getCenterCoordinates(element) {
    const rect = element.getBoundingClientRect();
    
    return {
        centerX: rect.left + (rect.width / 2),
        centerY: rect.top + (rect.height / 2),
    };
}
