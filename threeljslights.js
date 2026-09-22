import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

// =====================
// Scene
// =====================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// =====================
// Camera
// =====================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

// =====================
// Renderer
// =====================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

// =====================
// Cube
// =====================

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
);

scene.add(cube);

// =====================
// Ground Plane
// =====================

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: 0x888888
    })
);

plane.rotation.x = -Math.PI / 2;
plane.position.y = -1.5;

scene.add(plane);

// =====================
// Ambient Light
// =====================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambientLight);

// =====================
// Directional Light
// =====================

const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        1
    );

directionalLight.position.set(
    5,
    5,
    5
);

scene.add(directionalLight);

// =====================
// Point Light
// =====================

const pointLight =
    new THREE.PointLight(
        0xff0000,
        20
    );

pointLight.position.set(
    -3,
    2,
    2
);

scene.add(pointLight);

// =====================
// GUI Controls
// =====================

const controls = {

    ambientOn: true,
    ambientColor: "#ffffff",

    directionalOn: true,
    directionalColor: "#ffffff",

    pointOn: true,
    pointColor: "#ff0000"
};

const gui = new GUI();

// Ambient Light Folder

const ambientFolder =
    gui.addFolder("Ambient Light");

ambientFolder
    .add(controls, "ambientOn")
    .name("Visible")
    .onChange((value) => {

        ambientLight.visible = value;

    });

ambientFolder
    .addColor(controls, "ambientColor")
    .name("Color")
    .onChange((value) => {

        ambientLight.color.set(value);

    });

ambientFolder.open();

// Directional Light Folder

const directionalFolder =
    gui.addFolder("Directional Light");

directionalFolder
    .add(controls, "directionalOn")
    .name("Visible")
    .onChange((value) => {

        directionalLight.visible = value;

    });

directionalFolder
    .addColor(controls, "directionalColor")
    .name("Color")
    .onChange((value) => {

        directionalLight.color.set(value);

    });

directionalFolder.open();

// Point Light Folder

const pointFolder =
    gui.addFolder("Point Light");

pointFolder
    .add(controls, "pointOn")
    .name("Visible")
    .onChange((value) => {

        pointLight.visible = value;

    });

pointFolder
    .addColor(controls, "pointColor")
    .name("Color")
    .onChange((value) => {

        pointLight.color.set(value);

    });

pointFolder.open();

// =====================
// Animation Loop
// =====================

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// =====================
// Resize Handler
// =====================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});