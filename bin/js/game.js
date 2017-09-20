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
/// <reference path="../tsDefinitions/phaser.d.ts" />
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
            setObstaculo: this.setObstaculo,
            getObstaculo: this.getObstaculo,
            setCursores: this.setCursores,
            getCursores: this.getCursores,
            setSaltarBtn: this.setSaltarBtn,
            getSaltarBtn: this.getSaltarBtn,
            getFacing: this.getFacing,
            setFacing: this.setFacing,
            getEmitter: this.getEmitter,
            setEmitter: this.setEmitter,
            collisionHandler: this.collisionHandler,
            listener: this.listener
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
    Costanera.prototype.setObstaculo = function (value) {
        this.obstaculo = value;
    };
    Costanera.prototype.getObstaculo = function () {
        return this.obstaculo;
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
    Costanera.prototype.preload = function () {
        // add our logo image to the assets class under the
        // key 'logo'. We're also setting the background colour
        // so it's the same as the background colour in the image
        this.getGame().load.image('obstaculo', 'assets/obstaculo.png');
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
        var personaje = this.getGame().add.sprite(100, 200, 'player');
        personaje.height = 200;
        personaje.width = 100;
        this.setPersonaje(personaje);
        this.getGame().physics.enable(this.getPersonaje(), Phaser.Physics.ARCADE);
        //Personaje
        this.getPersonaje().body.collideWorldBounds = true;
        this.getPersonaje().body.gravity.y = 500;
        this.getPersonaje().body.setSize(20, 32, 5, 16);
        this.getPersonaje().animations.add('left', [0, 1, 2, 3], 10, true);
        this.getPersonaje().animations.add('turn', [4], 20, true);
        this.getPersonaje().animations.add('right', [5, 6, 7, 8], 10, true);
        this.setFacing('left');
        //obstaculo
        var obstaculo = this.getGame().add.sprite(300, 50, 'obstaculo');
        this.setObstaculo(obstaculo);
        obstaculo.name = 'obstaculo';
        this.getGame().physics.enable(obstaculo, Phaser.Physics.ARCADE);
        logo.inputEnabled = true;
        logo.events.onInputDown.add(this.listener, this);
        //this.getObstaculo().body.velocity.y = 10;
        //  This adjusts the collision body size.
        //  220x10 is the new width/height.
        //  See the offset bounding box for another example.
        this.getObstaculo().body.setSize(10, 10, 0, 0);
        this.setCursores(this.getGame().input.keyboard.createCursorKeys());
        this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));
        //emitter
        var emitter = this.getGame().add.emitter(this.getGame().world.centerX, 5, 5);
        this.setEmitter(emitter);
        this.getEmitter().width = this.getGame().world.width;
        this.getEmitter().makeParticles('obstaculo', null, 1, true);
        // emitter.minParticleScale = 0.1;
        // emitter.maxParticleScale = 0.5;
        this.getEmitter().setYSpeed(100, 200);
        this.getEmitter().setXSpeed(-5, 5);
        this.getEmitter().start(false, 1600, 1, 0);
    };
    Costanera.prototype.update = function () {
        // this.game.physics.arcade.collide(this.player, platforms);
        //this.getGame().physics.arcade.collide(this.getObstaculo(), this.getPersonaje(), this.collisionHandler, null, this);
        this.getGame().physics.arcade.collide(this.getEmitter(), this.getPersonaje(), this.collisionHandler, null, this);
        this.getPersonaje().body.velocity.x = 0;
        if (this.getCursores().left.isDown) {
            this.getPersonaje().body.velocity.x = -500;
            if (this.getFacing() != 'left') {
                this.getPersonaje().animations.play('left');
                this.setFacing('left');
            }
        }
        else if (this.getCursores().right.isDown) {
            this.getPersonaje().body.velocity.x = 500;
            if (this.getFacing() != 'right') {
                this.getPersonaje().animations.play('right');
                this.setFacing('right');
            }
        }
        else {
            if (this.getFacing() != 'idle') {
                this.getPersonaje().animations.stop();
                if (this.getFacing() == 'left') {
                    this.getPersonaje().frame = 0;
                }
                else {
                    this.getPersonaje().frame = 5;
                }
                this.setFacing('idle');
            }
        }
        if (this.getSaltarBtn().isDown && (this.getPersonaje().body.onFloor())) {
            this.getPersonaje().body.velocity.y = -800;
        }
    };
    Costanera.prototype.collisionHandler = function (objetos, personaje) {
        // this.getGame().stage.backgroundColor = '#992d2d';
        // this.getPersonaje().body.velocity.y = -800;
        objetos.kill();
        personaje.kill();
        personaje.revive();
    };
    Costanera.prototype.listener = function () {
        this.getPersonaje().revive();
    };
    return Costanera;
}());
// when the page has finished loading, create our game
window.onload = function () {
    var game = new Costanera(window.innerWidth, window.innerHeight);
};
/// <reference path="../tsDefinitions/phaser.d.ts" />
var Personaje = (function (_super) {
    __extends(Personaje, _super);
    function Personaje() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Personaje;
}(Phaser.Sprite));
