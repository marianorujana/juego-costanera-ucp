/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./Personaje.ts" />
/// <reference path="./Basurero.ts" />
/// <reference path="./Hamburguesa.ts" />
/// <reference path="./Bonus.ts" />
var JuegoCostanera;
(function (JuegoCostanera) {
    var Costanera = (function () {
        function Costanera(ancho, alto) {
            this.setGame(new Phaser.Game(ancho, alto, Phaser.CANVAS, 'content', {
                preload: this.preload,
                create: this.create,
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
                getTextoPuntos: this.getTextoPuntos,
                setTextoPuntos: this.setTextoPuntos,
                getTextoVidas: this.getTextoVidas,
                setTextoVidas: this.setTextoVidas
            }));
        }
        //--	------------------setters y getters --------------------------------------
        Costanera.prototype.setGame = function (game) {
            this.game = game;
        };
        Costanera.prototype.getGame = function () {
            return this.game;
        };
        Costanera.prototype.setAncho = function (ancho) {
            this.ancho = ancho;
        };
        Costanera.prototype.getAncho = function () {
            return this.ancho;
        };
        Costanera.prototype.setAlto = function (alto) {
            this.alto = alto;
        };
        Costanera.prototype.getAlto = function () {
            return this.alto;
        };
        Costanera.prototype.setPersonaje = function (personaje) {
            this.personaje = personaje;
        };
        Costanera.prototype.getPersonaje = function () {
            return this.personaje;
        };
        Costanera.prototype.setBasurero = function (value) {
            this.basurero = value;
        };
        Costanera.prototype.getBasurero = function () {
            return this.basurero;
        };
        Costanera.prototype.setHamburguesa = function (value) {
            this.hamburguesa = value;
        };
        Costanera.prototype.getHamburguesa = function () {
            return this.hamburguesa;
        };
        Costanera.prototype.setCursores = function (cursores) {
            this.cursores = cursores;
        };
        Costanera.prototype.getCursores = function () {
            return this.cursores;
        };
        Costanera.prototype.setSaltarBtn = function (saltarBtn) {
            this.saltarBtn = saltarBtn;
        };
        Costanera.prototype.getSaltarBtn = function () {
            return this.saltarBtn;
        };
        Costanera.prototype.getTextoPuntos = function () {
            return this.textoPuntos;
        };
        Costanera.prototype.setTextoPuntos = function (value) {
            this.textoPuntos = value;
        };
        Costanera.prototype.getTextoVidas = function () {
            return this.textoVidas;
        };
        Costanera.prototype.setTextoVidas = function (value) {
            this.textoVidas = value;
        };
        Costanera.prototype.preload = function () {
            // add our logo image to the assets class under the
            // key 'logo'. We're also setting the background colour
            // so it's the same as the background colour in the image
            this.getGame().load.image('basurero', 'assets/basurero.png');
            this.getGame().load.image('bonus', 'assets/hamburguesa.png');
            this.getGame().load.spritesheet('player', 'sprites/dude.png', 32, 48);
            this.getGame().load.image('costanera', "assets/costanera.jpg");
        };
        Costanera.prototype.create = function () {
            //Seteamos la imagen del juego en la posicion '0,0'
            //y el ancho y alto de la misma según el tamaño de la ventana actual
            var logo = this.getGame().add.sprite(this.getGame().world.centerX, this.getGame().world.centerY, 'costanera');
            logo.x = 0;
            logo.y = 0;
            logo.height = this.getGame().height;
            logo.width = this.getGame().width;
            this.getGame().physics.startSystem(Phaser.Physics.ARCADE);
            this.getGame().time.desiredFps = 30;
            this.getGame().physics.arcade.gravity.y = 250;
            //Personaje
            var personaje = new JuegoCostanera.Personaje(this.getGame(), this.getGame().world.centerX, this.getGame().world.top, 'player');
            this.setPersonaje(personaje);
            //Basurero
            var basurero = new JuegoCostanera.Basurero(this.getGame(), 300, 50, 'basurero');
            this.setBasurero(basurero);
            this.getGame().physics.enable(this.getBasurero(), Phaser.Physics.ARCADE);
            //Hamburguesa
            var hamburguesa = new JuegoCostanera.Hamburguesa(this.getGame(), 300, 50, 'bonus');
            this.setHamburguesa(hamburguesa);
            hamburguesa.name = 'bonus';
            this.getGame().physics.enable(hamburguesa, Phaser.Physics.ARCADE);
            //Click event
            logo.inputEnabled = true;
            logo.events.onInputDown.add(this.listener, this);
            this.setCursores(this.getGame().input.keyboard.createCursorKeys());
            this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));
            //emitter Basurero
            // var emitter = this.getGame().add.emitter(this.getGame().world.centerX, 5, 5);
            // this.setEmitterBasurero(emitter);
            // this.getEmitterBasurero().width = this.getGame().world.width;
            // this.getEmitterBasurero().makeParticles('basurero',null,1,true);
            // this.getEmitterBasurero().setYSpeed(100, 200);
            // this.getEmitterBasurero().setXSpeed(-5, 5);
            // this.getEmitterBasurero().start(false, 1600, 1, 0);
            // //emitter bonus
            // var emitterBonus = this.getGame().add.emitter(this.getGame().world.width,this.getGame().world.bottom - 100, 5);
            // this.setEmitterBonus(emitterBonus);
            // this.getEmitterBonus().makeParticles('bonus',null,1,true);
            // this.getEmitterBonus().setYSpeed(-100, 0);
            // this.getEmitterBonus().setXSpeed(-1000, -500);
            // this.getEmitterBonus().gravity.y = -100;
            // this.getEmitterBonus().start(false, 1600, 1, 0);
            //  Puntos
            var scoreString = 'Puntos: ';
            var scoreText = this.getGame().add.text(10, 10, scoreString + this.getPersonaje().getPuntos(), { font: '34px Arial', fill: '#fff' });
            this.setTextoPuntos(scoreText);
            //  Vidas
            var vidasString = 'Vidas: ';
            var vidasText = this.getGame().add.text(this.getGame().world.width - 140, 10, vidasString + this.getPersonaje().getVidas(), { font: '34px Arial', fill: '#fff' });
            this.setTextoVidas(vidasText);
        };
        Costanera.prototype.update = function () {
            this.getGame().physics.arcade.collide(this.getBasurero().getEmitterBasureros(), this.getPersonaje(), this.collisionBasurero, null, this);
            this.getGame().physics.arcade.collide(this.getHamburguesa().getEmitterHamburguesas(), this.getPersonaje(), this.collisionHamburguesa, null, this);
            this.getPersonaje().body.velocity.x = 0;
            if (this.getCursores().left.isDown) {
                this.getPersonaje().body.velocity.x = -500;
                if (this.getPersonaje().getOrientacion() != 'left') {
                    this.getPersonaje().animations.play('left');
                    this.getPersonaje().setOrientacion('left');
                }
            }
            else if (this.getCursores().right.isDown) {
                this.getPersonaje().body.velocity.x = 500;
                if (this.getPersonaje().getOrientacion() != 'right') {
                    this.getPersonaje().animations.play('right');
                    this.getPersonaje().setOrientacion('right');
                }
            }
            else {
                if (this.getPersonaje().getOrientacion() != 'idle') {
                    this.getPersonaje().animations.stop();
                    if (this.getPersonaje().getOrientacion() == 'left') {
                        this.getPersonaje().frame = 0;
                    }
                    else {
                        this.getPersonaje().frame = 5;
                    }
                    this.getPersonaje().setOrientacion('idle');
                }
            }
            if (this.getSaltarBtn().isDown && (this.getPersonaje().body.onFloor())) {
                this.getPersonaje().body.velocity.y = -600;
            }
        };
        Costanera.prototype.collisionBasurero = function (basureros, personaje) {
            basureros.kill();
            personaje.kill();
            //  Reduce the lives
            this.getPersonaje().setVidas(this.getPersonaje().getVidas() - 1);
            this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();
        };
        Costanera.prototype.collisionHamburguesa = function (hamburguesas, personaje) {
            personaje.kill();
            //  Increase the score
            this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 20);
            this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();
        };
        Costanera.prototype.listener = function () {
            this.getPersonaje().revive();
        };
        return Costanera;
    }());
    JuegoCostanera.Costanera = Costanera;
    // when the page has finished loading, create our game
    window.onload = function () {
        var game = new Costanera(window.innerWidth, window.innerHeight);
    };
})(JuegoCostanera || (JuegoCostanera = {}));
