import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import starBackground from './assets/star_background.png';

const earthTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/WorldMap-A_non-Frame.png/1280px-WorldMap-A_non-Frame.png');
const sunTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atacama_Large_Millimeter_Array.jpg/1280px-The_Sun_by_the_Atacama_Large_Millimeter_Array.jpg');

const scene = new THREE.Scene();

// Arguments: FOV, Aspect Ratio, View Frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
   
    canvas: document.querySelector('#bg')

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//Rendering of objects start here

let earth;
let sun;

function renderSun(){

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshStandardMaterial( { map: sunTexture } );
    sun = new THREE.Mesh(geometry, material);
    sun.position.set(0, 0, 0);

    scene.add(sun);

}

function renderEarth(){

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshStandardMaterial( { map: earthTexture } );
    earth = new THREE.Mesh(geometry, material);
    earth.position.set(100, 0, -50);

    scene.add(earth);

}

// function addStar(){

//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
//     const star = new THREE.Mesh(geometry, material);

//     const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

//     star.position.set(x, y, z);
//     scene.add(star);

// }

// Array(200).fill().forEach(addStar);

// const background = new THREE.TextureLoader().load(starBackground);
// scene.background = background;

function earthRevolution(){

    
    const a = 50;
    const b = 40;
    const angle = Date.now()*0.001;

    const x = a * Math.cos(angle);
    const z = b * Math.sin(angle);

    earth.position.set(x, 0, z);

}


function animate(){

    requestAnimationFrame(animate);

    earth.rotation.y += 0.005;

    earthRevolution();
    
    controls.update();
    
    renderer.render(scene, camera);
    
}


renderEarth();
animate();