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

//Player Class + Gravity
const gravity=0.1;
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
}

animate()