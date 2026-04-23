/* ============================================================
 *  WorldScene — the main playable world.
 * ============================================================
 *  Wires together the systems:
 *    InputSystem  → keyboard + mouse
 *    Player       → movement logic (uses InputSystem + PhysicsConfig)
 *    CameraSystem → locked-to-player camera + mouse offset
 *
 *  TO ADD NEW OBJECTS TO THE WORLD:
 *    Most of the time you only need to edit data/projects.js.
 *    If you want a new *kind* of object (e.g. an NPC), create
 *    a new class in /entities and spawn it from create() here.
 * ============================================================ */

const WORLD_CONFIG = {
  width: 4000,          // total level width in pixels
  height: 720,          // nominal level height
  groundHeightTiles: 2,
};

class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // ---- Physics world ----
    this.physics.world.setBounds(0, 0, WORLD_CONFIG.width, WORLD_CONFIG.height);
    this.physics.world.gravity.y = PhysicsConfig.gravity;

    // Background (no camera bounds — camera must be free to stay
    // centered on the player everywhere per the spec).
    this.cameras.main.setBackgroundColor(ASSETS.sky.color);

    // ---- Ground (placeholder tiles) ----
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

    // ---- Systems + Player ----
    this.inputSystem = new InputSystem(this);
    this.player = new Player(this, 120, groundTopY - 80, this.inputSystem);
    this.physics.add.collider(this.player.sprite, this.ground);

    // CameraSystem handles centering manually — no startFollow() here.
    this.cameraSystem = new CameraSystem(this, this.player.sprite, this.inputSystem);

    // ---- Project objects (one per entry in data/projects.js) ----
    this.projectObjects = PROJECTS.map(
      (project) => new ProjectObject(this, project, groundTopY)
    );

    // ---- Interaction key ----
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Overlay controls the DOM project card.
    ProjectOverlay.init();
    this._overlayPaused = false;
  }

  update(time, delta) {
    // Pause physics while the project overlay is open.
    if (ProjectOverlay.isOpen()) {
      if (!this._overlayPaused) {
        this.physics.pause();
        this._overlayPaused = true;
      }
      // Keep the camera snapped to the player so it doesn't drift while paused.
      this.cameraSystem.update();
      return;
    } else if (this._overlayPaused) {
      this.physics.resume();
      this._overlayPaused = false;
    }

    this.player.update(delta);
    this.cameraSystem.update();

    // Find the project object currently in range (if any).
    let nearest = null;
    for (const obj of this.projectObjects) {
      if (obj.updateProximity(this.player) && !nearest) {
        nearest = obj;
      }
    }

    if (nearest && Phaser.Input.Keyboard.JustDown(this.keyE)) {
      ProjectOverlay.show(nearest.project);
    }
  }
}

window.WorldScene = WorldScene;
