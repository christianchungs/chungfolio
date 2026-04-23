/* ============================================================
 *  PHYSICS / MOVEMENT CONSTANTS  (central config)
 * ============================================================
 *  EVERY tunable movement value lives here. No gameplay file
 *  hardcodes physics numbers — they all read from this object.
 *  Tweak these to change the feel of the game.
 * ============================================================ */

window.PhysicsConfig = {
  // ---------- WORLD ----------
  gravity: 1400,                 // TERRARIA-LIKE MOVEMENT BASE VALUE — snappy fall

  // ---------- HORIZONTAL MOVEMENT ----------
  maxSpeed: 200,                 // TERRARIA-LIKE MOVEMENT BASE VALUE — px/s top speed
  groundAccel: 2400,             // px/s² — high value = reaches top speed in ~0.08s (snappy)
  groundFriction: 2400,          // px/s² — strong stop when no input is held
  airControlMultiplier: 0.5,     // air accel/friction = 50% of ground (reduced air control)

  // ---------- JUMP ----------
  jumpVelocity: -460,            // initial upward velocity for first jump
  doubleJumpEnabled: true,       // DOUBLE JUMP STATE TRACKING — toggle mid-air jump
  doubleJumpVelocity: -420,      // slightly weaker second jump (feels grounded, not flighty)
  jumpCutMultiplier: 0.45,       // variable jump height: velocity-Y * this when jump released early
  coyoteTimeMs: 80,              // tiny grace window after leaving ground to still "jump from ground"
  jumpBufferMs: 100,             // buffer jump input if pressed slightly before landing

  // ---------- CAMERA (mouse offset) ----------
  // Max offset is a fraction of the viewport: 0.15 = 15% of screen width/height.
  // Player stays perfectly centered at offset=0; cursor nudges the view.
  cameraMouseOffsetX: 0.15,      // 10–20% of screen size per the spec
  cameraMouseOffsetY: 0.12,
  cameraOffsetLerp: 0.12,        // smoothing ONLY applies to the offset, NOT to the player anchor
};
