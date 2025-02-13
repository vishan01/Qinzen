const canvas=document.querySelector('canvas');
const context=canvas.getContext('2d');


//16:9 aspect ratio
canvas.width=1024
canvas.height=576


//Background color
const Background={
    fillStyle:'teal',
    fillRect:(0,0,canvas.width,canvas.height)
}

// floor collision 2d
const floorCollision2D=[]
for(let i=0;i<floorcollision.length;i+=36){
    floorCollision2D.push(floorcollision.slice(i,i+36))
}
const collisionBlocks=[]
floorCollision2D.forEach((row,y)=>{
    row.forEach((tile,x)=>{
        if(tile){
            collisionBlocks.push(new collisionBlock(x*16,y*16))
        }
    })
})


// platform collision 2d
const platformCollision2D=[]
for(let i=0;i<platformcollision.length;i+=36){
    platformCollision2D.push(platformcollision.slice(i,i+36))
}
const platformcollisionBlocks=[]
platformCollision2D.forEach((row,y)=>{
    row.forEach((tile,x)=>{
        if(tile){
            platformcollisionBlocks.push(new collisionBlock(x*16,y*16))
        }
    })
})


//Possible movements for player
const keys={
    ArrowUp:false,
    ArrowLeft:false,
    ArrowRight:false
}

const gravity=0.6;

//background Image
const background=new Sprite(0,0,'./img/qinzen.png');

//player object
const animations={
    idle: {imageSrc:'./img/Samurai/Idle.png',frameRate:0},
    run: {imageSrc:'./img/Samurai/Run.png',frameRate:0},
    jump: {imageSrc:'./img/Samurai/Jump.png',frameRate:0},
    fall: {imageSrc:'./img/Samurai/Fall.png',frameRate:0},
}


const player=new Player(x=80,y=290,collisionBlocks,platformcollisionBlocks,animations);

// Gravity Animation
function animate(){
    
    window.requestAnimationFrame(animate);
    context.fillStyle='teal';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.save()
    context.scale(3,3)
    context.translate(0,(canvas.height/3)-background.image.height)
    background.update();
    collisionBlocks.forEach(block=>{block.update()})
    platformcollisionBlocks.forEach(block=>{block.update()})
    player.update();
    context.restore()
    
    player.velocity.x=0;
    if(keys.ArrowRight){
        player.velocity.x+=5;
    }
    if(keys.ArrowLeft){
        player.velocity.x-=5;
    }
    
}

animate()

//Key Press Event

//On pressing key, player moves
document.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.ArrowRight=true;
            break;
        case 'a':
            keys.ArrowLeft=true;
            break;
        case 'w':
            player.velocity.y=-8;
            break;
        case 'ArrowUp':
            player.velocity.y=-8;
            break;
        case 'ArrowRight':
            keys.ArrowRight=true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft=true;
            break;
    }
})

//On releasing key, player stops
document.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.ArrowRight=false;
            break;
        case 'a':
            keys.ArrowLeft=false;
            break;
        case 'ArrowRight':
            keys.ArrowRight=false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft=false;
            break;
    }
})