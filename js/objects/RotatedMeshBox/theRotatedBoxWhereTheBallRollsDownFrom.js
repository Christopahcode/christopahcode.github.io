import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";

export let boxMesh;
export let boxRB;

export function createBox(){
    var quaternion = new THREE.Quaternion(0, 0, 0, 1);
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, -1), -Math.PI / 18);
    createIt(new THREE.Vector3(20, 2, -60), quaternion, 90, 1, 30, 0);
}

function createIt(pos, quat, w, l, h, mass, friction) {
    let materialDynamic, materialStatic;
    materialDynamic = new THREE.MeshPhongMaterial({
        color: 0xC709C7,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide
    });
    materialStatic = new THREE.MeshPhongMaterial({
        color: 0xC709C7,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide
    });

    var material = mass > 0 ? materialDynamic : materialStatic;
    var shape = new THREE.BoxGeometry(w, l, h, 1, 1, 1);
    var geometry = new Ammo.btBoxShape(new Ammo.btVector3(w * 0.5, l * 0.5, h * 0.5));

    if(!mass) mass = 0;
    if(!friction) friction = 1;

    boxMesh = new THREE.Mesh(shape, material);
    boxMesh.position.copy(pos);
    boxMesh.quaternion.copy(quat);

    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    var motionState = new Ammo.btDefaultMotionState(transform);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    geometry.calculateLocalInertia(mass, localInertia);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, geometry, localInertia);
    boxRB = new Ammo.btRigidBody(rbInfo);
    boxRB.setFriction(friction);



}