/* ============================================================
 *  CENTRALIZED ASSET + SIZE CONFIG
 * ============================================================
 *  All visuals right now are placeholder colored rectangles
 *  generated at runtime. When you design real sprites, swap
 *  them in here and nothing else should need to change.
 *
 *  SPRITE SIZE CAN BE CHANGED HERE — game logic reads these
 *  values instead of hardcoding numbers.
 * ============================================================ */

window.ASSETS = {
  // ---- Player ----
  player: {
    key: "player",
    width: 24,
    height: 36,
    scale: 1,
    color: 0x7ef0a2,           // REPLACE with sprite later
    // imagePath: "assets/images/player.png",  // uncomment when you have art
  },

  // ---- Ground / tile ----
  tile: {
    key: "tile",
    width: 32,
    height: 32,
    scale: 1,
    color: 0x5a4631,           // REPLACE with tile sprite
    // imagePath: "assets/images/tile.png",
  },

  // ---- Project object (the interactable block) ----
  projectObject: {
    key: "project",
    width: 28,
    height: 28,
    scale: 1,
    // color is per-project (defined in data/projects.js) so
    // each project block can look distinct with placeholders.
    // imagePath: "assets/images/project.png",
  },

  // ---- Sky / background color ----
  sky: { color: "#1b2538" },
};

/* ------------------------------------------------------------
 *  AssetLoader.preload(scene)
 *  Called from BootScene. Generates placeholder textures from
 *  the config above. When you add real image files, replace
 *  the `generateRect` calls with `scene.load.image(key, path)`.
 * ------------------------------------------------------------ */
window.AssetLoader = {
  preload(scene) {
    generateRect(scene, ASSETS.player.key, ASSETS.player.width, ASSETS.player.height, ASSETS.player.color);
    generateRect(scene, ASSETS.tile.key,   ASSETS.tile.width,   ASSETS.tile.height,   ASSETS.tile.color);

    // Project object placeholder — white base, tinted per-instance.
    generateRect(scene, ASSETS.projectObject.key, ASSETS.projectObject.width, ASSETS.projectObject.height, 0xffffff);

    // --- Real image example (uncomment once you have files) ---
    // scene.load.image(ASSETS.player.key, ASSETS.player.imagePath);
    // scene.load.image(ASSETS.tile.key,   ASSETS.tile.imagePath);
    // scene.load.image(ASSETS.projectObject.key, ASSETS.projectObject.imagePath);
  },
};

/* Generate a solid-color rectangle texture with the given key.
   Phaser caches it so entities can reference it by key. */
function generateRect(scene, key, w, h, colorHex) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(colorHex, 1);
  g.fillRect(0, 0, w, h);
  g.generateTexture(key, w, h);
  g.destroy();
}
