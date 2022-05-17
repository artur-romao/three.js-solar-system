export default class Planet {
    constructor(radius, positionX, textureFile, dayTime, orbitalPeriod, temperature) {
      this.radius = radius;
      this.positionX = positionX;
      this.textureFile = textureFile;
      this.dayTime = dayTime;
      this.orbitalPeriod = orbitalPeriod;
      this.temperature = temperature;
    }
  
    getMesh() {
      if (this.mesh === undefined || this.mesh === null) {
        const geometry = new THREE.SphereGeometry(this.radius);
        const texture = new THREE.TextureLoader().load(this.textureFile);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x += this.positionX;
      }
      return this.mesh;
    }

    getOrbit() {
      const geometry = new THREE.TorusGeometry(this.positionX, 0.1, 10, 100);
      const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      const mesh = new THREE.Mesh(geometry, material);
      mesh.material.side = THREE.DoubleSide;
      mesh.rotation.x = Math.PI / 2; // otherwise the orbit was displayed vertically
      return mesh;
    }
  }