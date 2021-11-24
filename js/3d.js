import * as THREE from '../js/three.js/build/three.module.js'

import { OrbitControls } from '../js/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../js/three.js/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../js/three.js/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from '../js/three.js/examples/jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer;

init();
render();

function init() {

    // const container = document.createElement('div');
    // const parentContainer = document.getElementById('3DModel')
    // parentContainer.appendChild(container);

    // const container = document.querySelector('.container');

    let container = document.getElementById('3DModel');
    // document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(20, container.offsetWidth / container.offsetHeight, 0.2, 50);
    console.log(container.offsetWidth);
    // container.offsetWidth
    camera.position.set(0, 0.05, container.offsetWidth / (-2400));

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
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 0.32;
    controls.maxDistance = 1;
    controls.target.set(0, 0.05, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    let container = document.getElementById('3DModel');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);

    render();

}

//

function render() {
    let container = document.getElementById('3DModel');
    renderer.render(scene, camera);

}