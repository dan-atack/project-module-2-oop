// I've shifted quite a few things around here, just testing some ideas. Also, making main into a function
// Will allow me (hopefully) to make the game wait on the any key before starting, so I can explain its wonderful features.

addBackground(document.getElementById("app"));

let intro = new Introtext(document.getElementById("app"), `30px`, `0px`, 60, `CAtz vs Burgers: Deluxe Edition`);
let feats = new Introtext(document.getElementById("app"), `30px`, "150px", 36, "Featpuurs:");
let meow = new Introtext(document.getElementById("app"), `30px`, "200px", 26, "*PAWS Button (toggle with spacebar)\n *Up to 3 levels of armor \n *Gets Progressively harder!\n*Dodging faster cats is worth more\npoints!" , true);
let presskey = new Introtext(document.getElementById("app"), "30px", "400px", 34, "***PRESS ANY KEY TO START***");

const anyKey = event => {
    if (event.keyCode != 0) {
        document.getElementById("app").removeChild(intro.domElement);
        document.getElementById("app").removeChild(feats.domElement);
        document.getElementById("app").removeChild(meow.domElement);
        document.getElementById("app").removeChild(presskey.domElement);
        document.removeEventListener("keydown", anyKey);
        main();
    }
};

document.addEventListener("keydown", anyKey);

function main() {
    const pauseToggle = () => {
        // pause button has to toggle the global game paused value, and if we're unpausing it has to restart the game engine and reset the 
        // last Frame variable to make the game resume smoothly; otherwise the passage of real time will cause any cats that were
        // on-screen when the pause button was activated to essentially disappear.
        // Pause function only works if you're not dead.
        if (gamePaused && !playerDead) {
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
    
    const gameEngine = new Engine(document.getElementById("app"));
    // keydownHandler is a variable that refers to a function. The function has one parameter
    // (does the parameter name matter?) which is called event. As we will see below, this function
    // will be called every time the user presses a key. The argument of the function call will be an object.
    // The object will contain information about the key press, such as which key was pressed. 
    const keydownHandler = event => {
        // event.code contains a string. The string represents which key was press. If the
        // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
        if (event.code === "ArrowLeft") {
            gameEngine.player.moveLeft();
        }
        // If \`event.code\` is the string that represents a right arrow keypress,
        // then move our hamburger to the right
        if (event.code === "ArrowRight") {
            gameEngine.player.moveRight();
        }
        // Space bar pauses the game:
        if(event.keyCode == 32) {
            // if you're alive, space pauses the game; if you're dead it restarts it:
            (playerDead) ? gameEngine.resetGame() : pauseToggle();
        }
    };


    // Pause button added to white space. Pause functionality will be in engine utilities file:

    const pauseGen = () => {
        const pause = document.createElement("button");
        pause.id = "pause";
        pause.innerText = "PAWS";
        pause.style.marginTop = "16px";
        pause.style.marginLeft = "16px";
        whitebox.appendChild(pause);
    }

    pauseGen();

    document.getElementById("pause").addEventListener("click", pauseToggle);

    // We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
    document.addEventListener("keydown", keydownHandler);

    // We call the gameLoop method to start the game
    gameEngine.gameLoop();
};

