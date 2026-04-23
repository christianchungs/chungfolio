/* ============================================================
 *  ProjectObject entity
 * ============================================================
 *  One of these is spawned per entry in data/projects.js.
 *  Shows a floating "Press E" prompt when the player is near.
 *
 *  To add a new object to the world: don't edit this file —
 *  just add an entry to data/projects.js.
 * ============================================================ */

const INTERACT_RADIUS = 60;   // pixels — how close the player must be

class ProjectObject {
  constructor(scene, project, groundY) {
    this.scene = scene;
    this.project = project;

    // Sit the object flush on top of the ground.
    const cfg = ASSETS.projectObject;
    const y = groundY - (cfg.height * cfg.scale) / 2;

    this.sprite = scene.physics.add.staticSprite(project.x, y, cfg.key);
    this.sprite.setScale(cfg.scale);
    this.sprite.setTint(project.color || 0xffffff);
    this.sprite.refreshBody();

    // "Press E" prompt — hidden by default, shown when player is close.
    this.prompt = scene.add.text(project.x, y - 44, "E", {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#000000cc",
      padding: { left: 6, right: 6, top: 3, bottom: 3 },
    });
    this.prompt.setOrigin(0.5, 0.5);
    this.prompt.setVisible(false);

    // A small title label above each object so the user can see
    // which project is which without opening the overlay.
    this.label = scene.add.text(project.x, y - 24, project.title, {
      fontFamily: "sans-serif",
      fontSize: "11px",
      color: "#e8e8f0",
    });
    this.label.setOrigin(0.5, 1);
  }

  // Called every frame from the scene. Returns true if the player
  // is within interaction range (so the scene knows which one "E" opens).
  updateProximity(player) {
    const p = player.getPosition();
    const dx = p.x - this.sprite.x;
    const dy = p.y - this.sprite.y;
    const near = Math.hypot(dx, dy) <= INTERACT_RADIUS;
    this.prompt.setVisible(near);
    return near;
  }
}

window.ProjectObject = ProjectObject;
