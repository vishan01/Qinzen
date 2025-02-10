class collisionBlock{
    constructor(x=0,y=0){
        this.position={x:x,y:y};
        this.width=16;
        this.height=16;
    }
    draw(){
        context.fillStyle='rgba(255, 0, 0, 0.43)';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.draw();
    }
}


