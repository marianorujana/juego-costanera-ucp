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
// /// <reference path="../tsDefinitions/phaser.d.ts" />
var JuegoCostanera;
(function (JuegoCostanera) {
    var Personaje = (function (_super) {
        __extends(Personaje, _super);
        function Personaje(game, x, y, frame) {
            var _this = _super.call(this, game, x, y, frame) || this;
            _this.height = 200;
            _this.width = 100;
            game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.body.collideWorldBounds = true;
            _this.body.gravity.y = 500;
            _this.body.setSize(20, 32, 5, 16);
            _this.animations.add('left', [0, 1, 2, 3], 10, true);
            _this.animations.add('turn', [4], 20, true);
            _this.animations.add('right', [5, 6, 7, 8], 10, true);
            _this.setOrientacion('left');
            _this.setPuntos(0);
            _this.setVidas(3);
            //Para agregar el objeto al juego
            game.add.existing(_this);
            return _this;
        }
        Personaje.prototype.getPuntos = function () {
            return this.puntos;
        };
        Personaje.prototype.setPuntos = function (value) {
            this.puntos = value;
        };
        Personaje.prototype.getVidas = function () {
            return this.vidas;
        };
        Personaje.prototype.setVidas = function (value) {
            this.vidas = value;
        };
        Personaje.prototype.setOrientacion = function (value) {
            this.orientacion = value;
        };
        Personaje.prototype.getOrientacion = function () {
            return this.orientacion;
        };
        return Personaje;
    }(Phaser.Sprite));
    JuegoCostanera.Personaje = Personaje;
})(JuegoCostanera || (JuegoCostanera = {}));
