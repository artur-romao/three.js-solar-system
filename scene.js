import { OrbitControls } from "./js/OrbitControls.js";
import Planet from "./js/Planet.js";
import Moon from "./js/Moon.js";

let renderer, camera, scene, controls, stopMotion, raycaster;
const pointer = new THREE.Vector2();
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

    raycaster = new THREE.Raycaster();

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
    const mercury = new Planet(2, 25, "./img/mercury.jpeg", 1407, 88, 179, 4879); // dayTime in hours, orbitalPeriod in days and temperature in Celsius (4th, 5h and 6th parameters)
    const mercuryMesh = mercury.getMesh();
    const mercuryOrbit = mercury.getOrbit();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh, mercuryOrbit);
    
    const randomMercury = Math.random()* 2 * Math.PI; // initialize variable to multiply for random planet position generation
    mercuryMesh.position.z = 25 * Math.sin(randomMercury); // distance to sun * sin(randomAngle) to put the planet in a random position in the orbit
    mercuryMesh.position.x = 25 * Math.cos(randomMercury); // distance to sun * cos(randomAngle) to put the planet in a random position in the orbit

    const venus = new Planet(4, 50, "./img/venus.jpg", 5832, 225, 462, 12104);
    const venusMesh = venus.getMesh();
    const venusOrbit = venus.getOrbit();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh, venusOrbit);
    
    const randomVenus = Math.random()* 2 * Math.PI; 
    venusMesh.position.z = 50 * Math.sin(randomVenus); 
    venusMesh.position.x = 50 * Math.cos(randomVenus); 


    const earth = new Planet(4, 75, "./img/earth.jpg", 24, 365, 14, 12742);
    const earthMesh = earth.getMesh();
    const earthOrbit = earth.getOrbit();
    const moon = new Moon(1, 75, "./img/moon.jpg");
    const moonMesh = moon.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh, earthOrbit, moonMesh);
    
    const randomEarth = Math.random()* 2 * Math.PI; 
    earthMesh.position.z = 75 * Math.sin(randomEarth); 
    earthMesh.position.x = 75 * Math.cos(randomEarth); 
    moonMesh.position.z = 82 * Math.sin(randomEarth);
    moonMesh.position.x = 82 * Math.cos(randomEarth);

    const mars = new Planet(3, 100, "./img/mars.png", 24.666, 687, -60, 6779);
    const marsMesh = mars.getMesh();
    const marsOrbit = mars.getOrbit();
    const fobos = new Moon(0.5, 105, "./img/fobos.png");
    const fobosMesh = fobos.getMesh();
    const deimos = new Moon(0.5, 108, "./img/deimos.jpg");
    const deimosMesh = deimos.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh, marsOrbit, fobosMesh, deimosMesh);
    
    const randomMars = Math.random()* 2 * Math.PI;
    marsMesh.position.z = 100 * Math.sin(randomMars); 
    marsMesh.position.x = 100 * Math.cos(randomMars); 
    fobosMesh.position.z = 104 * Math.sin(randomMars);
    fobosMesh.position.x = 104 * Math.cos(randomMars);
    deimosMesh.position.z = 106 * Math.sin(randomMars);
    deimosMesh.position.x = 106 * Math.cos(randomMars);

    const jupiter = new Planet(8, 125, "./img/jupiter.jpg", 9.9, 4333, -145, 139820);
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
    
    const randomJupiter = Math.random()* 2 * Math.PI;
    jupiterMesh.position.z = 125 * Math.sin(randomJupiter); 
    jupiterMesh.position.x = 125 * Math.cos(randomJupiter); 
    ioMesh.position.z = 135 * Math.sin(randomJupiter);
    ioMesh.position.x = 135 * Math.cos(randomJupiter);
    europaMesh.position.z = 137 * Math.sin(randomJupiter);
    europaMesh.position.x = 137 * Math.cos(randomJupiter);
    callistoMesh.position.z = 139 * Math.sin(randomJupiter);
    callistoMesh.position.x = 139 * Math.cos(randomJupiter);
    ganymedeMesh.position.z = 142 * Math.sin(randomJupiter);
    ganymedeMesh.position.x = 142 * Math.cos(randomJupiter);

    const saturn = new Planet(6, 150, "./img/saturn.jpg", 10.7, 10759, -178, 116460);
    const saturnMesh = saturn.getMesh();
    const saturnOrbit = saturn.getOrbit();
    const dione = new Moon(1, 157, "./img/dione.jpg");
    const dioneMesh = dione.getMesh();
    const titan = new Moon(1.5, 163, "./img/titan.jpg");
    const titanMesh = titan.getMesh();

    // lines 150 to 156 adapted from https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990/2
    const ringGeometry = new THREE.TorusBufferGeometry( 10, 3, 2, 200 );
    let v3 = new THREE.Vector3();
    let pos = ringGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ringGeometry.attributes.uv.setXY(i, v3.length() < 10 ? 0 : 1, 1);
    }
    const ringTexture = new THREE.TextureLoader().load("./img/saturnRing.jpg");
    const ringMaterial = new THREE.MeshBasicMaterial( { map: ringTexture } ); 
    const ring = new THREE.Mesh( ringGeometry, ringMaterial );
    ring.position.x = saturnMesh.position.x;
    ring.rotation.x = 90;
    let saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh, saturnOrbit, ring, titanMesh, dioneMesh);
    
    const randomSaturn = Math.random()* 2 * Math.PI;
    saturnMesh.position.z = 150 * Math.sin(randomSaturn); 
    saturnMesh.position.x = 150 * Math.cos(randomSaturn); 
    ring.position.z = 150 * Math.sin(randomSaturn); 
    ring.position.x = 150 * Math.cos(randomSaturn); 
    dioneMesh.position.z = 157 * Math.sin(randomSaturn);
    dioneMesh.position.x = 157 * Math.cos(randomSaturn);
    titanMesh.position.z = 163 * Math.sin(randomSaturn);
    titanMesh.position.x = 163 * Math.cos(randomSaturn);

    const uranus = new Planet(5, 175, "./img/uranus.jpg", 17, 30687, -195, 50724);
    const uranusMesh = uranus.getMesh();
    const uranusOrbit = uranus.getOrbit();
    const oberon = new Moon(1, 182, "./img/oberon.jpg");
    const oberonMesh = oberon.getMesh();
    const titania = new Moon(1, 184, "./img/titania.jpg");
    const titaniaMesh = titania.getMesh();
    let uranusSystem = new THREE.Group();
    uranusSystem.add(uranusMesh, uranusOrbit, oberonMesh, titaniaMesh);
    
    const randomUranus = Math.random()* 2 * Math.PI;
    uranusMesh.position.z = 175 * Math.sin(randomUranus); 
    uranusMesh.position.x = 175 * Math.cos(randomUranus); 
    oberonMesh.position.z = 182 * Math.sin(randomUranus);
    oberonMesh.position.x = 182 * Math.cos(randomUranus);
    titaniaMesh.position.z = 184 * Math.sin(randomUranus);
    titaniaMesh.position.x = 184 * Math.cos(randomUranus);

    const neptune = new Planet(5, 200, "./img/neptune.jpg", 16, 60182, -200, 49244);
    const neptuneMesh = neptune.getMesh();
    const neptuneOrbit = neptune.getOrbit();
    const triton = new Moon(1.5, 208, "./img/triton.jpg");
    const tritonMesh = triton.getMesh();
    let neptuneSystem = new THREE.Group();
    neptuneSystem.add(neptuneMesh, neptuneOrbit, tritonMesh);
    
    const randomNeptune = Math.random()* 2 * Math.PI;
    neptuneMesh.position.z = 200 * Math.sin(randomNeptune); 
    neptuneMesh.position.x = 200 * Math.cos(randomNeptune); 
    tritonMesh.position.z = 208 * Math.sin(randomNeptune);
    tritonMesh.position.x = 208 * Math.cos(randomNeptune);
    

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem, jupiterSystem, saturnSystem, uranusSystem, neptuneSystem);

    // step = 1 degree per frame
    const step = Math.PI / 25;
    const rotate = () => {
        if (stopMotion) {
            delta += 0.05;

            sunMesh.rotation.y += 0.001;
            // planets self rotation and translation
            planetOrbit(randomMercury, mercuryMesh, 25, -delta * step * 4.147727273);
            mercuryMesh.rotation.y += 0.2 * step * 0.0171;
            planetOrbit(randomVenus, venusMesh, 50, -delta * step * 1.377358491);
            venusMesh.rotation.y += 0.2 * step * 0.004;
            planetOrbit(randomEarth, earthMesh, 75, -delta * step);
            earthMesh.rotation.y += 0.2 * step;
            planetOrbit(randomMars, marsMesh, 100, -delta * step * 0.531295488);
            marsMesh.rotation.y += 0.2 * step * 0.972;
            planetOrbit(randomJupiter, jupiterMesh, 125, -delta * step * 0.4);
            jupiterMesh.rotation.y += 0.2 * step * 2.42;
            planetOrbit(randomSaturn, saturnMesh, 150, -delta * step * 0.033925086);
            planetOrbit(randomSaturn, ring, 150, -delta * step * 0.033925086);
            saturnMesh.rotation.y += 0.2 * step * 2.243;
            planetOrbit(randomUranus, uranusMesh, 175, -delta * step * 0.011894287);
            uranusMesh.rotation.y += 0.2 * step * 1.4118;
            planetOrbit(randomNeptune, neptuneMesh, 200, -delta * step * 0.006064936);
            neptuneMesh.rotation.y += 0.2 * step * 1.5;

            // moons translation around the planet
            moonOrbit(moonMesh, 4, earthMesh, delta);
            moonOrbit(fobosMesh, 3, marsMesh, -delta);
            moonOrbit(deimosMesh, 5, marsMesh, delta);
            moonOrbit(ioMesh, 8, jupiterMesh, -delta - 1);
            moonOrbit(europaMesh, 10, jupiterMesh, delta + 1);
            moonOrbit(callistoMesh, 12, jupiterMesh, -delta);
            moonOrbit(ganymedeMesh, 14, jupiterMesh, delta);
            moonOrbit(dioneMesh, 7, saturnMesh, delta);
            moonOrbit(titanMesh, 13, saturnMesh, -delta);
            moonOrbit(oberonMesh, 7, uranusMesh, -delta);
            moonOrbit(titaniaMesh, 9, uranusMesh, delta);
            moonOrbit(tritonMesh, 8, neptuneMesh, -delta);

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
    // when pressing space, stop planets and moons motion
    document.addEventListener("keydown", (event) => {
        if (event.code === 'Space') stopMotion = !stopMotion;
    })
    // when clicking a planet, zoom in and display its information
    document.addEventListener("click", (event) => {
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera );

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children, true );

        console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        if (intersects.length && intersects[0].object.name != "") { // if an object is intersepted by the click
            const planetRadius = intersects[0].object.geometry.parameters.radius;
            camera.position.x = intersects[0].object.position.x
            camera.position.y = intersects[0].object.position.y
            camera.position.z = intersects[0].object.position.z + planetRadius + 20
            console.log(intersects[0]);
            controls.target.set( // change camera perspective
                intersects[0].object.position.x, 
                intersects[0].object.position.y, 
                intersects[0].object.position.z
            );
                
            controls.update(); // update camera perspective 

            document.getElementById("showInfo-div").style.display = "block";
            document.getElementById("name").innerText = "Name: " + intersects[0].object.name;
            document.getElementById("diameter").innerText = "Diameter: " + intersects[0].object.diameter + " km";
            document.getElementById("dayTime").innerText = "Day time: " + intersects[0].object.dayTime + " hours";
            document.getElementById("orbitalPeriod").innerText = "Orbital period: " + intersects[0].object.orbitalPeriod + " days";
            document.getElementById("temperature").innerText = "Avg. Temperature: " + intersects[0].object.temperature + " °C";
        }
        else { // if not, hide showInfo div
            document.getElementById("showInfo-div").style.display = "none";
        }
    })
}

function moonOrbit(moonMesh, distanceToPlanet, planetMesh, delta) {
    moonMesh.position.z = (distanceToPlanet + 2) * Math.sin(delta) + planetMesh.position.z;
    moonMesh.position.x = (distanceToPlanet + 2) * Math.cos(delta) + planetMesh.position.x;
}

function planetOrbit(initialPosition, planetMesh, distanceToSun, delta) {
    planetMesh.position.z = (distanceToSun) * Math.sin(initialPosition + delta);
    planetMesh.position.x = (distanceToSun) * Math.cos(initialPosition + delta);
}

astroWorld();