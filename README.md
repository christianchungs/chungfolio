# Chungfolio

A 2D platformer-style portfolio site built with [Phaser 3](https://phaser.io/) and vanilla JavaScript. Walk around, find project objects, press **E** to view details.

## Run locally

No build step. Just serve the folder:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly via `file://` works in most browsers too, but a local server is more reliable.

## Controls

| Action | Keys |
| --- | --- |
| Move | `A` / `D` or `←` / `→` |
| Jump | `W` / `↑` / `Space` |
| Interact | `E` (when near a project) |
| Close overlay | `Esc` or click outside |

## Folder structure

```
/assets/    asset loader + (later) sprite images
/data/      project content — EDIT projects.js to add portfolio entries
/entities/  Player, ProjectObject
/scenes/    BootScene, WorldScene, UIScene
/styles/    main.css (overlay + page chrome)
/ui/        DOM overlay for project details
index.html  entry point (loads Phaser via CDN)
main.js     Phaser game config
```

## Editing your portfolio

Open **[data/projects.js](data/projects.js)** — every project is one object in the array. Add, remove, or edit entries. No other file needs to change.

## Replacing placeholder visuals

All placeholder colors + sizes live in **[assets/assetLoader.js](assets/assetLoader.js)**. When you have real sprites:

1. Drop the PNGs into `assets/images/`.
2. In `assetLoader.js`, comment out the `generateRect(...)` call and uncomment the `scene.load.image(...)` line above it.
3. Adjust `width` / `height` / `scale` in the same file if needed — game logic reads these values, so nothing else breaks.

## Deploying to GitHub Pages

1. Push the repo to GitHub.
2. In the repo's **Settings → Pages**, set source to `main` branch, `/ (root)`.
3. Your site is served at `https://<you>.github.io/<repo>/`.

No build step needed — it's all static files.
