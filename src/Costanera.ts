/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./Personaje.ts" />
/// <reference path="./Basurero.ts" />
/// <reference path="./Bonus.ts" />

module JuegoCostanera {
	export class Costanera{
	game:Phaser.Game;
	ancho: number;
	alto:number;
	personaje: Personaje;
	basurero: Basurero;
	bonus: Phaser.Sprite;
	cursores:Phaser.CursorKeys;
	saltarBtn:Phaser.Key;
	emitter: Phaser.Particles.Arcade.Emitter;
	puntos:number;
	textoPuntos: Phaser.Text;

//--------------------setters y getters --------------------------------------
	setGame(game: Phaser.Game ){
		this.game = game;
	}

	getGame (){
		return this.game;
	}

	setAncho(ancho: number ){
		this.ancho = ancho;
	}

	getAncho (){
		return this.ancho;
	}

	setAlto(alto: number ){
		this.alto = alto;
	}

	getAlto (){
		return this.alto;
	}

	setPersonaje(personaje: Personaje ){
		this.personaje = personaje;
	}

	getPersonaje ():Personaje{
		return this.personaje;
	}

	setBasurero(value:Basurero){
		this.basurero = value;
	}

	getBasurero ():Basurero{
		return this.basurero;
	}

	setBonus(value: Phaser.Sprite){
		this.bonus = value;
	}

	getBonus (){
		return this.bonus;
	}

	setCursores(cursores: Phaser.CursorKeys ){
		this.cursores = cursores;
	}

	getCursores (){
		return this.cursores;
	}

	setSaltarBtn(saltarBtn: Phaser.Key ){
		this.saltarBtn = saltarBtn;
	}

	getSaltarBtn (){
		return this.saltarBtn;
	}

	setEmitter(value: Phaser.Particles.Arcade.Emitter){
		this.emitter = value
	}

	getEmitter(){
		return this.emitter;
	}

	getTextoPuntos(){
		return this.textoPuntos;
	}

	setTextoPuntos(value:Phaser.Text){
		this.textoPuntos = value;
	}

	constructor(ancho: number,alto:number)
	{
		this.setGame(new Phaser.Game( ancho, alto, Phaser.CANVAS, 'content', { 
			preload:this.preload, 
			create:this.create, 
			update: this.update,
			setGame: this.setGame,
			getGame: this.getGame,
			setAncho: this.setAncho,
			getAncho: this.getAncho,
			setAlto: this.setAlto,
			getAlto: this.getAlto,
			setPersonaje: this.setPersonaje,
			getPersonaje: this.getPersonaje,
			setBasurero: this.setBasurero,
			getBasurero: this.getBasurero,
			setBonus: this.setBonus,
			getBonus: this.getBonus,
			setCursores: this.setCursores,
			getCursores: this.getCursores,
			setSaltarBtn: this.setSaltarBtn,
			getSaltarBtn: this.getSaltarBtn,
			getEmitter: this.getEmitter,
			setEmitter: this.setEmitter,
			collisionHandler: this.collisionHandler,
			listener: this.listener,
			getTextoPuntos: this.getTextoPuntos,
			setTextoPuntos: this.setTextoPuntos
		} ));
	}
	
	preload()
	{ 
		// add our logo image to the assets class under the
		// key 'logo'. We're also setting the background colour
		// so it's the same as the background colour in the image
		this.getGame().load.image('basurero', 'assets/basurero.png');
		this.getGame().load.image('bonus', 'assets/hamburguesa.png');
		this.getGame().load.spritesheet('player', 'sprites/dude.png', 32, 48);
		this.getGame().load.image( 'costanera', "assets/costanera.jpg" );
	}
	
	create()
	{
		//Seteamos la imagen del juego en la posicion '0,0'
	    //y el ancho y alto de la misma según el tamaño de la ventana actual
		var logo = this.getGame().add.sprite( this.getGame().world.centerX, this.getGame().world.centerY, 'costanera' );
		logo.x = 0;
		logo.y = 0;
		logo.height = this.getGame().height;
		logo.width = this.getGame().width;

		this.getGame().physics.startSystem(Phaser.Physics.ARCADE);
		this.getGame().time.desiredFps = 30;
		this.getGame().physics.arcade.gravity.y = 250;

		//Personaje
		var personaje = new Personaje(this.getGame(),this.getGame().world.centerX, this.getGame().world.top, 'player');
		this.setPersonaje(personaje);
	
		//Basurero
		this.setBasurero(this.getGame().add.sprite(300, 50, 'basurero'));
		this.getBasurero().name = 'basurero';
	
		this.getGame().physics.enable(this.getBasurero(), Phaser.Physics.ARCADE);
		//  This adjusts the collision body size.
		//  220x10 is the new width/height.
		//  See the offset bounding box for another example.
		this.getBasurero().body.setSize(10, 10, 0, 0);

		//bonus
		var bonus = this.getGame().add.sprite(300, 50, 'bonus');
		this.setBonus(bonus);
		bonus.name = 'bonus';
	
		this.getGame().physics.enable(bonus, Phaser.Physics.ARCADE);
		//  This adjusts the collision body size.
		//  220x10 is the new width/height.
		//  See the offset bounding box for another example.
		this.getBonus().body.setSize(10, 10, 0, 0);
		
		//Click event
		logo.inputEnabled = true;
		logo.events.onInputDown.add(this.listener, this);
		//this.getBasurero().body.velocity.y = 10;
	
		
		
		this.setCursores(this.getGame().input.keyboard.createCursorKeys());
		this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));

		//emitter Basurero
		var emitter = this.getGame().add.emitter(this.getGame().world.centerX, 5, 5);
		this.setEmitter(emitter);
		this.getEmitter().width = this.getGame().world.width;

		this.getEmitter().makeParticles('basurero',null,1,true);
		// emitter.minParticleScale = 0.1;
		// emitter.maxParticleScale = 0.5;
	
		this.getEmitter().setYSpeed(100, 200);
		this.getEmitter().setXSpeed(-5, 5);
		
		this.getEmitter().start(false, 1600, 1, 0);

		//emitter bonus
		var emitterBonus = this.getGame().add.emitter(this.getGame().world.width,this.getGame().world.bottom - 100, 5);
		this.setEmitter(emitterBonus);
		// this.getEmitter().width = this.getGame().world.width;

		this.getEmitter().makeParticles('bonus',null,1,true);
		// emitter.minParticleScale = 0.1;
		// emitter.maxParticleScale = 0.5;
	
		this.getEmitter().setYSpeed(-100, 0);
		this.getEmitter().setXSpeed(-1000, -500);
		this.getEmitter().gravity.y = -100;
		
		this.getEmitter().start(false, 1600, 1, 0);
		
		//this.getEmitter().gravity(0,0);
		//this.getEmitter().setRotation(90, 0);


 //  The score
	var scoreString = 'Puntos : ';
	this.getPersonaje().setPuntos(0);
    var scoreText = this.getGame().add.text(10, 10, scoreString + this.getPersonaje().getPuntos(), { font: '34px Arial', fill: '#fff' });
		this.setTextoPuntos(scoreText);
    //  Lives
 	var lives = this.getGame().add.group();
	 this.getGame().add.text(this.getGame().world.width - 120, 10, 'Vidas : '/*this.getPersonaje().getVidas()*/, { font: '34px Arial', fill: '#fff' });


	}

	update () {
		
			// this.game.physics.arcade.collide(this.player, platforms);
			//this.getGame().physics.arcade.collide(this.getBasurero(), this.getPersonaje(), this.collisionHandler, null, this);
			this.getGame().physics.arcade.collide(this.getEmitter(),this.getPersonaje(),this.collisionHandler,null, this);
			this.getPersonaje().body.velocity.x = 0;
		
			if (this.getCursores().left.isDown)
			{
				this.getPersonaje().body.velocity.x = -500;
				if (this.getPersonaje().getOrientacion() != 'left'){
						this.getPersonaje().animations.play('left');
						this.getPersonaje().setOrientacion('left');
				}
			}
			else if (this.getCursores().right.isDown){
				this.getPersonaje().body.velocity.x = 500;
				if (this.getPersonaje().getOrientacion() != 'right'){
						this.getPersonaje().animations.play('right');
						this.getPersonaje().setOrientacion('right');
				}
			} else {
				if (this.getPersonaje().getOrientacion() != 'idle'){
						this.getPersonaje().animations.stop();
			
						if (this.getPersonaje().getOrientacion() == 'left'){
							this.getPersonaje().frame = 0;
						}
						else{
							this.getPersonaje().frame = 5;
						}
						this.getPersonaje().setOrientacion('idle')
				}
			}
		
			if (this.getSaltarBtn().isDown && (this.getPersonaje().body.onFloor()))
			{
				this.getPersonaje().body.velocity.y = -600;
			}
	}

	collisionHandler (objetos, personaje) {
		
			// this.getGame().stage.backgroundColor = '#992d2d';
			// this.getPersonaje().body.velocity.y = -800;
			// objetos.kill();
			 personaje.kill();
			//  Increase the score
			
			this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 20);
			this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();		
		}

		
		listener () {
			this.getPersonaje().revive()
		}

	
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Costanera(window.innerWidth,window.innerHeight);
}

}