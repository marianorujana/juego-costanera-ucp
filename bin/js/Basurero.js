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
        function Basurero(game, x, y, frame) {
            var _this = _super.call(this, game, x, y, frame) || this;
            var basurero = game.add.sprite(x, y, frame);
            _this.setBasurero(basurero);
            _this.getBasurero().name = frame;
            game.physics.enable(_this.getBasurero(), Phaser.Physics.ARCADE);
            //  This adjusts the collision body size.
            _this.getBasurero().body.setSize(10, 10, 0, 0);
            var emitter = game.add.emitter(game.world.centerX, game.world.top, 5);
            _this.setEmitterBasureros(emitter);
            _this.getEmitterBasureros().width = game.world.width;
            _this.getEmitterBasureros().makeParticles('basurero', null, 1, true);
            _this.getEmitterBasureros().setYSpeed(100, 500);
            _this.getEmitterBasureros().setXSpeed(-5, 5);
            _this.getEmitterBasureros().start(false, 1600, 1, 0);
            //Para agregar el objeto al juego
            game.add.existing(_this);
            return _this;
        }
        Basurero.prototype.setEmitterBasureros = function (value) {
            this.emitterBasureros = value;
        };
        Basurero.prototype.getEmitterBasureros = function () {
            return this.emitterBasureros;
        };
        Basurero.prototype.setBasurero = function (value) {
            this.basurero = value;
        };
        Basurero.prototype.getBasurero = function () {
            return this.basurero;
        };
        return Basurero;
    }(JuegoCostanera.Bonus));
    JuegoCostanera.Basurero = Basurero;
})(JuegoCostanera || (JuegoCostanera = {}));
