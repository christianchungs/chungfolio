/* ============================================================
 *  Project overlay (DOM-based)
 * ============================================================
 *  Kept as plain HTML + JS rather than Phaser text so links
 *  are clickable, copy is selectable, and styling is easy.
 * ============================================================ */

window.ProjectOverlay = {
  _isOpen: false,
  _onClose: null,

  init() {
    const close = document.getElementById("overlay-close");
    const backdrop = document.getElementById("project-overlay");

    close.addEventListener("click", () => this.hide());

    // Click outside the card to close.
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) this.hide();
    });

    // Esc also closes.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._isOpen) this.hide();
    });
  },

  show(project, onClose) {
    document.getElementById("overlay-title").textContent = project.title;
    document.getElementById("overlay-description").textContent = project.description;

    const link = document.getElementById("overlay-link");
    if (project.link) {
      link.href = project.link;
      link.textContent = project.linkLabel || "View project →";
    } else {
      link.href = "#";
      link.textContent = "";
    }

    document.getElementById("project-overlay").classList.remove("hidden");
    this._isOpen = true;
    this._onClose = onClose || null;
  },

  hide() {
    document.getElementById("project-overlay").classList.add("hidden");
    this._isOpen = false;
    if (this._onClose) {
      const cb = this._onClose;
      this._onClose = null;
      cb();
    }
  },

  isOpen() {
    return this._isOpen;
  },
};
