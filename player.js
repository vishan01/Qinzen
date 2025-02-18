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

        this.cameraBox={
            position:{x:this.position.x-50,y:this.position.y},
            width:150,
            height:100
        }
        this.hitBox={
            x:this.position.x+25,
            y:this.position.y+21,
            width:15,
            height:43
        }

    }


    checkForHorizontalCollision(){
        if(this.hitBox.x+this.hitBox.width+this.velocity.x>=576 || this.hitBox.x+this.velocity.x<=0){
            this.velocity.x=0;
        }
    }
    checkForVerticalCollision(){
        if(this.hitBox.y+this.velocity.y<=0){
            this.velocity.y=0;
        }
    }


    shouldPanCameraToLeft({canvas,camera}){
        const cameraBoxRight=this.cameraBox.position.x+this.cameraBox.width;
        const scaledDownCanvasWidth=canvas.width/3;
        const addedWidth=Math.abs(camera.position.x);;

        if(cameraBoxRight>=576) return;

        if(cameraBoxRight>=scaledDownCanvasWidth+addedWidth){
            camera.position.x-=this.velocity.x;
        }
    }

    shouldPanCameraToRight({canvas,camera}){
        const cameraBoxLeft=this.cameraBox.position.x
        const addedWidth=Math.abs(camera.position.x);;

        if(cameraBoxLeft<=0) return;

        if(cameraBoxLeft<=addedWidth){
            camera.position.x-=this.velocity.x;
        }
    }

    shouldPanCameraToDown({canvas,camera}){
        const cameraBoxDown=this.cameraBox.position.y
        const addedHeight=Math.abs(camera.position.y);;

        if(cameraBoxDown+this.velocity.y<=0) return;

        if(cameraBoxDown<=addedHeight){
            camera.position.y-=this.velocity.y;
        }
    }
    
    shouldPanCameraToUp({canvas,camera}){
        const cameraBoxUp=this.cameraBox.position.y+this.cameraBox.height;
        const scaledCanvasHeight=canvas.height/3;
        const addedHeight=Math.abs(camera.position.y);;

        if(cameraBoxUp+this.velocity.y>=432) return;

        if(cameraBoxUp>=scaledCanvasHeight+addedHeight){
            camera.position.y-=this.velocity.y;
        }
    }


    switchSprite(key){
        if(this.image==this.animation[key].image) return;
        this.currentFrame=0;
        this.image=this.animation[key].image;
        this.frameRate=this.animation[key].frameRate;
        this.frameBuffer=this.animation[key].frameBuffer;
    }
    updateCameraBox(){
        this.cameraBox={
            position:{x:this.position.x-50,y:this.position.y},
            width:150,
            height:100
        }
    }


    update(){
       
        this.updateFrames();
        this.updateHitBox();
        
        // context.fillStyle='rgba(46, 248, 248, 0.55)';
        // context.fillRect(this.cameraBox.position.x,this.cameraBox.position.y,this.cameraBox.width,this.cameraBox.height);
        // context.fillStyle='rgba(59, 153, 40, 0.5)';
        // context.fillRect(this.position.x,this.position.y,this.width,this.height);
        // context.fillStyle='rgba(248, 46, 46, 0.55)';
        // context.fillRect(this.hitBox.x,this.hitBox.y,this.hitBox.width,this.hitBox.height);
        this.updateCameraBox();
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
            x:this.position.x+25,
            y:this.position.y+21,
            width:15,
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