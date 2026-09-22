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

//
// Hemisphere Marker
//

const hemiMarker =
new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0x87ceeb
    })
);

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
new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
);

spotlightMarker.position.copy(
    spotLight.position
);

scene.add(spotlightMarker);

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
new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0x00ffff
    })
);

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

    spotlight: true,
    spotlightColor: "#ffffff",

    rectLight: true,
    rectColor: "#00ffff",

    flashlightX: -5,
    flashlightY: 7,
    flashlightZ: 5
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
    'flashlightX',
    -15,
    15
)
.onChange(value =>
{
    spotLight.position.x = value;
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
});

spotFolder.open();

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

rectFolder.open();

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

    spotLabel.position.copy(
        spotlightMarker.position
    );

    spotLabel.position.y += 1;

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