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
    var Bonus = (function (_super) {
        __extends(Bonus, _super);
        function Bonus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bonus;
    }(Phaser.Sprite));
    JuegoCostanera.Bonus = Bonus;
})(JuegoCostanera || (JuegoCostanera = {}));
