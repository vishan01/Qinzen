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

//Player Class
class Player{
    constructor(x=0,y=0){
        this.position={x:x,y:y};
    }
    draw(){
        context.fillStyle='red';
        context.fillRect(this.position.x,this.position.y,50,50);
    }
    update(){
        this.draw();
        this.position.y=this.position.y<canvas.height-50?this.position.y+=1:canvas.height-50;
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