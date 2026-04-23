/* ============================================================
 *  Project panel (non-blocking right-side drawer)
 * ============================================================
 *  Implemented as plain DOM — crisp text, clickable links,
 *  native scrolling, and independent from the Phaser game loop.
 *
 *  CRITICAL: this panel must NOT pause gameplay. The world,
 *  player, camera, and physics all keep running while it's open.
 *  No backdrop covers the canvas; pointer events on the panel
 *  itself don't affect the game.
 * ============================================================ */

window.ProjectOverlay = {
  _isOpen: false,

  init() {
    document.getElementById("panel-close").addEventListener("click", () => this.hide());

    // Esc also closes. This never affects gameplay since the game loop
    // doesn't care about Esc — we just close the panel.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._isOpen) this.hide();
    });
  },

  show(project) {
    const panel = document.getElementById("project-panel");
    document.getElementById("panel-title").textContent = project.title;

    const content = document.getElementById("panel-content");
    content.innerHTML = "";

    // Sections (Overview / Process / Challenges / Reflection / etc.)
    for (const section of project.sections || []) {
      const h = document.createElement("h3");
      h.textContent = section.heading;
      content.appendChild(h);

      // Split on blank lines so paragraphs render as separate <p> tags.
      const paragraphs = (section.body || "").split(/\n\s*\n/);
      for (const para of paragraphs) {
        const p = document.createElement("p");
        p.textContent = para;
        content.appendChild(p);
      }
    }

    // Links list at the bottom.
    if (project.links && project.links.length) {
      const h = document.createElement("h3");
      h.textContent = "Links";
      content.appendChild(h);

      const ul = document.createElement("ul");
      ul.className = "links-list";
      for (const link of project.links) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = link.label;
        li.appendChild(a);
        ul.appendChild(li);
      }
      content.appendChild(ul);
    }

    // Scroll back to top when switching projects.
    content.scrollTop = 0;

    panel.classList.add("open");
    this._isOpen = true;
  },

  hide() {
    document.getElementById("project-panel").classList.remove("open");
    this._isOpen = false;
  },

  isOpen() {
    return this._isOpen;
  },
};
