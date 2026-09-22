# WebGLThreeJSLighting

This project contains simple Three.js demos that explore different lighting setups in a WebGL scene. It demonstrates ambient, directional, point, hemisphere, spotlight, and rect area light behavior with interactive controls.

## Included demos

- Basic lighting demo:
  - [threejslights.html](threejslights.html)
  - [threeljslights.js](threeljslights.js)
- Advanced lighting demo:
  - [threejsmorelight.html](threejsmorelight.html)
  - [threejsmorelight.js](threejsmorelight.js)

## Features

- Three.js scene with a 3D object and ground plane
- Multiple light types and color controls
- dat.GUI controls to toggle visibility and adjust colors
- Animated examples for visualizing lighting changes in real time

## Run locally

Because the scripts use ES modules, it is best to serve the files through a local web server instead of opening the HTML files directly from the filesystem.

From the project folder, run:

```bash
cd /workspaces/WebGLThreeJSLighting
python3 -m http.server 8000
```

Then open one of these in your browser:

- http://localhost:8000/threejslights.html
- http://localhost:8000/threejsmorelight.html

## Notes

- The project loads Three.js and dat.GUI from CDN URLs, so an internet connection is required when the page is loaded.
- The advanced demo includes a RectAreaLight and helper, which is useful for understanding area lighting behavior.

## Tech stack

- HTML5
- JavaScript
- Three.js
- dat.GUI
