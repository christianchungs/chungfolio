/* ============================================================
 *  INTERACTION SYSTEM
 * ============================================================
 *  Handles right-click interactions with project objects.
 *
 *  Rules:
 *    - player must be within PhysicsConfig.interactionRange
 *    - cursor must be hovering the object
 *    - right-click (only) opens the project panel
 *
 *  The game loop never pauses — this system just opens the UI
 *  panel; movement/physics/camera keep running.
 * ============================================================ */

class InteractionSystem {
  constructor(scene, player, projectObjects) {
    this.scene = scene;
    this.player = player;
    this.objects = projectObjects;

    // Prevent the browser's right-click menu from appearing over the canvas.
    scene.input.mouse.disableContextMenu();

    // pointerdown fires for any button; we filter to right-click only.
    scene.input.on("pointerdown", (pointer) => {
      if (!pointer.rightButtonDown()) return;
      const target = this.objects.find((o) => o.isInteractable());
      if (target) {
        ProjectOverlay.show(target.project);
      }
    });
  }

  // Called each frame from WorldScene.update — refreshes in-range/hover
  // state so outlines render correctly even while the player is moving.
  update() {
    for (const obj of this.objects) {
      obj.updateInteractable(this.player);
    }
  }
}

window.InteractionSystem = InteractionSystem;
