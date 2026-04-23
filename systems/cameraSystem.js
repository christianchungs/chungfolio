/* ============================================================
 *  CAMERA SYSTEM
 * ============================================================
 *  Core rule: the player is ALWAYS perfectly centered.
 *  Phaser's built-in startFollow() is NOT used — it introduces
 *  lag. We compute scroll manually every frame so the camera
 *  anchor is locked 1:1 to the player's position.
 *
 *  The only allowed deviation is a small mouse-driven offset,
 *  which is lerped smoothly (the offset is smoothed, not the
 *  anchor itself).
 * ============================================================ */

class CameraSystem {
  constructor(scene, targetSprite, input) {
    this.scene = scene;
    this.target = targetSprite;   // the player sprite
    this.input = input;
    this.cam = scene.cameras.main;

    // Disable any built-in follow / bounds clamping so the camera
    // can stay centered on the player everywhere.
    this.cam.stopFollow();
    this.cam.removeBounds();

    // Current (smoothed) mouse offset from player center.
    this.offsetX = 0;
    this.offsetY = 0;
  }

  update() {
    const vw = this.cam.width;
    const vh = this.cam.height;
    const mouse = this.input.getMouse();

    // Normalize mouse position to [-1, 1] relative to viewport center.
    const nx = Phaser.Math.Clamp((mouse.x - vw / 2) / (vw / 2), -1, 1);
    const ny = Phaser.Math.Clamp((mouse.y - vh / 2) / (vh / 2), -1, 1);

    // Target offset in pixels: a fraction of the viewport dimensions.
    const targetOffsetX = nx * PhysicsConfig.cameraMouseOffsetX * vw;
    const targetOffsetY = ny * PhysicsConfig.cameraMouseOffsetY * vh;

    // Lerp the OFFSET only — not the player anchor. This keeps the
    // player centered with zero lag; only the "lean" smooths.
    this.offsetX = Phaser.Math.Linear(this.offsetX, targetOffsetX, PhysicsConfig.cameraOffsetLerp);
    this.offsetY = Phaser.Math.Linear(this.offsetY, targetOffsetY, PhysicsConfig.cameraOffsetLerp);

    // CAMERA IS LOCKED TO PLAYER CENTER HERE
    // scroll = top-left of viewport; subtracting half the viewport
    // from the player position centers them exactly.
    const anchorX = this.target.x - vw / 2;
    const anchorY = this.target.y - vh / 2;

    // MOUSE OFFSET APPLIED AFTER CENTERING
    this.cam.setScroll(anchorX + this.offsetX, anchorY + this.offsetY);
  }
}

window.CameraSystem = CameraSystem;
