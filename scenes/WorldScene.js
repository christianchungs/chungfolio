/* ============================================================
 *  WorldScene — the main playable world.
 * ============================================================
 *  Responsibilities:
 *    - build the ground (tiled placeholder blocks)
 *    - spawn the player
 *    - spawn project objects from data/projects.js
 *    - camera follow
 *    - "E" to open the project overlay when near an object
 *
 *  TO ADD NEW OBJECTS TO THE WORLD:
 *    Most of the time you only need to edit data/projects.js.
 *    If you want a new *kind* of object (e.g. an NPC), create
 *    a new class in /entities and spawn it from create() here.
 * ============================================================ */

const WORLD_CONFIG = {
  width: 4000,          // total level width in pixels
  height: 720,          // viewport height
  groundHeightTiles: 2, // how many tile rows of ground
  gravityY: 900,
};

class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // ---- World + camera bounds ----
    this.physics.world.setBounds(0, 0, WORLD_CONFIG.width, WORLD_CONFIG.height);
    this.physics.world.gravity.y = WORLD_CONFIG.gravityY;
    this.cameras.main.setBounds(0, 0, WORLD_CONFIG.width, WORLD_CONFIG.height);
    this.cameras.main.setBackgroundColor(ASSETS.sky.color);

    // ---- Ground ----
    // A static group of repeated tile sprites. Simple + easy to swap
    // for a real tilemap later without changing gameplay code.
    this.ground = this.physics.add.staticGroup();
    const tile = ASSETS.tile;
    const tileW = tile.width * tile.scale;
    const tileH = tile.height * tile.scale;
    const tilesAcross = Math.ceil(WORLD_CONFIG.width / tileW);
    const groundTopY = WORLD_CONFIG.height - tileH * WORLD_CONFIG.groundHeightTiles;

    for (let row = 0; row < WORLD_CONFIG.groundHeightTiles; row++) {
      for (let col = 0; col < tilesAcross; col++) {
        const x = col * tileW + tileW / 2;
        const y = groundTopY + row * tileH + tileH / 2;
        this.ground.create(x, y, tile.key).setScale(tile.scale).refreshBody();
      }
    }

    // ---- Player ----
    // Spawn just above the ground so they fall into place.
    this.player = new Player(this, 120, groundTopY - 80);
    this.physics.add.collider(this.player.sprite, this.ground);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

    // ---- Project objects (one per entry in data/projects.js) ----
    this.projectObjects = PROJECTS.map(
      (project) => new ProjectObject(this, project, groundTopY)
    );

    // ---- Interaction key ----
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Pause physics while the overlay is open so nothing moves underfoot.
    ProjectOverlay.init();
    this._overlayPaused = false;
  }

  update() {
    // If the overlay is open, freeze input/physics.
    if (ProjectOverlay.isOpen()) {
      if (!this._overlayPaused) {
        this.physics.pause();
        this._overlayPaused = true;
      }
      return;
    } else if (this._overlayPaused) {
      this.physics.resume();
      this._overlayPaused = false;
    }

    this.player.update();

    // Figure out which (if any) object the player is currently next to.
    let nearest = null;
    for (const obj of this.projectObjects) {
      if (obj.updateProximity(this.player) && !nearest) {
        nearest = obj;
      }
    }

    // Press E to open that object's overlay.
    if (nearest && Phaser.Input.Keyboard.JustDown(this.keyE)) {
      ProjectOverlay.show(nearest.project);
    }
  }
}

window.WorldScene = WorldScene;
