import * as THREE from '../js/three.js/build/three.module.js'

import { OrbitControls } from '../js/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../js/three.js/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../js/three.js/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from '../js/three.js/examples/jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer;

init();
render();

function init() {
    let container = document.getElementById('3DModel');
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight
    camera = new THREE.PerspectiveCamera(20, containerWidth / containerHeight, 0.2, 50);
    camera.position.set(0, 0.05, ((0.0011) * containerWidth) - 1.77);
    // camera.position.set(0, 0.05, -0.5);
    console.log(camera.position);
    console.log(containerWidth);

    scene = new THREE.Scene();

    new RGBELoader()
        .setPath('../js/three.js/examples/textures/equirectangular/')
        .load('venice_sunset_1k.hdr', function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;

            // scene.background = texture;
            scene.environment = texture;

            render();

            // model

            // use of RoughnessMipmapper is optional
            const roughnessMipmapper = new RoughnessMipmapper(renderer);

            const loader = new GLTFLoader().setPath('./js/three.js/examples/models/gltf/Sonic 3d/');
            loader.load('Sonic 3D.gltf', function (gltf) {

                gltf.scene.traverse(function (child) {

                    if (child.isMesh) {

                        roughnessMipmapper.generateMipmaps(child.material);

                    }

                });
                scene.add(gltf.scene);
                // scene.translateZ(-0.05);
                roughnessMipmapper.dispose();

                render();

            });

        });

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerWidth, containerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    //add fade-right attribute to canvas:
    let canv = container.childNodes[0];
    canv.setAttribute('data-aos', 'long-fade-right');
    canv.setAttribute('data-aos-easing', 'ease-in-out');
    canv.setAttribute('data-aos-duration', '2000');

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 0.32;
    controls.maxDistance = 1.5;
    controls.target.set(0, 0.05, 0);
    controls.update();

    window.addEventListener('resize', resize, { passive: true })
}


function resize() {
    let container = document.getElementById('3DModel');
    renderer.width = container.clientWidth;
    renderer.height = container.clientHeight;
    renderer.setSize(renderer.width, renderer.height);
    camera.aspect = renderer.width / renderer.height;
    camera.updateProjectionMatrix();
    render();
}


function render() {
    renderer.render(scene, camera);
}