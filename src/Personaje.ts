// /// <reference path="../tsDefinitions/phaser.d.ts" />
module JuegoCostanera{
    export class Personaje extends Phaser.Sprite{
        puntos: number;
        
        vidas: number;
        getPuntos(){
            return this.puntos;
        }
    
        setPuntos(value:number){
            this.puntos = value;
        }

        // getSprite(){
        //     return this.sprite;
        // }
    
        // setSprite(value:Phaser.Sprite){
        //     this.sprite = value;
        // }
    }
}