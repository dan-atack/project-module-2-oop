// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function, 
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = enemies => {
    // enemySpots will refer to the number of spots available (can you calculate it?)
    const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
    // To find out where to place an enemy, we first need to find out which are the spots available.
    // We don't want to place two enemies in the same lane. To accomplish this, we first create an 
    // array with 5 elements (why 5?) and each element is false. 
    // We then use forEach to iterate through all the enemies.
    // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
    // We can use this property to modify the spotsTaken array.
    const spotsTaken = [false, false, false, false, false];
    enemies.forEach(enemy => {
        spotsTaken[enemy.spot] = true;
    });
    // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
    // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
    // We will randomly try different spots until we find out that is available
    let candidate = undefined;
    while (candidate === undefined || spotsTaken[candidate]) {
        // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
        candidate = Math.floor(Math.random() * enemySpots);
    }
    // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
    return candidate;
}

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = root => {
    // We create a new img DOM node.
    const bg = document.createElement("img");
    // We set its src attribute and the height and width CSS attributes
    bg.src = 'images/stars.png';
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;
    // We add it to the root DOM node
    root.append(bg);
    // We don't want the enemies to go beyond the lower edge of the image
    // so we place a white div to hide the enemies after they reach the bottom.
    // To see what it does, you can comment out all the remaining lines in the function to see the effect.
    const whiteBox = document.createElement("div");
    // We put a high z-index so that the div is placed over all other DOM nodes
    whiteBox.id = "whitebox";                   // Added this line to create pause button in main.js file
    whiteBox.style.zIndex = 100;
    whiteBox.style.position = 'absolute';
    whiteBox.style.top = `${GAME_HEIGHT}px`;
    whiteBox.style.height = `${ENEMY_HEIGHT}px`;
    whiteBox.style.width = `${GAME_WIDTH}px`;
    whiteBox.style.background = '#fff';
    root.append(whiteBox);
}

// This function will be called by the pause button when clicked.

function pauseToggle() {
    // pause button has to toggle the global game paused value, and if we're unpausing it has to restart the game engine and reset the 
    // last Frame variable to make the game resume smoothly; otherwise the passage of real time will cause any cats that were
    // on-screen when the pause button was activated to essentially disappear.
    if (gamePaused) {
        gamePaused = false;
        gameEngine.lastFrame = (new Date).getTime();
        gameEngine.gameLoop();
    } else {
        gamePaused = true;
    }
};

// Restart Button functionality:
// Reset player position to middle
// Destroy all current enemies and remove their sprites
// Reset game engine's internal time variable
// Reset player score and armor values
// Unhide pause button (it becomes invisible upon player death)
// Remove restart button so they don't pile up after multiple deaths

function resetGame() {
    gameEngine.player.x = (2 * PLAYER_WIDTH);
    gameEngine.player.domElement.style.left = `${gameEngine.player.x}px`;
    gameEngine.enemies.forEach(enemy => {
        gameEngine.root.removeChild(enemy.domElement);
        enemy.destroyed = true;
    });
    gameEngine.enemies = [];
    gameEngine.lastFrame = null;
    whitebox.removeChild(restart);
    gameEngine.player.score = 0;
    gameEngine.player.armor = 0;
    gamePaused = false;
    difficulty = 1;
    threshold = 10;
    document.getElementById("pause").style.visibility = "visible";
    gameEngine.gameLoop();
};

// Restart button creator function:

function createRestart() {
    let restart = document.createElement("button");
    restart.innerText = "RESTART";
    restart.id = "restart";
    restart.style.marginLeft = "16px";
    whitebox.appendChild(restart);
    restart.addEventListener("click", resetGame);
    document.getElementById("pause").style.visibility = "hidden";
};

// Goodie drop determinator function: Waits on a universal variable to countdown, then resets it.
// Interval between goodie drops increases with difficulty level.

function goodieDrop() {
    if (nextGoodie <= 0) {
        gameEngine.goodies = new Goodie(gameEngine.root);
        nextGoodie += (difficulty * 1.5 + 16);
    }
};