/* ============================================================
 *  BootScene
 * ============================================================
 *  Runs first. Generates/loads textures via AssetLoader, then
 *  hands off to WorldScene. Keep this scene minimal.
 * ============================================================ */

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    AssetLoader.preload(this);
  }

  create() {
    this.scene.start("WorldScene");
  }
}

window.BootScene = BootScene;
