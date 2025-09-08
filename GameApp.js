
const Character = document.getElementById("Character")

const Spikes = [
        { id: 'Spike1', x: 1000, y: 100, width: 50, height: 50},
        { id: 'Spike2', x: 1500, y: 100, width: 50, height: 50},
        { id: 'Spike3', x: 1000, y: 600, width: 50, height: 50},
        { id: 'Spike4', x: 1500, y: 600, width: 50, height: 50},
        { id: 'Spike5', x: 1250, y: 350, width: 50, height: 50},
]

const Walls = [
    {id: 'Wall1', x: 230, y: 1100, width: 1500, height: 100, type: 'horizon'},
    {id: 'Wall2', x: 1000, y: 150, width: 25, height: 450, type: 'vector'},
    {id: 'Wall3', x: 1525, y: 150, width: 25, height: 450, type: 'vector'},
    {id: 'Wall4', x: 1050, y: 625, width: 175, height: 25, type: 'vector'},
    {id: 'Wall5', x: 1050, y: 100, width: 450, height: 25, type: 'horizom'},
    {id: 'Wall6', x: 1325, y: 625, width: 175, height: 25, type: 'vector'},
    {id: 'Wall7', x: 850, y: 800, width: 350, height: 50, type: 'horizon'},
    {id: 'Wall8', x: 850, y: 850, width: 50, height: 250, type: 'vector'},
    {id: 'Wall9', x: 1150, y: 850, width: 50, height: 180, type: 'horizon'},
    {id: 'Wall10', x: 265, y: 390, width: 250, height: 50, type: 'horizon'},
]

const ShadowSkils = [
    {id: 'SadwoSkill', x: 265, y: 290, width: 100, height: 100, type: 'horizon'},
]

Character.textContent = 100
let cX=1000
let cY=1000
let MoveSpeed = -5
const JumpPower = -10
let Cooldown = false
let DashCoolDown = false

// let RunSpeed = -10

const Keys = {
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
}

//! ---------------------------------------------------------------------------------------------------------- ELEMENT ADD CODES --------------------------------------------------------

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

ShadowSkils.forEach(ShadowSkill => {
    const ShadwoSkillElement = document.createElement("div")
    ShadwoSkillElement.id = ShadowSkill.id
    ShadwoSkillElement.className = `ShadowSkill ${ShadowSkill.type}`
    ShadwoSkillElement.style.top = ShadowSkill.y + "px"
    ShadwoSkillElement.style.left = ShadowSkill.x + "px"
    ShadwoSkillElement.style.width = ShadowSkill.width + "px"
    ShadwoSkillElement.style.height = ShadowSkill.height + "px"

    if(ShadowSkill.type === 'horizon'){
        ShadwoSkillElement.style.width = ShadowSkill.width + "px"
        ShadwoSkillElement.style.height = ShadowSkill.height + "px"
    }else{
        ShadwoSkillElement.style.width = ShadowSkill.width + "px"
        ShadwoSkillElement.style.height = ShadowSkill.height + "px"
    }

    ShadwoSkillElement.textContent = ShadowSkill.id
    document.body.appendChild(ShadwoSkillElement)
})

//! --------------------------------------------------------------------------------------- Key Codes ------------------------------------------------------------------------------

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

document.addEventListener("keydown",Event => {
    if(Event.code === "KeyE" && !DashCoolDown){
        DashCoolDown = true
    }
})
document.addEventListener("keyup",Event => {
    if(Event.code === "KeyE" && DashCoolDown){
        MoveSpeed = -20
        setTimeout(()=> {
            DashCoolDown = false
            MoveSpeed = -5
        } ,250)
    }
})

//! ------------------------------------------------------------------------------------------------ Game Code -----------------------------------------------------------------

function GameLoop(){
    
    let Moved = false
// if(MoveSpeed == RunSpeed){

    if(Keys.KeyW){
        if(!ChekCollisionY(cY + MoveSpeed)){
            cY += MoveSpeed
            Moved = true
        }
    } 
    if(Keys.KeyS){
        if(!ChekCollisionY(cY - MoveSpeed)){
            cY -= MoveSpeed
            Moved = true
        }
    }
    if(Keys.KeyA){
        if(!ChekCollisionX(cX + MoveSpeed)){
            cX += MoveSpeed
            Moved = true
        }
    }
    if(Keys.KeyD){
        if(!ChekCollisionX(cX - MoveSpeed)){
            cX -= MoveSpeed
            Moved = true
        }
    }
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
ShadowSkillFunc()
UpdateCharPos()
requestAnimationFrame(GameLoop)
}

//?---------------------------------------------------------------------------------------------------------------


function ShadowSkillFunc(){
    let ShadowSkil = false
    let CharCor = Character.getBoundingClientRect()

    ShadowSkils.forEach(ShadowSkill => {

        const Shadow = document.getElementById(ShadowSkill.id)
        const ShadowCor = Shadow.getBoundingClientRect()

        if(CharCor.top > ShadowCor.top && CharCor.bottom < ShadowCor.bottom && CharCor.left > ShadowCor.left && CharCor.right < ShadowCor.right){
            ShadowSkil = true
        }        
    })

    if(ShadowSkil){
        Character.style.background = "black"
        Character.style.color = "white"
        Character.style.boxShadow = "0px 0px 10px 5px white"
        Cooldown = true
        MoveSpeed = -20 

        document.addEventListener("keydown",Event => {
            if(Event.code === "KeyE" && !DashCoolDown){
                DashCoolDown = true
            }
        })
        document.addEventListener("keyup",Event => {
        if(Event.code === "KeyE" && DashCoolDown){
                MoveSpeed = -35
                setTimeout(()=> {
                    DashCoolDown = false
                    MoveSpeed = -20
                } ,250)
            }
        })
    }
}

//?----------------------------------------------------------------------------------------------------------------

function ChekCollisionX(NewX) {
    return ChekCollision(NewX,cY)
}
function ChekCollisionY(NewY) {
    return ChekCollision(cX,NewY)
}
function ChekCollision(NewX,NewY){

    let TempX = Character.style.left
    let TempY = Character.style.top

    Character.style.left = NewX + "px"
    Character.style.top = NewY + "px"
    
    let CharCor = Character.getBoundingClientRect()
    let CollisionDedect = false
    
    Walls.forEach(Wall => {

        const WallElement = document.getElementById(Wall.id)
        const WallCor = WallElement.getBoundingClientRect()
        
        const Collision = (
            CharCor.top <= WallCor.bottom&&
            CharCor.bottom >= WallCor.top&&
            CharCor.left <= WallCor.right&&
            CharCor.right >= WallCor.left
        )

        if (Collision){
            CollisionDedect = true
        }
    })
    Character.style.left = TempX
    Character.style.top = TempY

    return CollisionDedect 
}

//?----------------------------------------------------------------------------------------------------------------

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