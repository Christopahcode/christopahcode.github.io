import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";
export let rbCompound;
export let compoundMesh;
let values = {
    posistion: {y:0},
    scale: {x:30, y:2, z:2},
    mass: 1,
    frictions: 0.3,
    restitution: 0.2
}
export function createDumbell() {
    createIt(values);
}
function createIt(values){
    //Position
    const posY = values.posistion.y;
    //Scale
    const scaleX = values.scale.x;
    const scaleY = values.scale.y;
    const scaleZ = values.scale.z;
    //Physics Info
    const MASS = values.mass;
    const FRICTION = values.frictions;
    const RESTITUTION = values.restitution;
    //Ammo
    let pRod = new Ammo.btBoxShape( new Ammo.btVector3( scaleX/2, scaleY/2, scaleZ/2) );
    let pLoadLeft = new Ammo.btSphereShape( 2.5 );
    let pLoadRight = new Ammo.btSphereShape( 2.5 );
    let pCompound = new Ammo.btCompoundShape();

    let trans1 = new Ammo.btTransform();
    trans1.setIdentity();
    trans1.setOrigin(new Ammo.btVector3(0, posY, 0));
    pCompound.addChildShape(trans1, pRod);

    let trans2 = new Ammo.btTransform();
    trans2.setIdentity();
    trans2.setOrigin(new Ammo.btVector3(-17.5, posY, 0));
    pCompound.addChildShape(trans2, pLoadLeft);

    let trans3 = new Ammo.btTransform();
    trans3.setIdentity();
    trans3.setOrigin(new Ammo.btVector3(17.5, posY, 0));
    pCompound.addChildShape(trans3, pLoadRight);

    let trans4 = new Ammo.btTransform();
    trans4.setIdentity();
    trans4.setOrigin(new Ammo.btVector3(-10, 20, -10));
    let motionState = new Ammo.btDefaultMotionState( trans4 );
    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    pCompound.calculateLocalInertia( MASS, localInertia );
    rbCompound = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(MASS, motionState, pCompound, localInertia));
    // rbCompound.setActivationState(4);
    rbCompound.setRestitution(RESTITUTION);
    rbCompound.setFriction(FRICTION);
    // THREE:
    // Rod:
    compoundMesh = new THREE.Group();
    let geometryRod = new THREE.BoxBufferGeometry( scaleX, scaleY, scaleZ);
    let meshRod = new THREE.Mesh(geometryRod, new THREE.MeshPhongMaterial({color: 0xf78a1d}));
    //let pRodTrans = new Ammo.btTransform();
    let originRod = trans1.getOrigin();
    let orientationRod = trans1.getRotation();
    console.log(originRod.y());
    meshRod.position.set(originRod.x(), originRod.y(), originRod.z());
    meshRod.setRotationFromQuaternion(new THREE.Quaternion(orientationRod.x(), orientationRod.y(), orientationRod.z(), orientationRod.w()));
    meshRod.castShadow = true;
    compoundMesh.add(meshRod);
    // Left bell:
    let leftBellMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(2.5, 32, 32), new THREE.MeshPhongMaterial({color: 0x09F099}));
    let originLeft = trans2.getOrigin();
    let orientationLeft = trans2.getRotation();
    console.log(originLeft.x());
    leftBellMesh.position.set(originLeft.x(), originLeft.y(), originLeft.z());
    leftBellMesh.setRotationFromQuaternion(new THREE.Quaternion(orientationLeft.x(), orientationLeft.y(), orientationLeft.z(), orientationLeft.w()));
    leftBellMesh.castShadow = true;
    compoundMesh.add(leftBellMesh);
    // Right bell:
    let rightBellMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(2.5, 32, 32), new THREE.MeshPhongMaterial({color: 0x09F099}));
    let originRight = trans3.getOrigin();
    console.log(originRight.x());
    let orientationRight = trans3.getRotation();
    rightBellMesh.position.set(originRight.x(), originRight.y(), originRight.z());
    rightBellMesh.setRotationFromQuaternion(new THREE.Quaternion(orientationRight.x(), orientationRight.y(), orientationRight.z(), orientationRight.w()));
    rightBellMesh.castShadow = true;
    compoundMesh.add(rightBellMesh);
    compoundMesh.userData.physicsBody = rbCompound;
}