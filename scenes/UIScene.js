/* ============================================================
 *  UIScene — reserved for in-canvas HUD elements later.
 * ============================================================
 *  Phase 1 uses plain DOM for the overlay (see ui/projectOverlay.js)
 *  and a CSS hint bar, so this scene is intentionally empty.
 *  Added now so you have a clear home for future HUD work
 *  (health, minimap, dialog boxes, etc.) without restructuring.
 * ============================================================ */

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene", active: false });
  }

  create() {
    // Intentionally empty for Phase 1.
  }
}

window.UIScene = UIScene;
