
const Character = document.getElementById("Character")
Character.textContent = 100
let cX=0
let cY=0
const MoveSpeed = -10
let RunSpeed = -10

const Keys = {
    w: false,
    s: false,
    a: false,
    d: false,
}

document.addEventListener("keydown",Event => {
    
    let EventKey = Event.key

    if(Keys.hasOwnProperty(EventKey)) {
        Keys[EventKey] = true
        Event.preventDefault()
    }
})

document.addEventListener("keyup",Event => {
    
    let EventKey = Event.key

    if(Keys.hasOwnProperty(EventKey)){
        Keys[EventKey] = false
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
    
if(MoveSpeed == RunSpeed){

    if(Keys.w) cY += MoveSpeed
    if(Keys.s) cY -= MoveSpeed
    if(Keys.a) cX += MoveSpeed
    if(Keys.d) cX -= MoveSpeed

}
if(RunSpeed < MoveSpeed){

    if(Keys.w) cY += RunSpeed
    if(Keys.s) cY -= RunSpeed
    if(Keys.a) cX += RunSpeed
    if(Keys.d) cX -= RunSpeed

}
    
Damage()
UpdateCharPos()
requestAnimationFrame(GameLoop)
}

let Cooldown = false

const Spikes = [
        { id: 'Spike1', x: 550, y: 100, width: 50, height: 50},
        { id: 'Spike2', x: 430, y: 520, width: 50, height: 50},
        { id: 'Spike3', x: 200, y: 305, width: 50, height: 50},
        { id: 'Spike4', x: 650, y: 650, width: 50, height: 50},
        { id: 'Spike5', x: 500, y: 505, width: 50, height: 50},
        { id: 'Spike6', x: 600, y: 350, width: 50, height: 50},
]

Spikes.forEach(Spike => {
            const SpikeElement = document.createElement('div');
            SpikeElement.id = Spike.id;
            SpikeElement.className = `Spike`;
            SpikeElement.style.left = Spike.x + 'px';
            SpikeElement.style.top = Spike.y + 'px';
            SpikeElement.style.width = Spike.width + "px"
            SpikeElement.style.height = Spike.height + "px"
            
            SpikeElement.textContent = Spike.id;
            document.body.appendChild(SpikeElement);
})

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
        CharCor.bottom >= SpikeCor.top&&
        CharCor.top <= SpikeCor.bottom&& 
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
