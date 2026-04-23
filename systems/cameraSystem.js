/* ============================================================
 *  CAMERA SYSTEM  (precision viewport — zero-lag player lock)
 * ============================================================
 *  Core rule:
 *      camera center = player physics body center + mouse offset
 *  NO exceptions. No lerp, no smoothing, no damping, no easing
 *  on the player follow. The ONLY interpolation allowed is on
 *  the additive mouse offset — and that never affects player
 *  tracking timing.
 *
 *  Timing:
 *      The sync runs on Phaser's POST_UPDATE event, which fires
 *      after physics AND user update in the same tick, but
 *      before render. This guarantees the camera uses the
 *      freshest physics body position for the current frame.
 *
 *  Source of truth:
 *      We read sprite.body.center — the physics body position,
 *      never a rendered/interpolated sprite transform.
 * ============================================================ */

class CameraSystem {
  constructor(scene, playerSprite, input) {
    this.scene = scene;
    this.playerSprite = playerSprite;
    this.input = input;
    this.cam = scene.cameras.main;

    // Kill any Phaser-managed follow/bounds — we drive scroll manually.
    this.cam.stopFollow();
    this.cam.removeBounds();
    this.cam.setRoundPixels(true);    // avoid sub-pixel shimmer

    // Smoothed MOUSE offset only (not the anchor).
    this.offsetX = 0;
    this.offsetY = 0;

    // --- POST_UPDATE: runs after physics + user update, before render.
    // This is the correct point in the tick to lock the camera to the
    // physics body — no risk of reading a stale position.
    this._postUpdate = this._postUpdate.bind(this);
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this._postUpdate);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this._postUpdate);
    });
  }

  _postUpdate() {
    const cam = this.cam;
    const vw = cam.width;
    const vh = cam.height;

    // ---------- MOUSE OFFSET (additive only) ----------
    // Cursor position normalized to [-1, 1] of viewport center.
    const m = this.input.getMouse();
    const nx = Phaser.Math.Clamp((m.x - vw / 2) / (vw / 2), -1, 1);
    const ny = Phaser.Math.Clamp((m.y - vh / 2) / (vh / 2), -1, 1);

    const targetOffsetX = nx * PhysicsConfig.cameraMouseOffsetX * vw;
    const targetOffsetY = ny * PhysicsConfig.cameraMouseOffsetY * vh;

    // Smoothing applies ONLY to the offset; NEVER to player tracking.
    this.offsetX = Phaser.Math.Linear(this.offsetX, targetOffsetX, PhysicsConfig.cameraOffsetLerp);
    this.offsetY = Phaser.Math.Linear(this.offsetY, targetOffsetY, PhysicsConfig.cameraOffsetLerp);

    // ---------- PLAYER LOCK (direct, no interpolation) ----------
    // Read from the physics body, not the sprite transform. These are
    // identical for arcade physics after the step, but using body.center
    // is unambiguous and survives any render-side interpolation.
    const body = this.playerSprite.body;
    const px = body.center.x;
    const py = body.center.y;

    // Direct assignment — zero lag.
    cam.setScroll(px - vw / 2 + this.offsetX, py - vh / 2 + this.offsetY);

    // ---------- Optional debug logging ----------
    // Flip PhysicsConfig.cameraDebugLog = true to verify the invariant:
    //   (camera scroll center) minus (mouse offset) == (player body center)
    if (PhysicsConfig.cameraDebugLog) {
      const scrollCenterX = cam.scrollX + vw / 2 - this.offsetX;
      const scrollCenterY = cam.scrollY + vh / 2 - this.offsetY;
      // These two lines should ALWAYS match to sub-pixel precision.
      console.log(
        `[camera] body=(${px.toFixed(2)}, ${py.toFixed(2)})  ` +
        `lockedCenter=(${scrollCenterX.toFixed(2)}, ${scrollCenterY.toFixed(2)})`
      );
    }
  }

  // Kept for backward compatibility — sync runs on POST_UPDATE now.
  update() { /* no-op */ }
}

window.CameraSystem = CameraSystem;
