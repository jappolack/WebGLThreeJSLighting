import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

import { RectAreaLightUniformsLib }
from 'https://unpkg.com/three@0.160.0/examples/jsm/lights/RectAreaLightUniformsLib.js';

import { RectAreaLightHelper }
from 'https://unpkg.com/three@0.160.0/examples/jsm/helpers/RectAreaLightHelper.js';

RectAreaLightUniformsLib.init();

//
// Scene
//

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

//
// Camera
//

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 15);

//
// Renderer
//

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);

//
// Ground
//

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
        color: 0x228B22
    })
);

ground.rotation.x = -Math.PI / 2;

scene.add(ground);

//
// House
//

const house = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshStandardMaterial({
        color: 0xcccccc
    })
);

house.position.set(
    0,
    2,
    0
);

scene.add(house);

//
// Rotating Sphere
//

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xff9900
    })
);

sphere.position.set(
    -5,
    1,
    0
);

scene.add(sphere);

//
// Hemisphere Light
//

const hemisphereLight =
new THREE.HemisphereLight(
    0x87ceeb,
    0x654321,
    2
);

scene.add(hemisphereLight);

const hemiTargetMarker =
new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0x87ceeb
    })
);

hemiTargetMarker.position.set(
    0,
    0,
    0
);

scene.add(hemiTargetMarker);

//
// Light Markers
//

function createLightMarker(color)
{
    const marker =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.18,
            0.18,
            0.8,
            16
        ),
        new THREE.MeshBasicMaterial({
            color
        })
    );

    marker.rotation.z = Math.PI / 2;

    return marker;
}

//
// Hemisphere Marker
//

const hemiMarker =
createLightMarker(0x87ceeb);

hemiMarker.position.set(
    -8,
    8,
    0
);

scene.add(hemiMarker);

//
// Spotlight
//

const spotLight =
new THREE.SpotLight(
    0xffffff,
    50
);

spotLight.position.set(
    -5,
    7,
    5
);

spotLight.angle =
Math.PI / 8;

spotLight.penumbra = 0.5;

spotLight.target = house;

scene.add(spotLight);
scene.add(spotLight.target);

//
// Spotlight Marker
//

const spotlightMarker =
createLightMarker(0xffffff);

spotlightMarker.position.copy(
    spotLight.position
);

scene.add(spotlightMarker);

const spotTargetMarker =
new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
);

spotTargetMarker.position.copy(
    spotLight.target.position
);

scene.add(spotTargetMarker);

//
// Rect Area Light
//

const rectLight =
new THREE.RectAreaLight(
    0x00ffff,
    10,
    3,
    3
);

rectLight.position.set(
    5,
    3,
    2.05
);

rectLight.lookAt(
    5,
    3,
    10
);

scene.add(rectLight);

//
// Rect Area Light Helper
//

const rectHelper =
new RectAreaLightHelper(
    rectLight
);

rectLight.add(rectHelper);

//
// Rect Light Marker
//

const rectMarker =
createLightMarker(0x00ffff);

rectMarker.position.copy(
    rectLight.position
);

scene.add(rectMarker);

//
// TV Screen Texture
//

const canvas =
document.createElement('canvas');

canvas.width = 512;
canvas.height = 512;

const ctx =
canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(
    0,
    0,
    512,
    512
);

ctx.fillStyle = 'black';
ctx.font = 'bold 200px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

ctx.fillText(
    'TV',
    256,
    256
);

const tvTexture =
new THREE.CanvasTexture(
    canvas
);

//
// TV Screen
//

const tv =
new THREE.Mesh(
    new THREE.PlaneGeometry(
        3,
        3
    ),
    new THREE.MeshStandardMaterial({
        map: tvTexture
    })
);

tv.position.set(
    5,
    3,
    2.01
);

scene.add(tv);

//
// Labels
//

function createLabel(text)
{
    const canvas =
    document.createElement('canvas');

    canvas.width = 256;
    canvas.height = 128;

    const ctx =
    canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';

    ctx.fillText(
        text,
        128,
        64
    );

    const texture =
    new THREE.CanvasTexture(canvas);

    const sprite =
    new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture
        })
    );

    sprite.scale.set(
        2,
        1,
        1
    );

    return sprite;
}

const hemiLabel =
createLabel("Hemisphere");

hemiLabel.position.set(
    -8,
    9,
    0
);

scene.add(hemiLabel);

const spotLabel =
createLabel("SpotLight");

spotLabel.position.set(
    -5,
    8,
    5
);

scene.add(spotLabel);

const rectLabel =
createLabel("RectArea");

rectLabel.position.set(
    5,
    4,
    2
);

scene.add(rectLabel);

//
// GUI
//

const gui = new GUI();

const controls = {

    hemisphere: true,
    skyColor: "#87ceeb",
    hemiIntensity: 2,
    hemiX: -8,
    hemiY: 8,
    hemiZ: 0,

    spotlight: true,
    spotlightColor: "#ffffff",
    spotIntensity: 50,
    flashlightX: -5,
    flashlightY: 7,
    flashlightZ: 5,
    targetX: 0,
    targetY: 2,
    targetZ: 0,

    rectLight: true,
    rectColor: "#00ffff",
    rectIntensity: 10,
    rectX: 5,
    rectY: 3,
    rectZ: 2.05,

    cameraX: 0,
    cameraY: 5,
    cameraZ: 15
};

//
// Hemisphere Controls
//

const hemiFolder =
gui.addFolder("Hemisphere Light");

hemiFolder
.add(
    controls,
    'hemisphere'
)
.onChange(value =>
{
    hemisphereLight.visible = value;
    hemiMarker.visible = value;
});

hemiFolder
.addColor(
    controls,
    'skyColor'
)
.onChange(value =>
{
    hemisphereLight.color.set(value);
});

hemiFolder
.add(
    controls,
    'hemiIntensity',
    0,
    10
)
.onChange(value =>
{
    hemisphereLight.intensity = value;
});

hemiFolder
.add(
    controls,
    'hemiX',
    -20,
    20
)
.onChange(value =>
{
    hemisphereLight.position.x = value;
    hemiMarker.position.x = value;
    hemiLabel.position.x = value;
});

hemiFolder
.add(
    controls,
    'hemiY',
    0,
    20
)
.onChange(value =>
{
    hemisphereLight.position.y = value;
    hemiMarker.position.y = value;
    hemiLabel.position.y = value + 1;
});

hemiFolder
.add(
    controls,
    'hemiZ',
    -20,
    20
)
.onChange(value =>
{
    hemisphereLight.position.z = value;
    hemiMarker.position.z = value;
    hemiLabel.position.z = value;
});

hemiFolder.open();

//
// Spotlight Controls
//

const spotFolder =
gui.addFolder(
    'SpotLight'
);

spotFolder
.add(
    controls,
    'spotlight'
)
.onChange(value =>
{
    spotLight.visible = value;
    spotlightMarker.visible = value;
});

spotFolder
.addColor(
    controls,
    'spotlightColor'
)
.onChange(value =>
{
    spotLight.color.set(value);
});

spotFolder
.add(
    controls,
    'spotIntensity',
    0,
    100
)
.onChange(value =>
{
    spotLight.intensity = value;
});

spotFolder
.add(
    controls,
    'flashlightX',
    -15,
    15
)
.onChange(value =>
{
    spotLight.position.x = value;
    spotlightMarker.position.x = value;
    spotLabel.position.x = value;
});

spotFolder
.add(
    controls,
    'flashlightY',
    1,
    15
)
.onChange(value =>
{
    spotLight.position.y = value;
    spotlightMarker.position.y = value;
    spotLabel.position.y = value + 1;
});

spotFolder
.add(
    controls,
    'flashlightZ',
    -15,
    15
)
.onChange(value =>
{
    spotLight.position.z = value;
    spotlightMarker.position.z = value;
    spotLabel.position.z = value;
});

spotFolder
.add(
    controls,
    'targetX',
    -20,
    20
)
.onChange(value =>
{
    spotLight.target.position.x = value;
    spotTargetMarker.position.x = value;
});

spotFolder
.add(
    controls,
    'targetY',
    -5,
    12
)
.onChange(value =>
{
    spotLight.target.position.y = value;
    spotTargetMarker.position.y = value;
});

spotFolder
.add(
    controls,
    'targetZ',
    -20,
    20
)
.onChange(value =>
{
    spotLight.target.position.z = value;
    spotTargetMarker.position.z = value;
});

spotFolder.open();

//
// Camera Controls
//

const cameraFolder =
gui.addFolder('Camera');

cameraFolder
.add(
    controls,
    'cameraX',
    -30,
    30
)
.onChange(value =>
{
    camera.position.x = value;
});

cameraFolder
.add(
    controls,
    'cameraY',
    -10,
    30
)
.onChange(value =>
{
    camera.position.y = value;
});

cameraFolder
.add(
    controls,
    'cameraZ',
    0,
    40
)
.onChange(value =>
{
    camera.position.z = value;
});

cameraFolder.open();

//
// Rect Area Controls
//

const rectFolder =
gui.addFolder(
    'RectArea Light'
);

rectFolder
.add(
    controls,
    'rectLight'
)
.onChange(value =>
{
    rectLight.visible = value;
    rectMarker.visible = value;
});

rectFolder
.addColor(
    controls,
    'rectColor'
)
.onChange(value =>
{
    rectLight.color.set(value);
});

rectFolder
.add(
    controls,
    'rectIntensity',
    0,
    30
)
.onChange(value =>
{
    rectLight.intensity = value;
});

rectFolder
.add(
    controls,
    'rectX',
    -15,
    15
)
.onChange(value =>
{
    rectLight.position.x = value;
    rectMarker.position.x = value;
    rectLabel.position.x = value;
});

rectFolder
.add(
    controls,
    'rectY',
    0,
    15
)
.onChange(value =>
{
    rectLight.position.y = value;
    rectMarker.position.y = value;
    rectLabel.position.y = value + 1;
});

rectFolder
.add(
    controls,
    'rectZ',
    -15,
    15
)
.onChange(value =>
{
    rectLight.position.z = value;
    rectMarker.position.z = value;
    rectLabel.position.z = value;
});

rectFolder.open();

const resetButton = {
    reset: () =>
    {
        hemisphereLight.intensity = 2;
        hemisphereLight.position.set(-8, 8, 0);
        hemiMarker.position.set(-8, 8, 0);
        hemiLabel.position.set(-8, 9, 0);
        hemiMarker.material.color.set(0x87ceeb);
        controls.hemiIntensity = 2;
        controls.hemiX = -8;
        controls.hemiY = 8;
        controls.hemiZ = 0;

        spotLight.intensity = 50;
        spotLight.position.set(-5, 7, 5);
        spotLight.target.position.set(0, 2, 0);
        spotlightMarker.position.set(-5, 7, 5);
        spotTargetMarker.position.set(0, 2, 0);
        spotLabel.position.set(-5, 8, 5);
        controls.spotIntensity = 50;
        controls.flashlightX = -5;
        controls.flashlightY = 7;
        controls.flashlightZ = 5;
        controls.targetX = 0;
        controls.targetY = 2;
        controls.targetZ = 0;

        rectLight.intensity = 10;
        rectLight.position.set(5, 3, 2.05);
        rectMarker.position.set(5, 3, 2.05);
        rectLabel.position.set(5, 4, 2);
        controls.rectIntensity = 10;
        controls.rectX = 5;
        controls.rectY = 3;
        controls.rectZ = 2.05;

        camera.position.set(0, 5, 15);
        controls.cameraX = 0;
        controls.cameraY = 5;
        controls.cameraZ = 15;

        gui.updateDisplay();
    }
};

gui.add(resetButton, 'reset').name('Reset Scene');

//
// Animation
//

function animate()
{
    requestAnimationFrame(
        animate
    );

    sphere.rotation.y += 0.01;

    house.rotation.y += 0.005;

    spotlightMarker.position.copy(
        spotLight.position
    );

    spotlightMarker.material.color.copy(
        spotLight.color
    );

    rectMarker.material.color.copy(
        rectLight.color
    );

    hemiMarker.material.color.copy(
        hemisphereLight.color
    );

    spotTargetMarker.position.copy(
        spotLight.target.position
    );

    spotTargetMarker.material.color.copy(
        spotLight.color
    );

    spotLabel.position.copy(
        spotlightMarker.position
    );

    spotLabel.position.y += 1;

    rectLabel.position.copy(
        rectMarker.position
    );

    rectLabel.position.y += 1;

    hemiLabel.position.copy(
        hemiMarker.position
    );

    hemiLabel.position.y += 1;

    renderer.render(
        scene,
        camera
    );
}

animate();

//
// Resize
//

window.addEventListener(
    'resize',
    () =>
    {
        camera.aspect =
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);