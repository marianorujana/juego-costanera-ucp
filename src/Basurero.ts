// import {Bonus} from './Bonus'
module JuegoCostanera {
    export class Basurero extends Bonus {
        emitterBasureros: Phaser.Particles.Arcade.Emitter
        basurero: Phaser.Sprite
        
        constructor(game: Phaser.Game, x: number, y: number,frame: string) {
            super(game, x, y, frame);

            var basurero = game.add.sprite(300, 50, 'basurero')
			this.setBasurero(basurero);
			this.getBasurero().name = 'basurero';
			game.physics.enable(this.getBasurero(), Phaser.Physics.ARCADE);
			//  This adjusts the collision body size.
			this.getBasurero().body.setSize(10, 10, 0, 0);
                            
		    var emitter = game.add.emitter(game.world.centerX,game.world.top, 5);
			this.setEmitterBasureros(emitter);
			this.getEmitterBasureros().width = game.world.width;
			this.getEmitterBasureros().makeParticles('basurero',null,1,true);
			this.getEmitterBasureros().setYSpeed(100, 500);
			this.getEmitterBasureros().setXSpeed(-5, 5);
			this.getEmitterBasureros().start(false, 1600, 1, 0);
            //Para agregar el objeto al juego
            game.add.existing(this);

        }

        setEmitterBasureros(value: Phaser.Particles.Arcade.Emitter){
            this.emitterBasureros = value;
        }

        getEmitterBasureros(){
            return this.emitterBasureros;
        }

        setBasurero(value: Phaser.Sprite){
            this.basurero = value;
        }

        getBasurero(){
            return this.basurero;
        }
    }
}