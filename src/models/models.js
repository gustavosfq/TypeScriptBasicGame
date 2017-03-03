var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * GameObject
 */
var GameObject = (function () {
    function GameObject(width, height, velocity, x, y) {
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
    }
    GameObject.prototype.collision = function (obj) {
        return this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.height + this.y > obj.y;
    };
    return GameObject;
}());
/**
 * Player
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(width, height, velocity, x, y) {
        _super.call(this, width, height, velocity, x, y);
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
    }
    return Player;
}(GameObject));
/**
 * Enemy
 */
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(width, height, velocity, x, y) {
        _super.call(this, width, height, velocity, x, y);
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
    }
    Enemy.prototype.follow = function (player) {
        if (this.x > player.x - (player.width / 2) && this.x < player.x + (player.width / 2)) {
        }
        else if (this.x > player.x) {
            this.x -= this.velocity;
        }
        else if (this.x < player.x) {
            this.x += this.velocity;
        }
        if (this.y > player.y - (player.height / 2) && this.y < player.y + (player.height / 2)) {
        }
        else if (this.y > player.y) {
            this.y -= this.velocity;
        }
        else if (this.y < player.y) {
            this.y += this.velocity;
        }
    };
    Enemy.prototype.resetXY = function () {
        this.x = 0;
        this.y = 0;
    };
    return Enemy;
}(GameObject));
/**
 * Diamond
 */
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(width, height, velocity, x, y) {
        _super.call(this, width, height, velocity, x, y);
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
    }
    Diamond.prototype.randomXY = function (width, height) {
        this.x = ((Math.random() * width) + 1) - this.width;
        this.y = ((Math.random() * height) + 1) - this.height;
    };
    return Diamond;
}(GameObject));
/**
 * KeyMap
 */
var Key = (function () {
    function Key() {
    }
    Key.listenKey = function () {
        var _this = this;
        onkeydown = onkeyup = function (e) {
            _this.map[e.keyCode] = e.type == 'keydown';
        };
    };
    Key.map = {};
    return Key;
}());
//# sourceMappingURL=models.js.map