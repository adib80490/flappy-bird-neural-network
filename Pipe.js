class Pipe{
	
	constructor(){
	
		this.w = 15;
		this.x = width + this.w; //off the screen to the right
		this.gap = random(height/4)+75; //At least 10 pixels wide
		this.ty = random(height/4);
		this.by = this.ty + this.gap;
		this.speed = 2;
		this.isOffScreen = false;		
	}
	
	update(bird){
	
		this.x -= this.speed;
		if(this.x < -this.w){
			this.isOffScreen = true;
		}
	}
	
	show(){
		fill(255);
		stroke(255);
		rect(this.x,0, this.w, this.ty);
		rect(this.x, this.by, this.w, height - this.by);
		
	}
	
}