import * as THREE from "../../lib/three/three.js-dev/build/three.module.js";
export let light1, light2, light3, light4, light5, light6;

const intensity = 25.5;
const distance = 1000;
const decay = 2.0;
const c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
const sphere = new THREE.SphereBufferGeometry( 0.55, 16, 8 );

export function createLight(){


     light1 = new THREE.PointLight( c1, intensity, distance, decay );
     light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );


     light2 = new THREE.PointLight( c2, intensity, distance, decay );
     light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );


     light3 = new THREE.PointLight( c3, intensity, distance, decay );
     light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );


     light4 = new THREE.PointLight( c4, intensity, distance, decay );
     light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );


     light5 = new THREE.PointLight( c5, intensity, distance, decay );
     light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );


     light6 = new THREE.PointLight( c6, intensity, distance, decay );
     light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );

}