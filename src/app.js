var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById("game");
        this.c2d = this.canvas.getContext("2d");
        this.player = new Player(10, 10, 8, this.canvas.width / 2, this.canvas.height / 2);
        this.lvls = [
            { score: 300, width: 10, height: 10, velocitiy: 3 },
            { score: 600, width: 10, height: 10, velocitiy: 4 },
            { score: 900, width: 13, height: 13, velocitiy: 5 },
            { score: 1200, width: 13, height: 13, velocitiy: 6 },
            { score: 1500, width: 15, height: 15, velocitiy: 7 },
            { score: 1800, width: 20, height: 20, velocitiy: 8 },
        ];
        this.enemy = new Enemy(10, 10, 3, this.canvas.width / 5, this.canvas.height / 5);
        this.diamond = new Diamond(15, 15, 0, 0, 0);
        this.reset();
        this.runDiamond();
        //run
        this.interval = setInterval(function () {
            onkeypress = function (e) {
                if (e.keyCode === 112) {
                    _this.pause = !_this.pause;
                }
            };
            if (!_this.pause) {
                _this.update();
            }
        }, 1000 / 30);
    }
    //loop
    Game.prototype.update = function () {
        this.draw();
        Key.listenKey();
        if (this.lvls[this.currentLvl].score == this.score) {
            this.currentLvl++;
            if (this.currentLvl === this.lvls.length) {
                this.pause = true;
                alert("GANASTEEE");
                this.reset();
            }
            else {
                this.enemy.width = this.lvls[this.currentLvl].width;
                this.enemy.height = this.lvls[this.currentLvl].height;
                this.enemy.velocity = this.lvls[this.currentLvl].velocitiy;
            }
        }
        this.enemy.follow(this.player);
        this.player.velocity = Key.map[86] ? 4 : 8;
        if (this.player.collision(this.diamond)) {
            this.score += 100;
            clearInterval(this.diamondInterval);
            this.runDiamond();
        }
        if (this.player.collision(this.enemy)) {
            this.enemy.resetXY();
            this.lives--;
            if (!this.lives) {
                this.draw();
                this.gameOver();
            }
        }
        if (Key.map[37]) {
            if (this.player.x < 0) {
                this.player.x = this.canvas.width - this.player.width;
            }
            else {
                this.player.x -= this.player.velocity;
            }
        }
        if (Key.map[38]) {
            if (this.player.y < 0) {
                this.player.y = this.canvas.height - this.player.height;
            }
            else {
                this.player.y -= this.player.velocity;
            }
        }
        if (Key.map[39]) {
            if (this.player.x > this.canvas.width - this.player.width) {
                this.player.x = 0;
            }
            else {
                this.player.x += this.player.velocity;
            }
        }
        if (Key.map[40]) {
            if (this.player.y > this.canvas.height - this.player.height) {
                this.player.y = 0;
            }
            else {
                this.player.y += this.player.velocity;
            }
        }
    };
    Game.prototype.draw = function () {
        //background
        this.c2d.fillStyle = "black";
        this.c2d.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //player
        this.c2d.fillStyle = "white";
        this.c2d.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        //enemy
        this.c2d.fillStyle = "red";
        this.c2d.fillRect(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        //diamond
        this.c2d.fillStyle = "blue";
        this.c2d.fillRect(this.diamond.x, this.diamond.y, this.diamond.width, this.diamond.height);
        //score
        this.c2d.fillStyle = "white";
        this.c2d.fillText("Score: " + this.score, 20, 20);
        //lives
        this.c2d.fillStyle = "white";
        this.c2d.fillText("Lives: " + this.lives, 20, 40);
    };
    Game.prototype.runDiamond = function () {
        var _this = this;
        //set xy diamond
        this.diamond.randomXY(this.canvas.width, this.canvas.height);
        this.diamondInterval = setInterval(function () {
            _this.diamond.randomXY(_this.canvas.width, _this.canvas.height);
        }, 2000);
    };
    Game.prototype.reset = function () {
        this.currentLvl = 0;
        this.score = 0;
        this.lives = 3;
        this.enemy.width = this.lvls[this.currentLvl].width;
        this.enemy.height = this.lvls[this.currentLvl].height;
        this.enemy.velocity = this.lvls[this.currentLvl].velocitiy;
        for (var key in Key.map) {
            Key.map[key] = false;
        }
        ;
    };
    Game.prototype.gameOver = function () {
        this.pause = true;
        alert("valiste verga");
        this.reset();
    };
    return Game;
}());
//game begins bro
var game = new Game();
//# sourceMappingURL=app.js.map