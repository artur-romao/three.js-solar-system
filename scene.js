import { OrbitControls } from "./js/OrbitControls.js";
import Planet from "./js/Planet.js";
import Moon from "./js/Moon.js";

let renderer, camera, scene, controls, stopMotion;
let delta = 0;

function init() {
    let fov = 36;
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.x = -444;
    camera.position.y = 148;
    camera.position.z = 144;
    
    scene = new THREE.Scene();
    const backgroundTexture = new THREE.TextureLoader().load("./img/background.jpg");
    scene.background = backgroundTexture;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    window.addEventListener("resize", () => onWindowResize(), false);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
function astroWorld() {
    init();
    animate();
    
    // create solar system group and add it to the scene
    const solarSystem = new THREE.Group();
    scene.add(solarSystem);

    // create sun and add it to the solar system group
    const sunGeometry = new THREE.SphereGeometry(10);
    const sunTexture = new THREE.TextureLoader().load("./img/sun.jpg");
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sunMesh);

    // create the planets and the moons
    const mercury = new Planet(2, 25, "./img/mercury.jpeg", 1407, 88, 179); // dayTime in hours, orbitalPeriod in days and temperature in Celsius (4th, 5h and 6th parameters)
    const mercuryMesh = mercury.getMesh();
    const mercuryOrbit = mercury.getOrbit();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh, mercuryOrbit);
    mercurySystem.rotation.y = Math.random() * 2 * Math.PI;

    const venus = new Planet(4, 50, "./img/venus.jpg", 5832, 225, 462);
    const venusMesh = venus.getMesh();
    const venusOrbit = venus.getOrbit();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh, venusOrbit);
    venusSystem.rotation.y = Math.random() * 2 * Math.PI;

    const earth = new Planet(4, 75, "./img/earth.jpg", 24, 365, 14);
    const earthMesh = earth.getMesh();
    const earthOrbit = earth.getOrbit();
    const moon = new Moon(1, 75, "./img/moon.jpg");
    const moonMesh = moon.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh, earthOrbit, moonMesh);
    earthSystem.rotation.y = Math.random() * 2 * Math.PI;

    const mars = new Planet(3, 100, "./img/mars.png", 24.666, 687, -60);
    const marsMesh = mars.getMesh();
    const marsOrbit = mars.getOrbit();
    const fobos = new Moon(0.5, 105, "./img/fobos.png");
    const fobosMesh = fobos.getMesh();
    const deimos = new Moon(0.5, 108, "./img/deimos.jpg");
    const deimosMesh = deimos.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh, marsOrbit, fobosMesh, deimosMesh);
    marsSystem.rotation.y = Math.random() * 2 * Math.PI;

    const jupiter = new Planet(8, 125, "./img/jupiter.jpg", 9.9, 4333, -145);
    const jupiterMesh = jupiter.getMesh();
    const jupiterOrbit = jupiter.getOrbit();
    const io = new Moon(1, 135, "./img/io.jpg");
    const ioMesh = io.getMesh();
    const europa = new Moon(1, 137, "./img/europa.jpg");
    const europaMesh = europa.getMesh();
    const callisto = new Moon(1.5, 139, "./img/callisto.jpg");
    const callistoMesh = callisto.getMesh();
    const ganymede = new Moon(2, 142, "./img/ganymede.jpg");
    const ganymedeMesh = ganymede.getMesh();
    let jupiterSystem = new THREE.Group();
    jupiterSystem.add(jupiterMesh, jupiterOrbit, ioMesh, europaMesh, callistoMesh, ganymedeMesh);
    jupiterSystem.rotation.y = Math.random() * 2 * Math.PI;

    const saturn = new Planet(6, 150, "./img/saturn.jpg", 10.7, 10759, -178);
    const saturnMesh = saturn.getMesh();
    const saturnOrbit = saturn.getOrbit();
    const dione = new Moon(1, 157, "./img/dione.jpg");
    const dioneMesh = dione.getMesh();
    const titan = new Moon(1.5, 163, "./img/titan.jpg");
    const titanMesh = titan.getMesh();

    // lines 90 to 96 adapted from https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990/2
    const ringGeometry = new THREE.TorusBufferGeometry( 10, 3, 2, 200 );
    let v3 = new THREE.Vector3();
    let pos = ringGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ringGeometry.attributes.uv.setXY(i, v3.length() < 10 ? 0 : 1, 1);
    }
    const ringTexture = new THREE.TextureLoader().load("./img/saturnRing.jpg");
    // TODO
    const ringMaterial = new THREE.MeshBasicMaterial( { map: ringTexture } ); 
    const ring = new THREE.Mesh( ringGeometry, ringMaterial );
    ring.position.x = saturnMesh.position.x;
    ring.rotation.x = 90;
    let saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh, saturnOrbit, ring, titanMesh, dioneMesh);
    saturnSystem.rotation.y = Math.random() * 2 * Math.PI;

    const uranus = new Planet(5, 175, "./img/uranus.jpg", 17, 30687, -195);
    const uranusMesh = uranus.getMesh();
    const uranusOrbit = uranus.getOrbit();
    const oberon = new Moon(1, 182, "./img/oberon.jpg");
    const oberonMesh = oberon.getMesh();
    const titania = new Moon(1, 184, "./img/titania.jpg");
    const titaniaMesh = titania.getMesh();
    let uranusSystem = new THREE.Group();
    uranusSystem.add(uranusMesh, uranusOrbit, oberonMesh, titaniaMesh);
    uranusSystem.rotation.y = Math.random() * 2 * Math.PI;
    
    const neptune = new Planet(5, 200, "./img/neptune.jpg", 16, 60182, -200);
    const neptuneMesh = neptune.getMesh();
    const neptuneOrbit = neptune.getOrbit();
    const triton = new Moon(1.5, 208, "./img/triton.jpg");
    const tritonMesh = triton.getMesh();
    let neptuneSystem = new THREE.Group();
    neptuneSystem.add(neptuneMesh, neptuneOrbit, tritonMesh);
    neptuneSystem.rotation.y = Math.random() * 2 * Math.PI;

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem, jupiterSystem, saturnSystem, uranusSystem, neptuneSystem);

    // step = 1 degree per frame which will be our Earth rotation and translation reference, consulted in https://stackoverflow.com/questions/11363170/units-of-three-js-calculating-rotation-orbit-speeds
    const step = Math.PI / 500;
    const rotate = () => {
        if (stopMotion) {
            // planets
            sunMesh.rotation.y += 0.001;
            mercurySystem.rotation.y += step * 4.147727273;
            mercuryMesh.rotation.y += step * 0.0171;
            venusSystem.rotation.y += step * 1.377358491;
            venusMesh.rotation.y += step * 0.004;
            earthSystem.rotation.y += step;
            earthMesh.rotation.y += step;
            marsSystem.rotation.y += step * 0.531295488;
            marsMesh.rotation.y += step * 0.972;
            jupiterSystem.rotation.y += step * 0.4;
            jupiterMesh.rotation.y += step * 2.42;
            saturnSystem.rotation.y += step * 0.033925086;
            saturnMesh.rotation.y += step * 2.243;
            uranusSystem.rotation.y += step * 0.011894287;
            uranusMesh.rotation.y += step * 1.4118;
            neptuneSystem.rotation.y += step * 0.006064936;
            neptuneMesh.rotation.y += step * 1.5;

            // moons
            delta += 0.05;
            moonOrbit(moonMesh, 4, 1, 75, delta);
            moonOrbit(fobosMesh, 3, 0.5, 100, delta);
            moonOrbit(deimosMesh, 5, 0.5, 100, -delta);
            moonOrbit(ioMesh, 8, 1, 125, delta + 1);
            moonOrbit(europaMesh, 10, 1, 125, -delta - 1);
            moonOrbit(callistoMesh, 12, 1.5, 125, delta);
            moonOrbit(ganymedeMesh, 14, 2, 125, -delta);
            moonOrbit(dioneMesh, 7, 1, 150, -delta);
            moonOrbit(titanMesh, 13, 1.5, 150, delta);
            moonOrbit(oberonMesh, 7, 1, 175, delta);
            moonOrbit(titaniaMesh, 9, 1, 175, -delta);
            moonOrbit(tritonMesh, 8, 1.5, 200, delta);
        }
        if (document.getElementById("my-checkbox").checked) {
            mercuryOrbit.visible = false;
            venusOrbit.visible = false;
            earthOrbit.visible = false;
            marsOrbit.visible = false;
            jupiterOrbit.visible = false;
            saturnOrbit.visible = false;
            uranusOrbit.visible = false;
            neptuneOrbit.visible = false;
        }
        else {
            mercuryOrbit.visible = true;
            venusOrbit.visible = true;
            earthOrbit.visible = true;
            marsOrbit.visible = true;
            jupiterOrbit.visible = true;
            saturnOrbit.visible = true;
            uranusOrbit.visible = true;
            neptuneOrbit.visible = true;
        }
        requestAnimationFrame(rotate);
    };
    rotate();
    document.addEventListener("keydown", (event) => {
        if (event.code === 'Space') stopMotion = !stopMotion;
    })
}

function moonOrbit(moonMesh, distanceToPlanet, moonRadius, distanceToSun, delta) {
    moonMesh.position.z = (distanceToPlanet + 1 + moonRadius) * Math.sin(delta);
    moonMesh.position.x = (distanceToPlanet + 1 + moonRadius) * Math.cos(delta) + distanceToSun;
}

astroWorld();