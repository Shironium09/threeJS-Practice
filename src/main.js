import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import starBackground from './assets/star_background.png';

const earthTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/WorldMap-A_non-Frame.png/1280px-WorldMap-A_non-Frame.png');

const scene = new THREE.Scene();

// Arguments: FOV, Aspect Ratio, View Frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
   
    canvas: document.querySelector('#bg')

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.SphereGeometry(10, 32, 32);
const material = new THREE.MeshStandardMaterial( { map: earthTexture } );
const earth = new THREE.Mesh(geometry, material);

scene.add(earth);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){

    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x, y, z);
    scene.add(star);

}

Array(200).fill().forEach(addStar);

const background = new THREE.TextureLoader().load(starBackground);
scene.background = background;

function animate(){

    requestAnimationFrame(animate);

    earth.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);

}

animate();