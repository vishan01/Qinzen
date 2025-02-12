class Player extends Sprite{
    constructor(x=0,y=0,colosionBlocks,platformcollisionBlocks){
        super(x,y,'./img/Samurai/Idle.png',6,5,0.5);
        this.position={x:x,y:y};
        this.velocity={x:0,y:1};

        this.colosionBlocks=colosionBlocks;
        this.platformcollisionBlocks=platformcollisionBlocks;
        
    }
    
    update(){
        this.updateFrames();
        this.updateHitBox();
        context.fillStyle='rgba(59, 153, 40, 0.5)';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.fillStyle='rgba(248, 46, 46, 0.55)';
        context.fillRect(this.hitBox.x,this.hitBox.y,this.hitBox.width,this.hitBox.height);
        this.draw();
        this.updateHitBox();

        this.position.x+=this.velocity.x;
        
        this.checkHorizontalCollision();
        
        this.applyGravity();
        this.checkVerticalCollision();
        
        
    }

    updateHitBox(){
        this.hitBox={
            x:this.position.x+20,
            y:this.position.y+21,
            width:25,
            height:43
        }
    }


    applyGravity(){
        this.position.y+=this.velocity.y;
        this.velocity.y+=gravity;
    }

    checkVerticalCollision(){
        let flag=false;
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.position.y+this.height>=block.position.y //top of block
                && 
                this.position.y+this.height-this.hitBox.height<=block.position.y+block.height //bottom of block
                && 
                this.hitBox.x+this.hitBox.width>=block.position.x //left of block
                && 
                this.hitBox.x<=block.position.x+block.width//right of block
                ){
                    if(block.position.x==128 && block.position.y==368){
                        flag=true;
                        console.log("vertical collision")
                        console.log(this.hitBox)
                        console.log(this.velocity)
                    }
                if(this.velocity.y<0){
                    this.velocity.y=0;
                    this.position.y=block.position.y+block.height+0.01;
                    break;
                }
                else if(this.velocity.y>0){
                this.velocity.y=0;
                this.position.y=block.position.y-this.height-0.01;
                    break;
            }
            }
        }
        if(flag)
        console.log(this.hitBox)
    }

    checkHorizontalCollision(){
        let flag=false;
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.position.y+this.height>=block.position.y //top of block
                && 
                this.position.y+this.height-this.hitBox.height<=block.position.y+block.height //bottom of block
                && 
                this.hitBox.x+this.hitBox.width>=block.position.x //left of block
                && 
                this.hitBox.x<=block.position.x+block.width//right of block
            ){
                console.log(this.hitBox)
                console.log(this)
                console.log(block)
                flag=true;
                console.log(this.velocity)
                if(this.velocity.x<0){
                    this.velocity.x=0;
                    const offset= this.hitBox.x-this.position.x;
                    this.position.x=block.position.x+block.width-offset+0.01;
                    console.log(this.position.x)
                    break;
                }
                else if(this.velocity.x>0){
                this.velocity.x=0;
                const offset= this.position.x+this.width-(this.hitBox.x+this.hitBox.width);
                this.position.x=block.position.x-offset-0.01;
                    break;
            }
            }
        }
        if(flag)
            console.log(this.hitBox)
    }


}