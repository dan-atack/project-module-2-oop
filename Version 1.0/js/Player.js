// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player extends Entity {
    // The constructor takes one parameter. This parameter refers to the parent DOM node.
    // We will be adding a DOM element to this parent DOM node.
    constructor(root) {
        super();
        this.x = 2 * PLAYER_WIDTH;
        const y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.domElement.src = 'images/player.png';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top =` ${y}px`;
        this.domElement.style.zIndex = '10';
        root.appendChild(this.domElement);
        // I'm adding a score attribute to the player class, which will be modified by events in the game engine:
        this.score = 0;
        // LEVEL Counter: Will rise gradually as you accumulate points
        this.level = difficulty;
        // POWERUP Attribute: You can have a powerup which will have special properties:
        this.armor = 0;
    }
    // This method will be called when the user presses the left key. See in Engine.js
    // Now wrapped in an if statement to disable it if the game is paused!
    moveLeft() {
        if (!gamePaused) {
            if (this.x > 0) {
                this.x = this.x - PLAYER_WIDTH;
            }
            this.domElement.style.left = `${this.x}px`;
        }  
    }
    // We do the same thing for the right key. See Engine.js to see when this happens.
    moveRight() {
        if (!gamePaused) {
            if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
                this.x = this.x + PLAYER_WIDTH;
            }
            this.domElement.style.left = `${this.x}px`;
        }
    }
    activateArmor() {
        if (this.armor === 1) {
            this.domElement.style.boxShadow = "2px 0px 10px 5px lightblue";
        } else if (this.armor === 2) {
            this.domElement.style.boxShadow = "2px 0px 11px 8px green";
        } else if (this.armor === 3) {
            this.domElement.style.boxShadow = "2px 0px 12px 11px orange";
        }
    };
}