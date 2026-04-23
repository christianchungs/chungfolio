/* ============================================================
 *  INPUT SYSTEM
 * ============================================================
 *  Wraps keyboard + mouse position into one tidy API so that
 *  gameplay code (Player, CameraSystem) never touches Phaser
 *  key objects directly. Supports WASD and arrow keys.
 * ============================================================ */

class InputSystem {
  constructor(scene) {
    this.scene = scene;

    // Arrow keys + Space (createCursorKeys bundles these together).
    this.cursors = scene.input.keyboard.createCursorKeys();

    // WASD.
    this.wasd = scene.input.keyboard.addKeys({
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up:    Phaser.Input.Keyboard.KeyCodes.W,
    });

    // Mouse position (canvas-local, pixels). Start centered so the camera
    // offset is 0 until the user actually moves the mouse.
    this.mouse = { x: scene.scale.width / 2, y: scene.scale.height / 2 };
    scene.input.on("pointermove", (p) => {
      this.mouse.x = p.x;
      this.mouse.y = p.y;
    });
  }

  // ---- Movement ----
  isLeft()  { return this.cursors.left.isDown  || this.wasd.left.isDown; }
  isRight() { return this.cursors.right.isDown || this.wasd.right.isDown; }

  // ---- Jump (any of: W, ↑, Space) ----
  // isJumpJustDown/Up return true for exactly ONE frame after the state change,
  // which is what drives coyote time, jump buffer, and variable jump height.
  isJumpJustDown() {
    return (
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
      Phaser.Input.Keyboard.JustDown(this.wasd.up)
    );
  }

  isJumpJustUp() {
    return (
      Phaser.Input.Keyboard.JustUp(this.cursors.up) ||
      Phaser.Input.Keyboard.JustUp(this.cursors.space) ||
      Phaser.Input.Keyboard.JustUp(this.wasd.up)
    );
  }

  // ---- Mouse (for camera offset) ----
  getMouse() { return this.mouse; }
}

window.InputSystem = InputSystem;
