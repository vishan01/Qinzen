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
            platformcollisionBlocks.push(new collisionBlock(x*16,y*16,10))
        }
    })
})


//Possible movements for player
const keys={
    ArrowUp:false,
    ArrowLeft:false,
    ArrowRight:false
}

const gravity=0.3;

//background Image
const background=new Sprite(0,0,'./img/qinzen.png');

//player object
const animations={
    idle: {imageSrc:'./img/Samurai/Idle.png',frameRate:6,frameBuffer:5},
    idleLeft: {imageSrc:'./img/Samurai/IdleLeft.png',frameRate:6,frameBuffer:5},
    run: {imageSrc:'./img/Samurai/Run.png',frameRate:8, frameBuffer:4},
    runLeft: {imageSrc:'./img/Samurai/RunLeft.png',frameRate:8, frameBuffer:4},
    jumpLeft: {imageSrc:'./img/Samurai/Jump.png',frameRate:1,frameBuffer:8},
    jumpRight:{imageSrc:'./img/Samurai/Jump_Right.png',frameRate:1,frameBuffer:8},
    fall: {imageSrc:'./img/Samurai/Fall.png',frameRate:1,frameBuffer:8},
    fallRight: {imageSrc:'./img/Samurai/Fall_Right.png',frameRate:1,frameBuffer:8},
    attack: {imageSrc:'./img/Samurai/Attack_3.png',frameRate:3,frameBuffer:2},
    attackleft: {imageSrc:'./img/Samurai/Attack_3_Left.png',frameRate:3,frameBuffer:2},
}

// new player object
const player=new Player(x=80,y=290,collisionBlocks,platformcollisionBlocks,animations);

// camera object
const camera={
    position:{x:0,y:(canvas.height/3)-432}
}


// direction of character 
const direction={
    right:true,
}

// Gravity Animation
function animate(){
    
    window.requestAnimationFrame(animate);
    

    context.fillStyle='teal';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.save()
    context.scale(3,3)
    context.translate(camera.position.x,camera.position.y)
    background.update();
    collisionBlocks.forEach(block=>{block.update()})
    platformcollisionBlocks.forEach(block=>{block.update()})
    player.checkForHorizontalCollision();
    player.checkForVerticalCollision();
    player.update();
    
    player.velocity.x=0;
    if(keys.space){
        if(direction.right){
            player.switchSprite('attack');
        }else{
        player.switchSprite('attackleft');}
    }else{
    if(keys.ArrowRight){
        player.switchSprite('run');
        player.velocity.x+=3;
        player.shouldPanCameraToLeft({canvas,camera});
    }
    else if(keys.ArrowLeft){
        player.velocity.x-=3;
        player.switchSprite('runLeft');
        player.shouldPanCameraToRight({canvas,camera});
    }
    else if(player.velocity.y==0){
        if(direction.right){
            player.switchSprite('idle');
        }else{
            player.switchSprite('idleLeft');
        }
    }

    if(player.velocity.y<0){
        if(direction.right){
            player.switchSprite('jumpRight');
      }
        else{
            player.switchSprite('jumpLeft');}
            player.shouldPanCameraToDown({canvas,camera});
    }
    else if(player.velocity.y>0){
        player.shouldPanCameraToUp({canvas,camera});
    }
    
}
    context.restore()
    
}

animate()

//Key Press Event

//On pressing key, player moves
document.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.ArrowRight=true;
            direction.right=true;
            break;
        case 'a':
            keys.ArrowLeft=true;
            direction.right=false;
            break;
        case 'w':
        
            player.velocity.y=-6;
            break;
        case 'ArrowUp':
        
            player.velocity.y=-6;
            break;
        case 'ArrowRight':
            keys.ArrowRight=true;
            direction.right=true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft=true;
            direction.right=false;
            break;
        case ' ':
            keys.space=true;
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
        case ' ':
            keys.space=false;
            break;
    }
})