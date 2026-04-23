/* ============================================================
 *  EDIT YOUR PROJECTS HERE
 * ============================================================
 *  Each entry becomes an interactable floating block in the world.
 *  Stand near one (within ~10 tiles), hover it with the cursor,
 *  and RIGHT-CLICK to open its panel.
 *
 *  FIELDS
 *    id         unique string, internal
 *    title      shown at top of the panel
 *    x, y       world pixel coordinates of the object
 *    color      placeholder block color (hex). replace with sprite later.
 *    sections   array of { heading, body } — rendered top-to-bottom
 *    links      array of { label, url } — rendered as a list at the bottom
 *
 *  To add a project: copy a block, change the fields, done.
 *  To remove one:    delete its block.
 * ============================================================ */

// Re-usable long placeholder text so you can test scrolling immediately.
// REPLACE with your real project content when you're ready.
const LONG_PARAGRAPH =
  "This is placeholder project copy. " +
  "Replace it with real details about your process, decisions, trade-offs, " +
  "and outcomes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque " +
  "penatibus et magnis dis parturient montes, nascetur ridiculus mus. " +
  "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. " +
  "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, " +
  "aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet " +
  "a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.";

window.PROJECTS = [
  {
    id: "project-one",
    title: "Example Portfolio Project",
    x: 620,
    y: 470,
    color: 0xffb347,
    sections: [
      {
        heading: "Overview",
        body:
          "A short summary of the project in one paragraph. What it is, " +
          "who it's for, and why it exists.",
      },
      {
        heading: "Process",
        body:
          LONG_PARAGRAPH + "\n\n" +
          LONG_PARAGRAPH + "\n\n" +
          LONG_PARAGRAPH,
      },
      {
        heading: "Challenges",
        body:
          LONG_PARAGRAPH + "\n\n" +
          LONG_PARAGRAPH,
      },
      {
        heading: "Reflection",
        body:
          LONG_PARAGRAPH + "\n\n" +
          LONG_PARAGRAPH,
      },
    ],
    links: [
      { label: "Live site →", url: "https://example.com" },
      { label: "Source code →", url: "https://github.com" },
    ],
  },

  {
    id: "project-two",
    title: "Second Example Project",
    x: 1180,
    y: 360,
    color: 0x7ac4ff,
    sections: [
      {
        heading: "Overview",
        body:
          "Second placeholder project. Edit this object in data/projects.js " +
          "to replace this content.",
      },
      {
        heading: "Process",
        body: LONG_PARAGRAPH + "\n\n" + LONG_PARAGRAPH,
      },
      {
        heading: "Reflection",
        body: LONG_PARAGRAPH,
      },
    ],
    links: [
      { label: "Case study →", url: "https://example.com" },
    ],
  },

  // ---- ADD MORE PROJECTS BELOW ----
];
