
/* CHIFOUMI MAIN PROGRAM */


function player(name) {
	this.name = name;
	this.score = 0;
	this.coup;
}


class Chifoumi {
	
	constructor(name1, name2) {
		this.j1 = new player(name1);
		this.j2 = new player(name2);
		this.result = 0;
		this.round = 0;
	}
	
	reset(name1, name2) {
		this.j1 = new player(name1);
		this.j2 = new player(name2);
		this.result = 0;
		this.round = 0;
	}
	
	compare(a, b) {
		this.j1.coup = a; this.j2.coup = b;
		if (a === b) {
			this.result = -1;
		}
		else if ((a===0 && b===2)||(a===1 && b===0)||(a===2 && b===1)) {
			this.result = true; this.j1.score++;
		}
		else {
			this.result = false; this.j2.score++;
		}
	}
	
	play(a, b) {
		this.compare(a, b);
		
		if (this.result != -1) {
			this.round++;
		}
	}
}

/* -------------------- Display -----------------------*/ 

class Display {
	
	constructor() {
		this.bColor1; this.bColor2; this.img1; this.img2;
	}
	
	add(result, coup1, coup2) {
		var buttons = ['pierre', 'feuille', 'ciseaux'];
		var texts = ['---', 'match nul !', 'gagné !', 'perdu !', ];
		var colors = ['#23a7b9', 'grey', 'lime', 'red'];
		if (result === 0)
			[this.text, this.bColor1, this.bColor2, this.img1, this.img2] = [texts[0], colors[0], colors[0], 'neutre', 'neutre'];
		else if (result === -1) 
			[this.text, this.bColor1, this.bColor2, this.img1, this.img2] = [texts[1], colors[1], colors[1], buttons[coup1], buttons[coup2]];
		else if (result === true)
			[this.text, this.bColor1, this.bColor2, this.img1, this.img2] = [texts[2], colors[2], colors[3], buttons[coup1], buttons[coup2]];
		else if (result === false)
			[this.text, this.bColor1, this.bColor2, this.img1, this.img2] = [texts[3], colors[3], colors[2], buttons[coup1], buttons[coup2]];
	}
		
	overlay(timeout) {
		var lay = $('#overlay').fadeIn();
		setTimeout(()=> lay.fadeOut(), timeout);
	}
	
	buttonsFreeze(timeout){
		var btn = $('.arme').toggleClass('freeze');
		setTimeout(()=> btn.toggleClass('freeze') , timeout);
	}
	
	apply(obj) {
		// ADD INFO
		this.add(obj.result, obj.j1.coup, obj.j2.coup);
		// SCORE
		$('#score_j1').text(obj.j1.score);
		$('#score_j2').text(obj.j2.score);
		// IMAGE AND IMAGE BORDER COLOR
		$('#img_j1').attr('src', 'img/'+this.img1+'.jpg').css('border-color', this.bColor1); 
		$('#img_j2').attr('src', 'img/'+this.img2+'.jpg').css('border-color', this.bColor2); 
		// RESULT
		$('#result').text(this.text);
		// ROUND
		var round = obj.round;
		if (obj.round === 0) { round = 1; }
		$('#round').text('Round: '+round+' / 3');
	}
}

/* -------------------- EVENT LISTENER -----------------------*/ 

function mouse(){
	var coups = {'pierre':0, 'feuille':1, 'ciseaux':2};
	playGame(coups[this.id]);
}

function keyboard(event) {
	let key = String(event.key).toLowerCase(), arme;
	if (key === 'v') { arme = 0; }
	else if (key === 'b') {arme = 1; }
	else if (key === 'n') { arme = 2; }
	if(isNaN(arme)===false) { playGame(arme); }
}


function eventListener(bool){
	if(bool){
		$('.arme').on('click', mouse);
		$(window).on("keydown", keyboard);
	}
	else {
		$('.arme').off('click', mouse);
		$(window).off("keydown", keyboard);
	}
}

/* -------------------- Main -----------------------*/ 

function playGame(coup) {
	eventListener(false);
	D.buttonsFreeze(500);
	setTimeout(function(){ 
		let ai = Math.round(Math.random()*2);
		C.play(coup, ai);
		D.apply(C);
		console.log('round = ' + C.round);
		if (C.round === 3) { 
			// THE WINNER
			var winner = $('#overlay div span').text('PERDU !');
			var emoji = $("#emoji").attr("src", "img/wink.svg")
			if (C.j1.score > C.j2.score) { 
				winner.text('GAGNÉ !'); 
				emoji.attr("src", "img/angry.svg")
			}
			// DISPLAY
			D.buttonsFreeze(2800);
			setTimeout(()=>{ D.overlay(1500); }, 1000);
			setTimeout(()=>{ C.reset(); D.apply(C); }, 2800);
			setTimeout(()=>{ eventListener(true); }, 2900);
		}
		else {
			eventListener(true);
		}
	}, 500); 
}


var C = new Chifoumi();
var D = new Display();

eventListener(true);




