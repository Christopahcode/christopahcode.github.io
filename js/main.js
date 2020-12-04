//IMPORTS
import * as THREE from "../lib/three/three.js-dev/build/three.module.js";
import { OrbitControls } from '../lib/three/three.js-dev/examples/jsm/controls/OrbitControls.js';
import Stats from '../lib/stats/build/stats.module.js';
import {terrainMesh,groundBody,createTerrainSmall_HEIGHTMAP} from "./terrains/terrainSmall_HEIGHTMAP.js";
import{terrainMesh_MAIN,terrainRB_MAIN,createMainTerrain} from "./terrains/mainGround.js";
import {light1,light2,light3,light4,light5,light6,createLight} from "./lights/mainLights.js";
import {cLight1, cLight2, cLight3, cLight4, cLight5, cLight6, cLight7, cLight8, cLight9, createChristmasLights} from "./lights/christmasTreeLights.js";
import{rbCompound,compoundMesh,createDumbell} from "./objects/Dumbell/dumbell.js";
import {domino_MeshArray,domino_RBArray,createDominoSteps} from "./objects/Domino/dominos.js";
import {boxMesh,boxRB,createBox} from "./objects/RotatedMeshBox/theRotatedBoxWhereTheBallRollsDownFrom.js";
import {ball_MeshArray,ball_RBArray,createBalls} from "./objects/Balls/myBalls.js";
import {tree,createTree} from "./objects/ChristmasTree/christmasTree.js";
import {rope,threeObjectArray,threeObjectRBArray,softBodyHelpers,ropeStart,ropeEnd,ball,arm,pylon,pivotA,pivotB,axis,MASS_ROPE,createRopeWithBall} from "./objects/RopeAndBall/ropeWithBall.js";
// THREE
let stats;
let camera,controls, scene, renderer;
let clock = new THREE.Clock();
// AMMO
let collisionConfiguration;
let dispatcher;
let broadphase;
let solver;
let physicsWorld;
let dynamicObjects = [];
let transformAux1;
let softBodySolver;
let hinge;
let armMovement = 0;
const margin = 0.05;
const gravityConstant = - 9.8;
//Other
let time = 0;
let container;
let i;
let isDone = false;
export function start() {
    i = 0;
    createLight();
    createChristmasLights();
    createMainTerrain();
    createTerrainSmall_HEIGHTMAP();
    createDumbell();
    createDominoSteps();
    createRopeWithBall();
    createBox();
    createBalls();
    createTree();
    init();
    addContent();
    animate();
}
function init() {
    initGraphics();
    initPhysics();
}
function initGraphics() {
    initScene();
    initLights();
    initCamera();
    initRenderer();
    initStats();
    initContainer();
    initControls();
    window.addEventListener( 'resize', onWindowResize, false );
}
function addContent(){
    //(terrains/terrainSmall_HEIGHTMAP.js) and (terrains/mainground.js)
    addTerrains();
    //(objects/Dumbell/dumbell.js)
    addTheDumbell();
    //(objects/Domino/dominos.js)
    addAllTheDominos();
    //(objects/RopeAndBall/ropeWithBall.js)
    addTheRopeWithBallAttached();
    //(objects/RotatedMeshBox/theRotatedBoxWhereTheBallRollsDownFrom.js)
    addTheBoxWhereTheBallRollsDownFrom();
    //(objects/Balls/myBalls.js
    addAllTheBalls();
    //(objects/ChristmasTree/christmasTree.js
    addTheChristmasTree();
}
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}
function render() {
    var deltaTime = clock.getDelta();
    renderPointLightPositions();
    updatePhysics( deltaTime );
    controls.update( deltaTime );
    renderer.render( scene, camera );
    time += deltaTime;

    if (time > 41){
        rotate();        //Rotates the ball with the rope
    }
    if (time > 142){
        isDone = true;  //Lights will form a star, and new lights will move to the christmas tree
    }
}
function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x040306 );
    scene.fog = new THREE.Fog( 0x040306, 10, 300 );
}
function initLights(){
    scene.add(light1);/*(lights/mainLights.js)*/
    scene.add(light2);/*(lights/mainLights.js)*/
    scene.add(light3);/*(lights/mainLights.js)*/
    scene.add(light4);/*(lights/mainLights.js)*/
    scene.add(light5);/*(lights/mainLights.js)*/
    scene.add(light6);/*(lights/mainLights.js)*/
}
function initCamera(){
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.x = -150;
    camera.position.z = -150;
    camera.position.y = 40;
    scene.add(camera);
}
function initRenderer(){
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
}
function initStats(){
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
}
function initContainer(){
    container = document.getElementById( 'container' );
    container.innerHTML = "";
    container.appendChild( renderer.domElement );
    container.appendChild( stats.domElement );
}
function initControls(){
    controls = new OrbitControls( camera, renderer.domElement );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function initPhysics() {
    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    broadphase = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    softBodySolver = new Ammo.btDefaultSoftBodySolver();
    physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration,softBodySolver );
    physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
    physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
    transformAux1 = new Ammo.btTransform();
}
function updatePhysics( deltaTime ) {
    physicsWorld.stepSimulation( deltaTime, 10 );
    updateRopeWithBall();
    for ( var i = 0, il = dynamicObjects.length; i < il; i++ ) {
        var objThree = dynamicObjects[ i ];
        var objPhys = objThree.userData.physicsBody;
        var ms = objPhys.getMotionState();
        if ( ms ) {
            ms.getWorldTransform( transformAux1 );
            var p = transformAux1.getOrigin();
            var q = transformAux1.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
        }
    }
}
function addTerrains(){
    //Main terrain, "big pink floor" (terrains/mainGround.js)
    physicsWorld.addRigidBody(terrainRB_MAIN);
    dynamicObjects.push(terrainMesh_MAIN);
    scene.add(terrainMesh_MAIN);
    //HeigtMap (terrains/terrainSmall_HEIGHTMAP.js)
    scene.add( terrainMesh );
    physicsWorld.addRigidBody( groundBody);
}
function addTheDumbell(){
    physicsWorld.addRigidBody(rbCompound);
    dynamicObjects.push(compoundMesh);
    scene.add(compoundMesh);
}
function addAllTheDominos(){
    for (  i = 0; i < domino_RBArray.length; i++){
        physicsWorld.addRigidBody(domino_RBArray[i]);
    }
    for (   i = 0; i < domino_MeshArray.length;i++){
        dynamicObjects.push(domino_MeshArray[i]);
        scene.add(domino_MeshArray[i]);
    }
}
function addTheRopeWithBallAttached(){
    scene.add(rope);
    let ropeSoftBody = softBodyHelpers.CreateRope( physicsWorld.getWorldInfo(), ropeStart, ropeEnd, 10 - 1, 0 );
    const sbConfig = ropeSoftBody.get_m_cfg();
    sbConfig.set_viterations( 10 );
    sbConfig.set_piterations( 10 );
    ropeSoftBody.setTotalMass( MASS_ROPE, false );
    Ammo.castObject( ropeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin * 3 );
    const influence = 1;
    ropeSoftBody.appendAnchor( 0, ball.userData.physicsBody, true, influence );
    ropeSoftBody.appendAnchor( 10, arm.userData.physicsBody, true, influence );
    physicsWorld.addSoftBody( ropeSoftBody, 1, - 1 );
    rope.userData.physicsBody = ropeSoftBody;
    ropeSoftBody.setActivationState( 4 );
    hinge = new Ammo.btHingeConstraint( pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true );
    physicsWorld.addConstraint( hinge, true );
    for ( i = 0; i < threeObjectArray.length; i++){
        scene.add(threeObjectArray[i]);
        dynamicObjects.push(threeObjectArray[i]);
    }
    for ( i = 0; i < threeObjectRBArray.length;i++){
        physicsWorld.addRigidBody( threeObjectRBArray[i] );
    }
}
function addTheBoxWhereTheBallRollsDownFrom(){
    physicsWorld.addRigidBody(boxRB);
    scene.add(boxMesh);
}
function addAllTheBalls(){
    for (  i = 0; i < ball_RBArray.length; i++){
        physicsWorld.addRigidBody(ball_RBArray[i]);
    }
    for (   i = 0; i < ball_MeshArray.length;i++){
        dynamicObjects.push(ball_MeshArray[i]);
        scene.add(ball_MeshArray[i]);
    }
}
function addTheChristmasTree(){
    scene.add(tree);
}
function updateRopeWithBall(){
    hinge.enableAngularMotor( true, -1.5 * armMovement, 50 );
    // Update rope
    const softBody = rope.userData.physicsBody;
    const ropePositions = rope.geometry.attributes.position.array;
    const numVerts = ropePositions.length / 3;
    const nodes = softBody.get_m_nodes();
    let indexFloat = 0;
    for ( let i = 0; i < numVerts; i ++ ) {

        const node = nodes.at( i );
        const nodePos = node.get_m_x();
        ropePositions[ indexFloat ++ ] = nodePos.x();
        ropePositions[ indexFloat ++ ] = nodePos.y();
        ropePositions[ indexFloat ++ ] = nodePos.z();

    }
    rope.geometry.attributes.position.needsUpdate = true;
}
function renderPointLightPositions(){
    const d = 150;


    if (!isDone){
        //light1(lights/mainLights.js)
        light1.position.x = Math.sin( time * 0.7 ) * d;
        light1.position.z = Math.cos( time * 0.3 ) * d;
        //light2(lights/mainLights.js)
        light2.position.x = Math.cos( time * 0.3 ) * d;
        light2.position.z = Math.sin( time * 0.7 ) * d;
        //light3(lights/mainLights.js)
        light3.position.x = Math.sin( time * 0.7 ) * d;
        light3.position.z = Math.sin( time * 0.5 ) * d;
        //light4(lights/mainLights.js)
        light4.position.x = Math.sin( time * 0.3 ) * d;
        light4.position.z = Math.sin( time * 0.5 ) * d;
        //light5(lights/mainLights.js)
        light5.position.x = Math.cos( time * 0.3 ) * d;
        light5.position.z = Math.sin( time * 0.5 ) * d;
        //light6(lights/mainLights.js)
        light6.position.x = Math.cos( time * 0.7 ) * d;
        light6.position.z = Math.cos( time * 0.5 ) * d;
    }else{
        lightMoveToTreeAndFormAStar();
    }

}

function lightMoveToTreeAndFormAStar(){
    const heightValue = 90;
    const treePosX = 40;
    const treePosY = -13;
    const treePosZ = -160;

    const vecLight1 = new THREE.Vector3(treePosX , treePosY + heightValue - 10, treePosZ);
    const vecLight2 = new THREE.Vector3(treePosX, treePosY + heightValue -5, treePosZ -5);
    const vecLight3 = new THREE.Vector3(treePosX, treePosY + heightValue -5, treePosZ +5 );
    const vecLight4 = new THREE.Vector3(treePosX +5, treePosY + heightValue -5, treePosZ);
    const vecLight5 = new THREE.Vector3(treePosX-5, treePosY + heightValue -5, treePosZ);
    const vecLight6 = new THREE.Vector3(treePosX, treePosY + heightValue, treePosZ);

    const alpha = .01;
    light1.position.lerp(vecLight1, alpha);
    light2.position.lerp(vecLight2, alpha);
    light3.position.lerp(vecLight3, alpha);
    light4.position.lerp(vecLight4, alpha);
    light5.position.lerp(vecLight5, alpha);
    light6.position.lerp(vecLight6, alpha);

    addChristmasLights();

}
function addChristmasLights(){
    const heightValue = 90;
    const treePosX = 40;
    const treePosY = -13;
    const treePosZ = -160;

    scene.add(cLight1);
    scene.add(cLight2);
    scene.add(cLight3);
    scene.add(cLight4);
    scene.add(cLight5);
    scene.add(cLight6);
    scene.add(cLight7);
    scene.add(cLight8);
    scene.add(cLight9);

    const cVecLight1 = new THREE.Vector3(treePosX , treePosY + heightValue - 20, treePosZ +5);
    const cVecLight2 = new THREE.Vector3(treePosX, treePosY + heightValue -20, treePosZ -5);
    const cVecLight3 = new THREE.Vector3(treePosX -5, treePosY + heightValue -20, treePosZ  );

    const cVecLight4 = new THREE.Vector3(treePosX -9, treePosY + heightValue -40, treePosZ);
    const cVecLight5 = new THREE.Vector3(treePosX, treePosY + heightValue -40, treePosZ +10);
    const cVecLight6 = new THREE.Vector3(treePosX, treePosY + heightValue -40, treePosZ -10);

    const cVecLight7 = new THREE.Vector3(treePosX -12, treePosY + heightValue -60, treePosZ);
    const cVecLight8 = new THREE.Vector3(treePosX, treePosY + heightValue - 60, treePosZ +13);
    const cVecLight9 = new THREE.Vector3(treePosX, treePosY + heightValue - 60, treePosZ -13);

    const alpha = .01;
    cLight1.position.lerp(cVecLight1, alpha);
    cLight2.position.lerp(cVecLight2, alpha);
    cLight3.position.lerp(cVecLight3, alpha);
    cLight4.position.lerp(cVecLight4, alpha);
    cLight5.position.lerp(cVecLight5, alpha);
    cLight6.position.lerp(cVecLight6, alpha);
    cLight7.position.lerp(cVecLight7, alpha);
    cLight8.position.lerp(cVecLight8, alpha);
    cLight9.position.lerp(cVecLight9, alpha);

}

function rotate(){
    armMovement = 1;
}
function stopRotate(){
    armMovement = 0;
}













