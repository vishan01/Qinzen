class Sprite{
    constructor(x=0,y=0,imgSrc="",frameRate=1,frameBuffer=3,scale=1){
        this.position={x:x,y:y};
        this.image=new Image();
        this.image.onload=()=>{
            this.width=scale*this.image.width/this.frameRate;
            this.height=this.image.height*scale;
        }
        this.image.src=imgSrc;
        this.currentFrame=0;
        this.frameRate=frameRate;
        this.frameBuffer=frameBuffer;
        this.elapsedFrames=0;
    }
    draw(){
        if(!this.image) return

        const cropBox={
            x:this.currentFrame*(this.image.width/this.frameRate),
            y:0,
            width:this.image.width/this.frameRate,
            height:this.image.height
        }



        context.drawImage(this.image,
            cropBox.x,
            cropBox.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }
    update(){
        this.draw();
    }
    updateFrames(){
        this.elapsedFrames++;
        if(this.elapsedFrames>=this.frameBuffer){
            this.elapsedFrames=0;
            this.currentFrame++;
            if(this.currentFrame>this.frameRate-1){
                this.currentFrame=0;
            }
        }
    }
}


