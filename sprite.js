class Sprite{
    constructor(x=0,y=0,imgSrc=""){
        this.position={x:x,y:y};
        this.image=new Image();
        this.image.src=imgSrc;
    }
    draw(){
        if(!this.image) return
        context.drawImage(this.image,this.position.x,this.position.y);
    }
    update(){
        this.draw();
    }
}


