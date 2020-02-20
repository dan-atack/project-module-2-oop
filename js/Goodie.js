// The Goodie class will eventually be used as the basis for all powerups that may rain down on the player:

class Goodie extends Entity {
    // Just one argument, the root, will be passed into the constructor function:
    constructor(root) {
        super();
        this.root = root;
        // x-position is the the width of the goodie time a random number from 0 to 4:
        this.x = ((Math.floor(Math.random() * (GAME_WIDTH / GOODIE_WIDTH))) * GOODIE_WIDTH);
        this.y = 0;
        this.destroyed = false;
        this.domElement.src = './images/shield.png';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.width = GOODIE_WIDTH;
        this.root.appendChild(this.domElement);
        // Goodie drop speed is moderated by difficulty setting in game data file:
        this.speed = (Math.random() / (15/difficulty) + 0.25);
        console.log("Goodie created: goodie object reporting")
        console.log("goodie root element = ", this.root);
    };

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;
        if (this.y > GAME_HEIGHT) {
            this.destroyed = true;
            this.root.removeChild(this.domElement);
        }
    };
};