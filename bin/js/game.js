var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import {Bonus} from './Bonus'
var JuegoCostanera;
(function (JuegoCostanera) {
    var Basurero = (function (_super) {
        __extends(Basurero, _super);
        function Basurero() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Basurero;
    }(JuegoCostanera.Bonus));
    JuegoCostanera.Basurero = Basurero;
})(JuegoCostanera || (JuegoCostanera = {}));
// /// <reference path="../tsDefinitions/phaser.d.ts" />
var JuegoCostanera;
(function (JuegoCostanera) {
    var Bonus = (function (_super) {
        __extends(Bonus, _super);
        function Bonus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bonus;
    }(Phaser.Sprite));
    JuegoCostanera.Bonus = Bonus;
})(JuegoCostanera || (JuegoCostanera = {}));
// /// <reference path="../tsDefinitions/phaser.d.ts" />
var JuegoCostanera;
(function (JuegoCostanera) {
    var Personaje = (function (_super) {
        __extends(Personaje, _super);
        function Personaje() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Personaje.prototype.getPuntos = function () {
            return this.puntos;
        };
        Personaje.prototype.setPuntos = function (value) {
            this.puntos = value;
        };
        return Personaje;
    }(Phaser.Sprite));
    JuegoCostanera.Personaje = Personaje;
})(JuegoCostanera || (JuegoCostanera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./Personaje.ts" />
/// <reference path="./Basurero.ts" />
/// <reference path="./Bonus.ts" />
var JuegoCostanera;
(function (JuegoCostanera) {
    var Costanera = (function () {
        function Costanera(ancho, alto) {
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
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
                getPersonajeSprite: this.getPersonajeSprite,
                setBasurero: this.setBasurero,
                getBasurero: this.getBasurero,
                setBonus: this.setBonus,
                getBonus: this.getBonus,
                setCursores: this.setCursores,
                getCursores: this.getCursores,
                setSaltarBtn: this.setSaltarBtn,
                getSaltarBtn: this.getSaltarBtn,
                getFacing: this.getFacing,
                setFacing: this.setFacing,
                getEmitter: this.getEmitter,
                setEmitter: this.setEmitter,
                collisionHandler: this.collisionHandler,
                listener: this.listener,
                getTextoPuntos: this.getTextoPuntos,
                setTextoPuntos: this.setTextoPuntos
            }));
        }
        //--------------------setters y getters --------------------------------------
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
        Costanera.prototype.getPersonajeSprite = function () {
            return this.personaje;
        };
        Costanera.prototype.setBasurero = function (value) {
            this.basurero = value;
        };
        Costanera.prototype.getBasurero = function () {
            return this.basurero;
        };
        Costanera.prototype.setBonus = function (value) {
            this.bonus = value;
        };
        Costanera.prototype.getBonus = function () {
            return this.bonus;
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
        Costanera.prototype.setFacing = function (facing) {
            this.facing = facing;
        };
        Costanera.prototype.getFacing = function () {
            return this.facing;
        };
        Costanera.prototype.setEmitter = function (value) {
            this.emitter = value;
        };
        Costanera.prototype.getEmitter = function () {
            return this.emitter;
        };
        Costanera.prototype.getTextoPuntos = function () {
            return this.textoPuntos;
        };
        Costanera.prototype.setTextoPuntos = function (value) {
            this.textoPuntos = value;
        };
        Costanera.prototype.preload = function () {
            // add our logo image to the assets class under the
            // key 'logo'. We're also setting the background colour
            // so it's the same as the background colour in the image
            this.getGame().load.image('basurero', 'assets/basurero.png');
            this.getGame().load.image('bonus', 'assets/hamburguesa.png');
            this.getGame().load.spritesheet('player', 'sprites/dude.png', 32, 48);
            this.getGame().load.image('costanera', "assets/costanera.jpg");
            //Agregamos un comentario para probar subir cambios a GIT desde el editor
            //hacemos un cambio en el archivo
        };
        Costanera.prototype.create = function () {
            // add the 'logo' sprite to the game, position it in the
            // center of the screen, and set the anchor to the center of
            // the image so it's centered properly. There's a lot of
            // centering in that last sentence
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
            this.getGame().add.sprite(this.getGame().world.centerX, this.getGame().world.top, 'player');
            personaje.height = 200;
            personaje.width = 100;
            this.setPersonaje(personaje);
            this.getGame().physics.enable(this.getPersonajeSprite(), Phaser.Physics.ARCADE);
            //Personaje
            this.getPersonajeSprite().body.collideWorldBounds = true;
            this.getPersonajeSprite().body.gravity.y = 500;
            this.getPersonajeSprite().body.setSize(20, 32, 5, 16);
            this.getPersonajeSprite().animations.add('left', [0, 1, 2, 3], 10, true);
            this.getPersonajeSprite().animations.add('turn', [4], 20, true);
            this.getPersonajeSprite().animations.add('right', [5, 6, 7, 8], 10, true);
            this.setFacing('left');
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
            this.getEmitter().makeParticles('basurero', null, 1, true);
            // emitter.minParticleScale = 0.1;
            // emitter.maxParticleScale = 0.5;
            this.getEmitter().setYSpeed(100, 200);
            this.getEmitter().setXSpeed(-5, 5);
            this.getEmitter().start(false, 1600, 1, 0);
            //emitter bonus
            var emitterBonus = this.getGame().add.emitter(this.getGame().world.width, this.getGame().world.bottom - 100, 5);
            this.setEmitter(emitterBonus);
            // this.getEmitter().width = this.getGame().world.width;
            this.getEmitter().makeParticles('bonus', null, 1, true);
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
            this.getGame().add.text(this.getGame().world.width - 120, 10, 'Vidas : ' /*this.getPersonaje().getVidas()*/, { font: '34px Arial', fill: '#fff' });
        };
        Costanera.prototype.update = function () {
            // this.game.physics.arcade.collide(this.player, platforms);
            //this.getGame().physics.arcade.collide(this.getBasurero(), this.getPersonaje(), this.collisionHandler, null, this);
            this.getGame().physics.arcade.collide(this.getEmitter(), this.getPersonajeSprite(), this.collisionHandler, null, this);
            this.getPersonajeSprite().body.velocity.x = 0;
            if (this.getCursores().left.isDown) {
                this.getPersonajeSprite().body.velocity.x = -500;
                if (this.getFacing() != 'left') {
                    this.getPersonajeSprite().animations.play('left');
                    this.setFacing('left');
                }
            }
            else if (this.getCursores().right.isDown) {
                this.getPersonajeSprite().body.velocity.x = 500;
                if (this.getFacing() != 'right') {
                    this.getPersonajeSprite().animations.play('right');
                    this.setFacing('right');
                }
            }
            else {
                if (this.getFacing() != 'idle') {
                    this.getPersonajeSprite().animations.stop();
                    if (this.getFacing() == 'left') {
                        this.getPersonajeSprite().frame = 0;
                    }
                    else {
                        this.getPersonajeSprite().frame = 5;
                    }
                    this.setFacing('idle');
                }
            }
            if (this.getSaltarBtn().isDown && (this.getPersonajeSprite().body.onFloor())) {
                this.getPersonajeSprite().body.velocity.y = -600;
            }
        };
        Costanera.prototype.collisionHandler = function (objetos, personaje) {
            // this.getGame().stage.backgroundColor = '#992d2d';
            // this.getPersonaje().body.velocity.y = -800;
            // objetos.kill();
            personaje.kill();
            //  Increase the score
            this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 20);
            this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();
        };
        Costanera.prototype.listener = function () {
            this.getPersonajeSprite().revive();
        };
        return Costanera;
    }());
    JuegoCostanera.Costanera = Costanera;
    // when the page has finished loading, create our game
    window.onload = function () {
        var game = new Costanera(window.innerWidth, window.innerHeight);
    };
})(JuegoCostanera || (JuegoCostanera = {}));
