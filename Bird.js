class Bird{
	
	
	constructor(brain){
		this.x = 20;
		this.r = 10;
		this.y = height/2;
		this.vel = 0;
		this.acc = 0;
		this.score = 0;
		this.fitness = 0;
		
		if (brain instanceof NeuralNetwork) {
			this.brain = brain.copy();
			}else{
			this.brain = new NeuralNetwork(5, 8, 2);
		}
		
	}
	
	copy() {
		return new Bird(this.brain);
	}
	
	update(){
		
		this.score++;
		
		this.y += this.vel;
		this.vel += this.acc;
		
		this.acc =0.3;
		
		this.y = constrain(this.y, this.r, height-this.r);
		
	}
	
	show(){
		stroke(255);
		fill(255,100);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
	
	think(pipes){
		
		let closest = null;
		let record = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let diff = pipes[i].x - this.x;
			if (diff > 0 && diff < record) {
				record = diff;
				closest = pipes[i];
			}
		}
		
		if (closest != null) {
			// Now create the inputs to the neural network
			let inputs = [];
			// x position of closest pipe
			inputs[0] = map(closest.x, this.x, width, 0, 1);
			// top of closest pipe opening
			inputs[1] = map(closest.ty, 0, height, 0, 1);
			// bottom of closest pipe opening
			inputs[2] = map(closest.by, 0, height, 0, 1);
			// bird's y position
			inputs[3] = map(this.y, 0, height, 0, 1);
			// bird's y velocity
			inputs[4] = map(this.vel, -5, 5, 0, 1);
			
			// Get the outputs from the network
			let action = this.brain.predict(inputs);
			// Decide to jump or not!
			if (action[1] > action[0]) {
				this.up();
			}
		}
		
	}
	
	
	up(){
		this.vel -= 6.0;
	}
}