class Player extends Sprite{
    constructor(x=0,y=0,colosionBlocks,platformcollisionBlocks,animations){
        super(x,y,'./img/Samurai/Idle.png',6,5,0.5);
        this.position={x:x,y:y};
        this.velocity={x:0,y:1};

        this.colosionBlocks=colosionBlocks;
        this.platformcollisionBlocks=platformcollisionBlocks;
        
        this.animation=animations
        for(let key in this.animation){
            this.animation[key].image=new Image();
            this.animation[key].image.src=this.animation[key].imageSrc;
           
        }
    }
    
    switchSprite(key){
        if(this.image==this.animation[key].image) return;
        this.currentFrame=0;
        this.image=this.animation[key].image;
        this.frameRate=this.animation[key].frameRate;
        this.frameBuffer=this.animation[key].frameBuffer;
    }


    update(){
        this.updateFrames();
        this.updateHitBox();
        context.fillStyle='rgba(59, 153, 40, 0.5)';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.fillStyle='rgba(248, 46, 46, 0.55)';
        context.fillRect(this.hitBox.x,this.hitBox.y,this.hitBox.width,this.hitBox.height);
        this.draw();

        this.position.x+=this.velocity.x;
        this.updateHitBox();
        this.checkHorizontalCollision();
        this.applyGravity();
        this.updateHitBox();
        this.checkVerticalCollision();
        
        
    }

    updateHitBox(){
        this.hitBox={
            x:this.position.x+20,
            y:this.position.y+21,
            width:26,
            height:43
        }
    }


    applyGravity(){
        this.position.y+=this.velocity.y;
        this.velocity.y+=gravity;
    }

    checkVerticalCollision(){
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.hitBox.y+this.hitBox.height>=block.position.y //top of block
                && 
                this.hitBox.y<=block.position.y+block.height //bottom of block
                && 
                this.hitBox.x+this.hitBox.width>=block.position.x //left of block
                && 
                this.hitBox.x<=block.position.x+block.width//right of block
                ){
                    
                if(this.velocity.y<0){
                    this.velocity.y=0;
                    const offset= this.hitBox.y-this.position.y;
                    this.position.y=block.position.y+block.height-offset+0.01;
                    break;
                }
                if(this.velocity.y>0){
                this.velocity.y=0;
                const offset=this.position.y+this.height-(this.hitBox.y+this.hitBox.height);
                this.position.y=block.position.y-this.height+offset-0.01;
                    break;
            }
            }
        }


        // Platform collision blocks
        for(let i=0;i<this.platformcollisionBlocks.length;i++){
            let block=this.platformcollisionBlocks[i];
            if(this.hitBox.y+this.hitBox.height>=block.position.y //top of block
                && 
                this.hitBox.y+this.hitBox.height<=block.position.y+block.height //bottom of block
                && 
                this.hitBox.x+this.hitBox.width>=block.position.x //left of block
                && 
                this.hitBox.x<=block.position.x+block.width//right of block
                ){
                    
                
                if(this.velocity.y>0){
                this.velocity.y=0;
                const offset=this.position.y+this.height-(this.hitBox.y+this.hitBox.height);
                this.position.y=block.position.y-this.height+offset-0.01;
                    break;
            }
            }
        }


    }

    checkHorizontalCollision(){
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.hitBox.y+this.hitBox.height>=block.position.y //top of block
                && 
                this.hitBox.y<=block.position.y+block.height //bottom of block
                && 
                this.hitBox.x+this.hitBox.width>=block.position.x //left of block
                && 
                this.hitBox.x<=block.position.x+block.width//right of block
            ){
                
                if(this.velocity.x<0){
                    this.velocity.x=0;
                    const offset= this.hitBox.x-this.position.x;
                    this.position.x=block.position.x+block.width-offset+0.01;
                    console.log(this.position.x)
                    break;
                }
                if(this.velocity.x>0){
                this.velocity.x=0;
                const offset= this.position.x+this.width-(this.hitBox.x+this.hitBox.width);
                this.position.x=block.position.x-this.width+offset-0.01;
                    break;
            }
            }
        }

       



    }


}