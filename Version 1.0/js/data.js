// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 450;
const GAME_HEIGHT = 500;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 3;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

// These constants ensure any powerups introduced into the game will have the right dimesions:

const GOODIE_WIDTH = 75;
const GOODIE_HEIGHT = 76;
// You can have up to 3 armor points
const MAX_ARMOR = 3;

// Pause value dictates whether the game can proceed:

let gamePaused = false;

// Next goodie will start at a preset value and count down; when it reaches zero another goodie drops:

let nextGoodie = 10;

// Difficulty will alter the drop speed of cats and goodies and slowly increases as the game proceeds

let difficulty = 1;

// The threshold for the game to advance to the next difficulty level (increases as the game progresses):

let threshold = 100;

// Still to add: Pimp out the UI a little bit, and change the shield to a visor which then gets worn by your burger!

// Make the PAWS/ RESTART buttons *slightly* prettier...

// Have the game wait on a click to start, and have an instructions sheet a la Final Boss Fight

// Player chooses screen size! The bigger it is, the more cats/enemies appear!

// Replace cats and/or burgers with little monsters or something.