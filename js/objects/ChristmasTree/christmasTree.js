import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";

export let tree;

export function createTree(){
    createIt();
}

function createIt() {

    tree = new THREE.Group();
    var trunkGeometry = new THREE.CylinderBufferGeometry(5, 10, 50);
    var trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x49311c });
    var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    tree.add(trunk);

    // leaves
    var leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x006400 });
    var leavesCone= new THREE.ConeBufferGeometry(20, 40, 6);
    var leavesBottom = new THREE.Mesh(leavesCone, leavesMaterial);
    leavesBottom.position.y = 35;
    tree.add(leavesBottom);

    var middleLeaveCone = new THREE.ConeBufferGeometry(15, 30, 6);
    var leavesMiddle = new THREE.Mesh(middleLeaveCone, leavesMaterial );
    leavesMiddle.position.y = 55;
    tree.add(leavesMiddle);

    var topLeaveCone = new THREE.ConeBufferGeometry(10, 20, 6);
    var leavesTop = new THREE.Mesh(topLeaveCone, leavesMaterial);
    leavesTop.position.y = 70;
    tree.add(leavesTop);

    tree.position.x = 40;
    tree.position.y = -13;
    tree.position.z = -160;

}