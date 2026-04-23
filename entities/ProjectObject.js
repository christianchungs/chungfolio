/* ============================================================
 *  ProjectObject entity
 * ============================================================
 *  One is spawned per entry in data/projects.js.
 *
 *  Interaction model:
 *    - player must be within PhysicsConfig.interactionRange
 *    - cursor must be hovering the object
 *    - right-click then opens the project panel
 *
 *  Visual feedback:
 *    - subtle outline when player is in range
 *    - brighter outline when ALSO hovered (interactable)
 *
 *  To add a new object to the world: don't edit this file —
 *  just add an entry to data/projects.js.
 * ============================================================ */

class ProjectObject {
  constructor(scene, project) {
    this.scene = scene;
    this.project = project;

    const cfg = ASSETS.projectObject;

    // Static physics body so nothing pushes it around. We don't need
    // collider with the player — projects are just floating markers.
    this.sprite = scene.physics.add.staticSprite(project.x, project.y, cfg.key);
    this.sprite.setScale(cfg.scale);
    this.sprite.setTint(project.color || 0xffffff);
    this.sprite.refreshBody();

    // Title label above the object so users know which is which.
    this.label = scene.add.text(project.x, project.y - (cfg.height * cfg.scale) / 2 - 8, project.title, {
      fontFamily: "sans-serif",
      fontSize: "11px",
      color: "#e8e8f0",
    });
    this.label.setOrigin(0.5, 1);

    // Outline rectangle for in-range / hover feedback. Hidden by default.
    const w = cfg.width * cfg.scale + 6;
    const h = cfg.height * cfg.scale + 6;
    this.outline = scene.add.rectangle(project.x, project.y, w, h);
    this.outline.setStrokeStyle(2, 0xffffff, 0.5);
    this.outline.setFillStyle(); // no fill
    this.outline.setVisible(false);

    this._inRange  = false;
    this._hovered  = false;
  }

  // Called every frame from the InteractionSystem.
  updateInteractable(player) {
    // --- Range check (player distance) ---
    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    this._inRange = Math.hypot(dx, dy) <= PhysicsConfig.interactionRange;

    // --- Hover check (cursor over this sprite's world-space bounds) ---
    const pointer = this.scene.input.activePointer;
    // Manually convert pointer screen coords → world coords using the camera.
    const cam = this.scene.cameras.main;
    const worldX = pointer.x + cam.scrollX;
    const worldY = pointer.y + cam.scrollY;
    const b = this.sprite.getBounds();
    this._hovered = Phaser.Geom.Rectangle.Contains(b, worldX, worldY);

    // --- Visual feedback ---
    if (this._inRange && this._hovered) {
      this.outline.setVisible(true);
      this.outline.setStrokeStyle(3, 0xffffff, 1);     // strong highlight → interactable
    } else if (this._inRange) {
      this.outline.setVisible(true);
      this.outline.setStrokeStyle(2, 0xffffff, 0.45);  // soft outline → in range
    } else {
      this.outline.setVisible(false);
    }
  }

  // True only when the player can actually open this object right now.
  isInteractable() {
    return this._inRange && this._hovered;
  }
}

window.ProjectObject = ProjectObject;
