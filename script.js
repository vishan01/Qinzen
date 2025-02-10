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


//Possible movements for player
const keys={
    ArrowUp:false,
    ArrowLeft:false,
    ArrowRight:false
}

//Player Class + Gravity
const gravity=0.25;
class Player{
    constructor(x=0,y=0){
        this.position={x:x,y:y};
        this.velocity={x:0,y:1};
        this.height=50;
        this.width=50;
    }
    draw(){
        context.fillStyle='red';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.draw();
        this.position.y+=this.velocity.y;
        if(this.position.y+this.height+this.velocity.y<canvas.height){
            this.velocity.y+=gravity;
        }else{
            this.velocity.y=0;
        }
        
    }
}

//player object
const player=new Player();

// Gravity Animation
function animate(){

    window.requestAnimationFrame(animate);
    context.fillStyle='teal';
    context.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    if(keys.ArrowRight){
        player.position.x+=5;
    }else if(keys.ArrowLeft){
        player.position.x-=5;
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
            player.velocity.y=-10;
            break;
        case 'ArrowUp':
            player.velocity.y=-10;
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