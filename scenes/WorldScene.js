/* ============================================================
 *  WorldScene — the main playable world.
 * ============================================================
 *  Wires together the systems:
 *    InputSystem       → keyboard + mouse
 *    Player            → movement logic (uses InputSystem + PhysicsConfig)
 *    CameraSystem      → locked-to-player camera + mouse offset
 *    InteractionSystem → right-click on project objects in range
 *
 *  Critical rules from the spec:
 *    - gameplay NEVER pauses (even when the project panel is open)
 *    - world wraps vertically: falling off the bottom returns you to the top
 *    - ground is no longer continuous; platforms are small & spaced out
 *
 *  TO ADD OR MOVE PLATFORMS: edit the PLATFORMS array below.
 *  TO ADD PROJECTS:          edit data/projects.js.
 * ============================================================ */

const WORLD_CONFIG = {
  width: 2400,         // horizontal size of the level
  topY:   -40,         // used for background + initial spawn logic
};

/* ----------------------------------------------------------------
 *  PLATFORMS
 *  Each platform is { x, y, width }. Height = one tile (32px).
 *  Feel free to add/remove/move these to reshape the world.
 * ---------------------------------------------------------------- */
const PLATFORMS = [
  { x: 120,  y: 620, width: 260 },   // spawn
  { x: 420,  y: 520, width: 160 },
  { x: 620,  y: 470, width: 140 },   // holds project-one
  { x: 860,  y: 380, width: 160 },
  { x: 1080, y: 300, width: 120 },
  { x: 1180, y: 400, width: 160 },   // near project-two
  { x: 1400, y: 520, width: 200 },
  { x: 1700, y: 440, width: 140 },
  { x: 1950, y: 340, width: 180 },
  { x: 2200, y: 520, width: 160 },
];

class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // ---- Physics world ----
    // Wide horizontal bounds, NO floor or ceiling — vertical wrap handles falling.
    this.physics.world.setBounds(0, -2000, WORLD_CONFIG.width, 5000);
    this.physics.world.gravity.y = PhysicsConfig.gravity;

    this.cameras.main.setBackgroundColor(ASSETS.sky.color);

    // ---- Platforms (scattered floating tiles) ----
    this.platforms = this.physics.add.staticGroup();
    const tile = ASSETS.tile;
    const tileW = tile.width * tile.scale;
    const tileH = tile.height * tile.scale;

    for (const plat of PLATFORMS) {
      const tilesAcross = Math.max(1, Math.round(plat.width / tileW));
      for (let i = 0; i < tilesAcross; i++) {
        const x = plat.x + i * tileW + tileW / 2;
        const y = plat.y;
        this.platforms.create(x, y, tile.key).setScale(tile.scale).refreshBody();
      }
    }

    // ---- Input + Player ----
    this.inputSystem = new InputSystem(this);
    this.player = new Player(this, PLATFORMS[0].x + 80, PLATFORMS[0].y - 80, this.inputSystem);
    this.physics.add.collider(this.player.sprite, this.platforms);

    // ---- Camera (manual, locked to player) ----
    this.cameraSystem = new CameraSystem(this, this.player.sprite, this.inputSystem);

    // ---- Project objects (one per entry in data/projects.js) ----
    this.projectObjects = PROJECTS.map((project) => new ProjectObject(this, project));

    // ---- Interaction (right-click to open panel) ----
    this.interactionSystem = new InteractionSystem(this, this.player, this.projectObjects);

    // DOM panel init (event listeners for close button + Esc).
    ProjectOverlay.init();
  }

  update(time, delta) {
    // NOTHING pauses here. Movement, camera, and interactions all run
    // every frame regardless of whether the project panel is open.
    this.player.update(delta);
    this.cameraSystem.update();
    this.interactionSystem.update();

    // ---- Vertical world wrap ----
    // Falling below wrapBelowY teleports the player to wrapToY with
    // horizontal position preserved. Gives the world a cyclical feel.
    if (this.player.sprite.y > PhysicsConfig.wrapBelowY) {
      this.player.sprite.setPosition(this.player.sprite.x, PhysicsConfig.wrapToY);
      this.player.sprite.setVelocityY(0);
    }
  }
}

window.WorldScene = WorldScene;
