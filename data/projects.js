/* ============================================================
 *  EDIT YOUR PROJECTS HERE
 * ============================================================
 *  Each entry becomes an interactable object in the world.
 *  Walk up to it and press "E" to open its details.
 *
 *  FIELDS
 *    id          unique string, used internally
 *    title       shown at top of the overlay
 *    description paragraph body of the overlay
 *    link        external URL (optional — leave "" to hide)
 *    linkLabel   text for the link button (defaults to "View project")
 *    x           world x-coordinate (pixels). spread these out.
 *    color       placeholder block color (hex). replace with sprite later.
 *
 *  To add a project: copy a block, change the fields, done.
 *  To remove one:    delete its block.
 * ============================================================ */

window.PROJECTS = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "A short description of your first project. Explain what it does, what you used, and what made it interesting.",
    link: "https://example.com",
    linkLabel: "View project →",
    x: 600,
    color: 0xffb347,
  },

  {
    id: "project-two",
    title: "Project Two",
    description:
      "Second project description. Keep it to a paragraph or two — the overlay is intentionally compact.",
    link: "",
    linkLabel: "",
    x: 1100,
    color: 0x7ac4ff,
  },

  // ---- ADD MORE PROJECTS BELOW ----
  // {
  //   id: "project-three",
  //   title: "Project Three",
  //   description: "...",
  //   link: "https://...",
  //   linkLabel: "View project →",
  //   x: 1600,
  //   color: 0xa78bfa,
  // },
];
