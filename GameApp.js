
const Character = document.getElementById("Character")
Character.textContent = 100
let cX=0
let cY=0
const MoveSpeed = -10

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
    console.log(Event);
    if(Event.key === "Shift"){
        Event.preventDefault()
        Event.isTrusted = false
        for(let key in Keys){
            Keys[key] = false
        }
        return false
    }
    // if(Event.ctrlKey || Event.metaKey){
        // Event.preventDefault()
        // Event.isTrusted = false
        // return false
    // }
}

function GameLoop(){

    if(Keys.w) cY += MoveSpeed
    if(Keys.s) cY -= MoveSpeed
    if(Keys.a) cX += MoveSpeed
    if(Keys.d) cX -= MoveSpeed
    
    UpdateCharPos()
    requestAnimationFrame(GameLoop)
}

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
    console.log(CharacterPos);
    console.log(Keys);
    let center = getCenterCoordinates(Character)
    console.log(center);

    console.log("------------------------------------");
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
