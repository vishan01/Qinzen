# Qinzen : Platformer Game

## Description

Qinzen is a 2D platformer game developed using JavaScript and HTML5 Canvas. 
The game features a samurai character that can run, jump, and attack. 
The game world includes collision blocks and platform collision blocks for realistic movement and interactions.
The camera follows the player, panning left and right as the player moves through the level.

## File Structure

-   `collisionBlock.js`: Defines the `CollisionBlock` class used for handling collisions in the game.
-   `collisions.js`: Contains the collision data for the game map.
-   `data/map.js`: Stores the map data, including tile layers, collision objects, and tileset information.
-   `img/`: Contains image assets for the game.
    -   `background.png`: Background image for the game.
    -   `qinzen.png`: Sprite image.
    -   `Samurai/`: Contains sprite sheets for the samurai character's animations.
        -   `Attack_1.png`, `Attack_2.png`, `Attack_3_Left.png`, `Attack_3.png`: Attack animations.
        -   `Dead.png`: Dead animation.
        -   `Fall_Right.png`, `Fall.png`: Falling animations.
        -   `Hurt.png`: Hurt animation.
        -   `Idle.png`, `IdleLeft.png`: Idle animations.
        -   `Jump_Right.png`, `Jump.png`: Jumping animations.
        -   `Run.png`, `RunLeft.png`: Running animations.
        -   `Shield.png`: Shield animation.
        -   `Walk.png`: Walking animation.
-   `index.html`: The main HTML file that sets up the canvas and includes the JavaScript files.
-   `LICENSE`: License information.
-   `player.js`: Defines the `Player` class, which handles player movement, animations, and collisions.
-   `README.md`: This file, providing an overview of the game.
-   `script.js`: Main script that initializes the game, handles animations, and manages user input.
-   `sprite.js`: Defines the `Sprite` class for handling image loading and drawing.

## Usage

To play the game, open `index.html` in a web browser.

## Controls

-   **Right Arrow**: Move right
-   **Left Arrow**: Move left
-   **Space**: Attack

## Key Components

-   **Canvas**: The HTML5 canvas element is used for rendering the game.
-   **Player Class**: Located in [`player.js`](player.js), this class manages the player's state, including position, velocity, and animation.
-   **Animation**: The `animate` function in [`script.js`](script.js) is responsible for updating the game state and rendering the scene.  It uses `requestAnimationFrame` for smooth animations.
-   **Collisions**: The game uses collision detection to prevent the player from passing through solid objects.  Collision data is stored in [`collisions.js`](collisions.js), and collision blocks are defined in [`collisionBlock.js`](collisionBlock.js).
-   **Camera**: The camera follows the player horizontally, panning as the player moves. The camera's position is updated in the `animate` function in [`script.js`](script.js).
-   **Sprites**: The [`sprite.js`](sprite.js) file contains the `Sprite` class, which is used to load and draw images.  The player's animations are implemented using sprite sheets located in the `img/Samurai/` directory.

## Website
[vishan.me](https://vishan.me/Qinzen)

## Assets

All image assets, including the background and samurai animations, are stored in the `img/` directory. The map data is stored in `data/map.js`.
