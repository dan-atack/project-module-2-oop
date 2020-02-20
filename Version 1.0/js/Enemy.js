// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy extends Entity {
    constructor(theRoot, enemySpot) {
        super();
        this.root = theRoot;
        this.spot = enemySpot;
        this.x = enemySpot * ENEMY_WIDTH;
        this.y = -ENEMY_HEIGHT;
        this.destroyed = false;
        //this.domElement = document.createElement("img");
        // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
        // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
        // is why we create a property that refers to it.
        //this.domElement = document.createElement('img');
        // We give it a src attribute to specify which image to display. This stays part of the enemy class.
        this.domElement.src = './images/enemy.png';
        // We modify the CSS style of the DOM node.
        //this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        //this.domElement.style.zIndex = 5;
        // Show that the user can actually see the img DOM node, we append it to the root DOM node.
        this.root.appendChild(this.domElement);
        // Speed will gradually increase as the game progresses and is moderated by the difficulty setting (see data)
        // Capped at 0.85 since that's pretty harsh:
        this.topspeed = (Math.random() / (10/difficulty) + 0.25);
        this.speed = (this.topspeed <= 0.85) ? this.topspeed : 0.85;
        // Points will be awarded for every cat that goes past the player.
        // More points are awarded for dodging faster cats:
        this.pointsValue = ((this.speed)*10).toFixed(0);
    }

    // We set the speed property of the enemy. This determines how fast it moves down the screen. 
    // To make sure that every enemy has a different speed, we use Math.random()
    // this method will be called on the enemy instance every few milliseconds. The parameter
    // timeDiff refers to the number of milliseconds since the last update was called. 
    update(timeDiff) {
        // We update the y property of the instance in proportion of the amount of time
        // since the last call to update. We also update the top css property so that the image
        // is updated on screen
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;
        // If the enemy is destroyed by hitting you with armor, its DOM is removed before it hits the bottom:
        if (this.destroyed) this.root.removeChild(this.domElement);
        // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
        // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
        // the destroyed property to indicate that the enemy should no longer be in play
        if (this.y > GAME_HEIGHT) {
                this.root.removeChild(this.domElement);
                this.destroyed = true;
        }
    }
}