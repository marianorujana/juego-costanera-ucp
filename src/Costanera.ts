/// <reference path="../tsDefinitions/phaser.d.ts" />

class Costanera
{
	game:Phaser.Game;
	ancho: number;
	alto:number;
	personaje: Phaser.Sprite;
	cursores:Phaser.CursorKeys;
	saltarBtn:Phaser.Key;
	facing: string;
	

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

	setPersonaje(personaje: Phaser.Sprite ){
		this.personaje = personaje;
	}

	getPersonaje (){
		return this.personaje;
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

	setFacing(facing: string){
		this.facing = facing;
	}

	getFacing(){
		return this.facing;
	}




	constructor(ancho: number,alto:number)
	{
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
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
			setCursores: this.setCursores,
			getCursores: this.getCursores,
			setSaltarBtn: this.setSaltarBtn,
			getSaltarBtn: this.getSaltarBtn,
			getFacing: this.getFacing,
			setFacing: this.setFacing
		} ));
	}
	
	preload()
	{
		// add our logo image to the assets class under the
		// key 'logo'. We're also setting the background colour
		// so it's the same as the background colour in the image
		// this.getGame().load.image('player', 'sprites/dude.png');
		this.getGame().load.spritesheet('player', 'sprites/dude.png', 32, 48);
		this.getGame().load.image( 'costanera', "assets/costanera.jpg" );
		
		//Agregamos un comentario para probar subir cambios a GIT desde el editor
		//hacemos un cambio en el archivo
		
	}
	
	create()
	{
		// add the 'logo' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence

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

		var personaje = this.getGame().add.sprite(100, 200, 'player');
		personaje.height = 200;
		personaje.width = 100;
		this.setPersonaje(personaje);
		
		this.getGame().physics.enable(this.getPersonaje(),Phaser.Physics.ARCADE);
				
		//Personaje
		this.getPersonaje().body.collideWorldBounds = true;
		this.getPersonaje().body.gravity.y = 500;
		this.getPersonaje().body.setSize(20, 32, 5, 16);
		this.getPersonaje().animations.add('left', [0, 1, 2, 3], 10, true);
		this.getPersonaje().animations.add('turn', [4], 20, true);
		this.getPersonaje().animations.add('right', [5, 6, 7, 8], 10, true);
		this.setFacing('left');
		
		this.setCursores(this.getGame().input.keyboard.createCursorKeys());
		this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));
	}

	update () {
		
			// this.game.physics.arcade.collide(this.player, platforms);
		
			this.getPersonaje().body.velocity.x = 0;
		
			if (this.getCursores().left.isDown)
			{
				this.getPersonaje().body.velocity.x = -250;
				if (this.getFacing() != 'left'){
						this.getPersonaje().animations.play('left');
						this.setFacing('left');
				}
			}
			else if (this.getCursores().right.isDown){
				this.getPersonaje().body.velocity.x = 250;
				if (this.getFacing() != 'right'){
						this.getPersonaje().animations.play('right');
						this.setFacing('right');
				}
			} else {
				if (this.getFacing() != 'idle'){
						this.getPersonaje().animations.stop();
			
						if (this.getFacing() == 'left'){
							this.getPersonaje().frame = 0;
						}
						else{
							this.getPersonaje().frame = 5;
						}
						this.setFacing('idle')
				}
			}
		
			if (this.getSaltarBtn().isDown && (this.getPersonaje().body.onFloor()))
			{
				this.getPersonaje().body.velocity.y = -800;
			}
	}

	
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Costanera(window.innerWidth,window.innerHeight);
}