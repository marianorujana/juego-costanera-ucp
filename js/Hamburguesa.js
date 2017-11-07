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
    var Hamburguesa = (function (_super) {
        __extends(Hamburguesa, _super);
        function Hamburguesa(game, x, y, frame) {
            var _this = _super.call(this, game, x, y, frame) || this;
            var hamburguesa = game.add.sprite(x, y, frame);
            _this.setHamburguesa(hamburguesa);
            _this.getHamburguesa().name = frame;
            game.physics.enable(_this.getHamburguesa(), Phaser.Physics.ARCADE);
            //  This adjusts the collision body size.
            _this.getHamburguesa().body.setSize(10, 10, 0, 0);
            var emitter = game.add.emitter(game.world.width, game.world.bottom - 100, 5);
            _this.setEmitterHamburguesas(emitter);
            _this.getEmitterHamburguesas().makeParticles(frame, null, 1, true);
            _this.getEmitterHamburguesas().setYSpeed(-100, 0);
            _this.getEmitterHamburguesas().setXSpeed(-1000, -500);
            _this.getEmitterHamburguesas().gravity.y = -100;
            _this.getEmitterHamburguesas().start(false, 1600, 1, 0);
            //Para agregar el objeto al juego
            game.add.existing(_this);
            return _this;
        }
        Hamburguesa.prototype.setEmitterHamburguesas = function (value) {
            this.emitterHamburguesas = value;
        };
        Hamburguesa.prototype.getEmitterHamburguesas = function () {
            return this.emitterHamburguesas;
        };
        Hamburguesa.prototype.setHamburguesa = function (value) {
            this.hamburguesa = value;
        };
        Hamburguesa.prototype.getHamburguesa = function () {
            return this.hamburguesa;
        };
        return Hamburguesa;
    }(JuegoCostanera.Bonus));
    JuegoCostanera.Hamburguesa = Hamburguesa;
})(JuegoCostanera || (JuegoCostanera = {}));
