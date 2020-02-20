// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root);
        // New goodies attribute will let us create powerups at a certain interval...
        this.goodies = null;
        this.enemies = [];
        // We add the background image to the game
        addBackground(this.root);
        this.scoreboard = new Text(this.root, "12px", "12px");
        this.levelCounter = new Text(this.root, "10px", "10px");
        console.log(`Player created with ${this.player.armor} armor.`)
    };

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {
        // Levelup check:
        if (this.player.score >= threshold) {
            difficulty += 1;
            this.player.level = difficulty;
            threshold += (((this.player.score)/2) > 100) ? (this.player.score/2) : 100; // You need 1.5 times more points for each level up.
            console.log(threshold);
        };
        // Powerup check:
        if (this.player.armor) this.player.activateArmor();
        // Scoreboard and Level Counter:
        this.scoreboard.update(`Score: ${(gameEngine.player.score)}`);
        this.levelCounter.update(`Level: ${difficulty}`);
        this.levelCounter.domElement.style.marginLeft = `${GAME_WIDTH-120}px`;
        // Time updates:
        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        this.lastFrame = (new Date).getTime();
        // Position updates for enemies:
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        // Remove destroyed enemies:
        // BEFORE we remove them though, we'll add the points value for any destroyed enemies to the player score,
        // AND reduce the 'next goodie' countdown by one:
        this.enemies.forEach(enemy => {
            if (enemy.destroyed) {
                this.player.score += Number(enemy.pointsValue);
                nextGoodie -= 1;
            }
        });
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });

        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array 
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
        }
        // We check if the player is dead. If he is, we alert the user
        // and return from the method (Why is the return statement important?)
        if (this.isPlayerDead()) {
            window.alert("Game over");
            // Upon death, restart button appears (code is in engine utilities file):
            createRestart();
            gamePaused = true;  // Just so you can't move around when you're dead.
            return;
        }
        // Then we spawn a goodie if enough cats have fallen past the screen:
        goodieDrop();
        // All goodie checks are in an if statement since they won't work in the absence of a goodie:
        if (this.goodies) {
            if (this.goodies.destroyed) this.goodies = null;        // if goodie is destroyed, reset to null
            else this.goodies.update(timeDiff);                     // else update goodie location
        };
        // Next, we check if the player has gotten a powerup:
        this.checkPowerUpAchieved();
        // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
        // EMBEDDED IN A CONDITIONAL STATEMENT TO MAKE PAUSE BUTTON WORK
        if (!gamePaused) setTimeout(this.gameLoop, 20);
    }
    // This method is not implemented correctly, which is why
    // the burger never dies. In your exercises you will fix this method.
    isPlayerDead = () => {
        let isDead = false;
        this.enemies.forEach(enemy => {
            // For each enemy check if it is in the same lane as the player and is at the player's height: if so, you're dead.
            if ((enemy.x === this.player.x) && ((enemy.y > 300) && enemy.y < 450)) isDead = true;
            });
            // UNLESS you have a powerup (armor) in which case the cat that hit you disappears and your armor is used up:
            if (isDead && (this.player.armor > 0)) {
                this.enemies.forEach(enemy => {
                    if (enemy.x === this.player.x) {
                        enemy.destroyed = true;
                        this.player.armor -= 1;
                        console.log(`Armor reduced to ${this.player.armor}`);
                    }
                    isDead = false;
                    if (this.player.armor === 0) this.player.domElement.style.boxShadow = "none";
                })
            }
        return isDead;
    };

    checkPowerUpAchieved = () => {
        if (this.goodies) {
            if (((gameEngine.goodies.y >= 380) && (gameEngine.goodies.x === gameEngine.player.x)) && gameEngine.player.armor < 3) {
                this.goodies.root.removeChild(this.goodies.domElement);
                this.goodies = null;
                this.player.armor += 1;
                this.player.score += 25;
                console.log(`Armor increased to ${gameEngine.player.armor}`);
            }
        }
    };
};