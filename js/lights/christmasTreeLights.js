import * as THREE from "../../lib/three/three.js-dev/build/three.module.js";
export let cLight1, cLight2, cLight3, cLight4, cLight5, cLight6,cLight7,cLight8,cLight9;



const intensity = 25.5;
const distance = 1000;
const decay = 2.0;
const c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
const sphere = new THREE.SphereBufferGeometry( 0.55, 16, 8 );

export function createChristmasLights(){
    createIt();
}

 function createIt(){


    cLight1 = new THREE.PointLight( c1, intensity, distance, decay );
    cLight1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );


    cLight2 = new THREE.PointLight( c2, intensity, distance, decay );
    cLight2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );


    cLight3 = new THREE.PointLight( c3, intensity, distance, decay );
    cLight3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );


    cLight4 = new THREE.PointLight( c4, intensity, distance, decay );
    cLight4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );


    cLight5 = new THREE.PointLight( c5, intensity, distance, decay );
    cLight5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );


    cLight6 = new THREE.PointLight( c6, intensity, distance, decay );
    cLight6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );

     cLight7 = new THREE.PointLight( c4, intensity, distance, decay );
     cLight7.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );


     cLight8 = new THREE.PointLight( c5, intensity, distance, decay );
     cLight8.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );


     cLight9 = new THREE.PointLight( c6, intensity, distance, decay );
     cLight9.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );

}