class Player{
    constructor(x=0,y=0,colosionBlocks,platformcollisionBlocks){
        this.position={x:x,y:y};
        this.velocity={x:0,y:1};
        this.height=20;
        this.width=20;
        this.colosionBlocks=colosionBlocks;
        this.platformcollisionBlocks=platformcollisionBlocks;
    }
    draw(){
        context.fillStyle='red';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.draw();
        this.position.x+=this.velocity.x;
        
        this.checkHorizontalCollision();
        this.applyGravity();
        this.checkVerticalCollision();
        
    }

    applyGravity(){
        this.position.y+=this.velocity.y;
        this.velocity.y+=gravity;
    }

    checkVerticalCollision(){
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.position.y+this.height>=block.position.y && this.position.y<=block.position.y+block.height && this.position.x+this.width>=block.position.x && this.position.x<=block.position.x+block.width){
                
                if(this.velocity.y<0){
                    this.velocity.y=0;
                    this.position.y=block.position.y+block.height+0.01;
                    break;
                }
                else{
                this.velocity.y=0;
                this.position.y=block.position.y-this.height-0.01;
                    break;
            }
            }
        }
    }

    checkHorizontalCollision(){
        for(let i=0;i<this.colosionBlocks.length;i++){
            let block=this.colosionBlocks[i];
            if(this.position.y+this.height>=block.position.y && this.position.y<=block.position.y+block.height && this.position.x+this.width>=block.position.x && this.position.x<=block.position.x+block.width){
                
                if(this.velocity.x<0){
                    this.velocity.x=0;
                    this.position.x=block.position.x+block.width+0.01;
                    break;
                }
                else{
                this.velocity.x=0;
                this.position.x=block.position.x-this.width-0.01;
                    break;
            }
            }
        }
    }


}