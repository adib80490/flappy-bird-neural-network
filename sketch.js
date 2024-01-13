
let TOTAL_POP = 500;
let activeBirds = [];
let allBirds = [];
let counter = 0;
let highScore = 0;
let cycles = 1;

let pipes;

let downloadBirdBtn;
let loadBirdBtn;

function setup() {
	createCanvas(600,400);
	
	for(let i = 0; i < TOTAL_POP; i++){
		let b = new Bird();
		activeBirds.push(b);
		allBirds.push(b);
	}
	
	bird = new Bird();
	pipes = [];
	
	pipes.push(new Pipe());
	
	downloadBirdBtn = createButton("Download");
	loadBirdBtn = createButton("Load");
	resetBtn = createButton("Reset");
	
	downloadBirdBtn.mousePressed(downloadBird);
	loadBirdBtn.mousePressed(loadBird);
	resetBtn.mousePressed(resetAll);
	
	
}

function draw() {
	
	background(0);
	
	for(let c = 0; c < cycles; c++){
		
		if(counter % 80 == 0){
			pipes.push(new Pipe());
		}
		
		for(let i = activeBirds.length-1; i>= 0; i--){
			let bird = activeBirds[i];
			bird.think(pipes);
			bird.update();
			
			for(let pipe of pipes){
				if(pipe.x < bird.x+bird.r && pipe.x > bird.x-bird.r && (pipe.ty > bird.y || pipe.by < bird.y)){
					activeBirds.splice(i, 1);
					break;
				}
			}
			bird.show();
			
		}
		
		
		for(let pipe of pipes){
			pipe.update();
			pipe.show();
		}
		
		
		for(let i = pipes.length-1; i >= 0;  i--){
			if(pipes[i].isOffScreen){
				pipes.splice(i, 1);
			}
		}
		
		if (activeBirds.length == 0) {
			nextGeneration();
		}
		
		counter++;
	}
}

function downloadBird(){
	saveJSON(activeBirds[0].brain, 'bird.json');
}

function loadBird(){
	loadJSON('bird.json', gotFile);
}

function gotFile(data){
	
	let birdBrain = NeuralNetwork.deserialize(data);
	let bird = new Bird(birdBrain);
	resetGame();
	console.log("reset Game");
	activeBirds = [];
	activeBirds.push(bird);
}

function resetAll(){
	resetGame();
	for(let i = 0; i < TOTAL_POP; i++){
		let b = new Bird();
		activeBirds.push(b);
		allBirds.push(b);
	}
	
}