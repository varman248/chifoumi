class 
	function player (score=0, coup=-1, name='noname') {
			this.score = score;
			this.coup = coup;
			this.name = name;
	}

class Chifoumi {
	
	constructor(result=0, arme=-1, round=0) {
		this.result = result;
		this.arme = arme;
		this.round = round;
		this.j1.prototype = new this.player();
		this.j2.prototype = new this.player();
	}
	
	play(a, b) {
		this.round++;
		this.j1.coup = a, this.j2.coup = b;

		if (a === b) {
			this.result = -1; this.arme = -1;
		}
		else if ((a===0 && b===2)||(a===1 && b===0)||(a===2 && b===1)) {
			this.result = true; this.arme = a; this.j1.score++;
		}
		else {
			this.result = false; this.arme = b; this.j2.score++;
		}
		
		console.log( [this.round] );
		console.log( [this.result, this.j1.score, this.j2.score] );
		
		
	}
}

var test = new Chifoumi();

for (var i=0; i<10; i++) {
	test.play(0, Math.round(Math.random()*2));
}


