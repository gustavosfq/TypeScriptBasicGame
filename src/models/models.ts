/**
 * GameObject
 */
class GameObject {
    constructor(
        public width: number,
        public height: number,
        public velocity: number,
        public x: number,
        public y: number
    ) {
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
    }

    collision(obj: GameObject){
        return this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.height + this.y > obj.y;
    }
}

/**
 * Player
 */
class Player extends GameObject {
    constructor(
        public width: number,
        public height: number,
        public velocity: number,
        public x: number,
        public y: number
    ) {
        super(
            width,
            height,
            velocity,
            x,y);
    }
}

/**
 * Enemy
 */
class Enemy extends GameObject {
    constructor(
        public width: number,
        public height: number,
        public velocity: number,
        public x: number,
        public y: number
    ) {
        super(
            width,
            height,
            velocity,
            x,y);
    }


    follow(player: Player){
        if (this.x > player.x - (player.width/2) && this.x < player.x + (player.width/2)) {
            //
        } else if (this.x > player.x) {
            this.x -= this.velocity;
        }else if (this.x < player.x){
            this.x += this.velocity;
        }
        if (this.y > player.y - (player.height/2) && this.y < player.y + (player.height/2)) {
            //
        } else if(this.y > player.y) {
            this.y -= this.velocity;
        }else if (this.y <  player.y){
            this.y += this.velocity;
        }
    }

    resetXY() {
        this.x = 0;
        this.y = 0;
    }
}

/**
 * Diamond
 */
class Diamond extends GameObject {
    constructor(
        public width: number,
        public height: number,
        public velocity: number,
        public x: number,
        public y: number
    ) {
        super(
            width,
            height,
            velocity,
            x,y);
    }

    randomXY(width: number, height: number){
        this.x = ((Math.random() * width) + 1) - this.width;
        this.y = ((Math.random() * height) + 1) - this.height;
    }
}

/**
 * KeyMap
 */
class Key {

    public static map = {};

    static listenKey() {
        onkeydown = onkeyup = e => {
            this.map[e.keyCode] = e.type == 'keydown';
        };
    }

}

interface ILevel {
    score: number,
    width: number,
    height: number,
    velocitiy: number
}