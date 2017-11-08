/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./Personaje.ts" />
/// <reference path="./Basurero.ts" />
/// <reference path="./Hamburguesa.ts" />
/// <reference path="./Bonus.ts" />

module JuegoCostanera {
	export class Costanera{
		game:Phaser.Game;
		ancho: number;
		alto:number;
		personaje: Personaje;
		basurero: Basurero;
		hamburguesa: Hamburguesa;
		cursores:Phaser.CursorKeys;
		saltarBtn:Phaser.Key;
		textoVidas: Phaser.Text;
		textoPuntos: Phaser.Text;
		jump: boolean;
		left:boolean;
		right:boolean;

//--	------------------setters y getters --------------------------------------
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

		setJump(value: boolean ){
			this.jump = value;
		}

		getJump(){
			return this.jump;
		}

		setLeft(value: boolean ){
			this.left = value;
		}

		getLeft(){
			return this.left;
		}

		setRight(value: boolean ){
			this.right = value;
		}

		getRight(){
			return this.right;
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

		setHamburguesa(value: Hamburguesa){
			this.hamburguesa = value;
		}

		getHamburguesa (){
			return this.hamburguesa;
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

		getTextoPuntos(){
			return this.textoPuntos;
		}

		setTextoPuntos(value:Phaser.Text){
			this.textoPuntos = value;
		}

		getTextoVidas(){
			return this.textoVidas;
		}

		setTextoVidas(value:Phaser.Text){
			this.textoVidas = value;
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
				setHamburguesa: this.setHamburguesa,
				getHamburguesa: this.getHamburguesa,
				setCursores: this.setCursores,
				getCursores: this.getCursores,
				setSaltarBtn: this.setSaltarBtn,
				getSaltarBtn: this.getSaltarBtn,
				collisionBasurero: this.collisionBasurero,
				collisionHamburguesa: this.collisionHamburguesa,
				listener: this.listener,
				listenerJump: this.listenerJump,
				listenerLeft: this.listenerLeft,
				listenerRight: this.listenerRight,
				getTextoPuntos: this.getTextoPuntos,
				setTextoPuntos: this.setTextoPuntos,
				getTextoVidas: this.getTextoVidas,
				setTextoVidas: this.setTextoVidas,
				setJump: this.setJump,
				getJump: this.getJump,
				setLeft: this.setLeft,
				getLeft: this.getLeft,
				setRight: this.setRight,
				getRight: this.getRight,
				goFull:this.goFull
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

			//Botones
			this.getGame().load.spritesheet('buttonvertical', 'assets/button-vertical.png',64,64);
			this.getGame().load.spritesheet('buttonhorizontal', 'assets/button-horizontal.png',96,64);
			this.getGame().load.spritesheet('buttonjump', 'assets/button-round.png',96,96);
		}

		create()
		{
			//Seteamos la imagen del juego en la posicion '0,0'
			//y el ancho y alto de la misma según el tamaño de la ventana actual
			if (!this.getGame().device.desktop){ this.getGame().input.onDown.add(this.goFull, this); }

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
			var basurero = new Basurero(this.getGame(),300, 50, 'basurero');
			this.setBasurero(basurero);
			this.getGame().physics.enable(this.getBasurero(), Phaser.Physics.ARCADE);

			//Hamburguesa
			var hamburguesa = new Hamburguesa(this.getGame(),300, 50, 'bonus');
			this.setHamburguesa(hamburguesa);
			hamburguesa.name = 'bonus';
			this.getGame().physics.enable(hamburguesa, Phaser.Physics.ARCADE);

			//Click event
			logo.inputEnabled = true;
			logo.events.onInputDown.add(this.listener, this);
			this.setCursores(this.getGame().input.keyboard.createCursorKeys());
			this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));

 			//  Puntos
			var scoreString = 'Puntos: ';
    		var scoreText = this.getGame().add.text(10, 10, scoreString + this.getPersonaje().getPuntos(), { font: '34px Arial', fill: '#fff' });
			this.setTextoPuntos(scoreText);

			//  Vidas
			var vidasString = 'Vidas: ';
 			var vidasText = this.getGame().add.text(this.getGame().world.width - 140, 10, vidasString + this.getPersonaje().getVidas(), { font: '34px Arial', fill: '#fff' });
			this.setTextoVidas(vidasText); 

			// create our virtual game controller buttons 
			//Boton de salto
			var buttonjump = this.getGame().add.button(this.getGame().world.width - 140, this.getGame().world.height - 140, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
			buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
			buttonjump.events.onInputOver.add(this.listenerJump,this,0,true);
			buttonjump.events.onInputOut.add(this.listenerJump,this,0,false);
			buttonjump.events.onInputDown.add(this.listenerJump,this,0,true);
			buttonjump.events.onInputUp.add(this.listenerJump,this,0,false);
			
			//Boton izquierda
			var buttonleft = this.getGame().add.button(30, this.getGame().world.height	- 140, 'buttonhorizontal', null, this, 0, 1, 0, 1);
			buttonleft.fixedToCamera = true;
			buttonleft.events.onInputOver.add(this.listenerLeft,this,0,true);
			buttonleft.events.onInputOut.add(this.listenerLeft,this,0,false);
			buttonleft.events.onInputDown.add(this.listenerLeft,this,0,true);
			buttonleft.events.onInputUp.add(this.listenerLeft,this,0,false);
		
			//Boton derecha
			var buttonright = this.getGame().add.button(190, this.getGame().world.height - 140, 'buttonhorizontal', null, this, 0, 1, 0, 1);
			buttonright.fixedToCamera = true;
			buttonright.events.onInputOver.add(this.listenerRight,this,0,true);
			buttonright.events.onInputOut.add(this.listenerRight,this,0,false);
			buttonright.events.onInputDown.add(this.listenerRight,this,0,true);
			buttonright.events.onInputUp.add(this.listenerRight,this,0,false);

		
		}

		update () 
		{
			this.getGame().physics.arcade.collide(this.getBasurero().getEmitterBasureros(),this.getPersonaje(),this.collisionBasurero,null, this);
			this.getGame().physics.arcade.collide(this.getHamburguesa().getEmitterHamburguesas(),this.getPersonaje(),this.collisionHamburguesa,null, this);

			this.getPersonaje().body.velocity.x = 0;
			if (this.getCursores().left.isDown || this.getLeft())
			{
				this.getPersonaje().body.velocity.x = -500;
				if (this.getPersonaje().getOrientacion() != 'left'){
						this.getPersonaje().animations.play('left');
						this.getPersonaje().setOrientacion('left');
				}
			}
			else if (this.getCursores().right.isDown || this.getRight()){
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

			if ((this.getSaltarBtn().isDown || this.getJump()) && (this.getPersonaje().body.onFloor()))
			{
				this.getPersonaje().body.velocity.y = -600;
			}
			
			if (this.getGame().input.totalActivePointers == 0 && !this.getGame().input.activePointer.isMouse){ this.setRight(false); this.setLeft(false); this.setJump(false)} 
		}

		collisionBasurero (basureros, personaje) 
		{
			basureros.kill();
			personaje.kill();

			//  Reduce the lives
			this.getPersonaje().setVidas(this.getPersonaje().getVidas() - 1);
			this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();		
		}

		collisionHamburguesa (hamburguesas, personaje) 
		{
			personaje.kill();
			//  Increase the score
			this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 20);
			this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();		
		}

		//some useful functions
		goFull() { this.getGame().scale.startFullScreen(false);}

		listener () 
		{
			this.getPersonaje().revive()
		}

		listenerJump(key,arg,arg2){
			this.setJump(arg2);
		}

		listenerLeft(key,arg,arg2){
			this.setLeft(arg2);
		}

		listenerRight(key,arg,arg2){
			this.setRight(arg2);
		}

	}

	// when the page has finished loading, create our game
	window.onload = () => 
	{
		var game = new Costanera(window.innerWidth,window.innerHeight);
	}

}