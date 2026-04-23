/* ============================================================
 *  PHYSICS / MOVEMENT / WORLD CONSTANTS  (central config)
 * ============================================================
 *  EVERY tunable value lives here — movement, jump, camera,
 *  interaction, and world-wrap behavior. No gameplay file
 *  hardcodes numbers; they all read from this object.
 * ============================================================ */

window.PhysicsConfig = {
  // ---------- WORLD ----------
  gravity: 1400,                 // TERRARIA-LIKE MOVEMENT BASE VALUE — snappy fall

  // ---------- HORIZONTAL MOVEMENT ----------
  maxSpeed: 200,                 // TERRARIA-LIKE MOVEMENT BASE VALUE — px/s top speed
  groundAccel: 2400,             // px/s² — high value = reaches top speed in ~0.08s (snappy)
  groundFriction: 2400,          // px/s² — strong stop when no input is held
  airControlMultiplier: 0.5,     // air accel/friction = 50% of ground

  // ---------- JUMP ----------
  jumpVelocity: -460,            // initial upward velocity for first jump
  doubleJumpEnabled: true,       // DOUBLE JUMP STATE TRACKING — toggle mid-air jump
  doubleJumpVelocity: -420,      // slightly weaker second jump (feels grounded)
  jumpCutMultiplier: 0.45,       // variable jump height: velocity-Y * this when jump released early
  coyoteTimeMs: 80,              // grace window after leaving ground to still "jump from ground"
  jumpBufferMs: 100,             // buffer jump input if pressed slightly before landing

  // ---------- CAMERA (mouse offset) ----------
  // Player is ALWAYS locked to exact center; no smoothing on the anchor.
  // The mouse offset is the only variation — and only the offset is smoothed.
  cameraMouseOffsetX: 0.15,      // 15% of viewport width
  cameraMouseOffsetY: 0.12,      // 12% of viewport height
  cameraOffsetLerp: 0.15,        // smoothing factor for the OFFSET only (not the anchor)

  // ---------- INTERACTION ----------
  // Player must be within this distance of a project object AND hovering it
  // with the cursor, then right-click to open the panel. ~10 tiles @ 16px.
  interactionRange: 160,

  // ---------- VERTICAL WORLD WRAP ----------
  // When the player falls below wrapBelowY, they teleport to wrapToY with
  // their x preserved. Creates the "trapped in a cyclical world" feel.
  wrapBelowY: 1000,
  wrapToY: -60,
};
