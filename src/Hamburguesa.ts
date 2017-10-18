// import {Bonus} from './Bonus'
module JuegoCostanera {
    export class Hamburguesa extends Bonus {
        emitterHamburguesas: Phaser.Particles.Arcade.Emitter
        hamburguesa: Phaser.Sprite
        
        constructor(game: Phaser.Game, x: number, y: number,frame: string) {
            super(game, x, y, frame);

            var hamburguesa = game.add.sprite(x,y, frame)
			this.setHamburguesa(hamburguesa);
			this.getHamburguesa().name = frame;
			game.physics.enable(this.getHamburguesa(), Phaser.Physics.ARCADE);
			//  This adjusts the collision body size.
			this.getHamburguesa().body.setSize(10, 10, 0, 0);
                            
			var emitter = game.add.emitter(game.world.width,game.world.bottom - 100, 5);
			this.setEmitterHamburguesas(emitter);
			this.getEmitterHamburguesas().makeParticles(frame,null,1,true);
			this.getEmitterHamburguesas().setYSpeed(-100, 0);
			this.getEmitterHamburguesas().setXSpeed(-1000, -500);
			this.getEmitterHamburguesas().gravity.y = -100;
			this.getEmitterHamburguesas().start(false, 1600, 1, 0);

            //Para agregar el objeto al juego
            game.add.existing(this);

        }

        setEmitterHamburguesas(value: Phaser.Particles.Arcade.Emitter){
            this.emitterHamburguesas = value;
        }

        getEmitterHamburguesas(){
            return this.emitterHamburguesas;
        }

        setHamburguesa(value: Phaser.Sprite){
            this.hamburguesa = value;
        }

        getHamburguesa(){
            return this.hamburguesa;
        }
    }
}