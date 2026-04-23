/* ============================================================
 *  Game bootstrap
 * ============================================================
 *  Creates the Phaser instance and registers scenes.
 *  Keep this file tiny — real logic lives in /scenes and /entities.
 * ============================================================ */

const config = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#1b2538",
  scale: {
    mode: Phaser.Scale.RESIZE,   // fills the window; resizes on viewport change
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },         // real gravity is set per-scene in WorldScene
      debug: false,              // flip to true to see collision boxes
    },
  },
  scene: [BootScene, WorldScene, UIScene],
};

new Phaser.Game(config);
