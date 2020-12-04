import * as THREE from "../../lib/three/three.js-dev/build/three.module.js";
export let terrainMesh_MAIN;
export let terrainRB_MAIN;
const margin = 0.05;
let values = {
    posistion: {x:50, y:-15, z:-50},
    scale: {x:1000, y:2, z:1000},
    quat: {x:0, y:0, z:0,w:1},
    mass: 0,
    frictions: 0.9,
    restitution: 0.8
}
export function createMainTerrain(){
createTerrain(values)
}
function createTerrain(values){
    //Position
    const posX = values.posistion.x;
    const posY = values.posistion.y;
    const posZ = values.posistion.z;
    //Scale
    const scaleX = values.scale.x;
    const scaleY = values.scale.y;
    const scaleZ = values.scale.z;
    //Rotations
    const quatX = values.quat.x;
    const quatY = values.quat.y;
    const quatZ = values.quat.z;
    const quatW = values.quat.w;
    //Physics Info
    const MASS = values.mass;
    const FRICTION = values.frictions;
    const RESTITUTION = values.restitution;

    //Mesh
    let terrainGeometry = new THREE.BoxBufferGeometry( scaleX, scaleY,scaleZ);
    let groundMaterial = new THREE.MeshPhongMaterial( { color: 0xC709C7, side: THREE.DoubleSide } );
    terrainMesh_MAIN = new THREE.Mesh( terrainGeometry, groundMaterial );
    terrainMesh_MAIN.receiveShadow = true;
    terrainMesh_MAIN = new THREE.Mesh( terrainGeometry, groundMaterial );

    //Ammo
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( posX, posY, posZ ) );
    transform.setRotation( new Ammo.btQuaternion( quatX, quatY, quatZ, quatW ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let terrainShape = new Ammo.btBoxShape( new Ammo.btVector3( scaleX * 0.5, scaleY * 0.5, scaleZ * 0.5 ) );
    terrainShape.setMargin( margin );
    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    terrainShape.calculateLocalInertia( MASS, localInertia );
    let rbInfo = new Ammo.btRigidBodyConstructionInfo( MASS, motionState, terrainShape, localInertia );

    terrainRB_MAIN = new Ammo.btRigidBody( rbInfo );
    terrainRB_MAIN.setRestitution(RESTITUTION);
    terrainRB_MAIN.setFriction(FRICTION);
    terrainMesh_MAIN.userData.physicsBody = terrainRB_MAIN;
}