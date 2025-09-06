
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
    
UpdateCharPos()
requestAnimationFrame(GameLoop)
Damage()
}

const Spike = document.getElementById("Spike")


function Damage(){
    
    let CharHP = Number(Character.textContent)
    let SpikeCor = Spike.getBoundingClientRect()
    let CharCor = Character.getBoundingClientRect()
    
    if(CharCor.bottom >= SpikeCor.top && CharCor.top <= SpikeCor.bottom && CharCor.right >= SpikeCor.left && CharCor.left <= SpikeCor.right){
        Character.textContent = CharHP - 5
        if(CharCor.bottom < SpikeCor.top){
            Character.style.top = (cY-10) + "px"
            cY -= 10
            console.log(CharCor.top);
            console.log(Character.style.top);
        }
        if(CharCor.right >= SpikeCor.left){
            Character.style.left = (cX-10) + "px"
            cX -= 10
            console.log(CharCor.left);
            console.log(Character.style.left);
        }
        if(CharCor.top = SpikeCor.bottom){
            Character.style.top = (cY+20) + "px"
            cY += 20
            console.log(CharCor.top);
            console.log(Character.style.top);
        }
        // if(CharCor.right >= SpikeCor.left){
        //     Character.style.left = (cX-10) + "px"
        //     cX -= 10
        //     console.log(CharCor.left);
        //     console.log(Character.style.left);
        // }
    }
    
    if (Character.textContent === "0") {
        document.body.style.background = "black"
    }
}

document.addEventListener("keypress",Damage)
document.addEventListener("keyup",Damage)

GameLoop()

document.addEventListener("keydown",ChrCordinate)
document.addEventListener("keyup",ChrCordinate)

function ChrCordinate(){   

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
    
    let SpikeCor = Spike.getBoundingClientRect()
    const SpikePos={
        TOP: SpikeCor.top,
        BOTTOM: SpikeCor.bottom,
        LEFT: SpikeCor.left,
        RIGHT: SpikeCor.right,
    }
    
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
        pageCenterX: rect.left + window.scrollX + (rect.width / 2),
        pageCenterY: rect.top + window.scrollY + (rect.height / 2)
    };
}
