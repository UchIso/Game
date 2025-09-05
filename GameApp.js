
const Character = document.getElementById("Character")
Character.textContent = "100%"

let cX=0
let cY=0
function MoveFunc(mX,mY) {
    cX += mX
    cY += mY
    Character.style.transform = `translate(${cX}px, ${cY}px)`
    // console.log(cX,cY);
}
MoveFunc(20,20)
console.log(cX,cY);

const Area = document.addEventListener("keypress",AreaFunc)
function AreaFunc(Event){
 
    const MoveSpeed = -10
    
    switch(Event.key){

        case "w":
            console.log(Event.key);
            MoveFunc(0 , MoveSpeed)
            break
        case "s":
            console.log(Event.key);
            MoveFunc(0 , -MoveSpeed)
            break
        case "a":
            console.log(Event.key);
            MoveFunc(MoveSpeed , 0)
            break
        case "d":
            console.log(Event.key);
            MoveFunc(-MoveSpeed , 0)
            break

        case "W":
            console.log(Event.key);
            MoveFunc(0 , MoveSpeed*1.5)
            break

        case "S":
            console.log(Event.key);
            MoveFunc(0 , -MoveSpeed*1.5)
            break

        case "A":
            console.log(Event.key);
            MoveFunc(MoveSpeed*1.5 , 0)
            break

        case "D":
            console.log(Event.key);
            MoveFunc(-MoveSpeed*1.5 , 0)
            break
    }
    // console.log("------------------");
}


const Spike = document.getElementById("Spike")

document.addEventListener("keyup",Damege)
function Damege(){
    let SpikeC = Spike.getBoundingClientRect()
    console.log(SpikeC.top , "Spike-T");
    console.log(SpikeC.bottom , "Spike-B");
    console.log(SpikeC.left , "Spike-L");
    console.log(SpikeC.right , "Spike-R");
    console.log("------------------")
    let CharacterC = Character.getBoundingClientRect()
    console.log(CharacterC.top , "Char-T");
    console.log(CharacterC.bottom , "Char-B");
    console.log(CharacterC.left , "Char-L");
    console.log(CharacterC.right , "Char-R");

    if(SpikeC.top <= CharacterC.bottom || SpikeC.bottom >= CharacterC.top || SpikeC.left >= CharacterC.right || SpikeC.right <= CharacterC.left){
        console.log("AH");
    }
} 
Damege()