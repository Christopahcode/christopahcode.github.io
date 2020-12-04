import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";

export let ball_MeshArray = [];
export let ball_RBArray = [];
let ballMesh;
let ballRB;

let bigBlockBallValues;
let rolingAlongTheWallFromDominosBallValues;
let ballSmash01;
let ballSmash02;

export function createBalls(){
    initValues();
    createIt(bigBlockBallValues);
    createIt(rolingAlongTheWallFromDominosBallValues);
    createIt(ballSmash01);
    createIt(ballSmash02);
}
function initValues(){
    initValues_TheRollingFromBigBlockBall();
    initValues_BallThatRollsAlongTheWall();
    initValues_ballSmash01();
    initValues_ballSmash02();
}
function initValues_TheRollingFromBigBlockBall(){
    bigBlockBallValues  = {
        posistion: {x:62, y:10, z:-60},
        radius: 6,
        quat: {x:0, y:0, z:0,w:1},
        mass: 1,
        frictions: 0,
        restitution: 0
    }
}
function initValues_BallThatRollsAlongTheWall(){
    rolingAlongTheWallFromDominosBallValues  = {
        posistion: {x:-16, y:-13, z:75},
        radius: 2,
        quat: {x:0, y:0, z:0,w:1},
        mass: .01,
        frictions: 0,
        restitution: 0
    }
}
function initValues_ballSmash01(){
    ballSmash01  = {
        posistion: {x:39, y:-13, z:177},
        radius: 3,
        quat: {x:0, y:0, z:0,w:1},
        mass: .001,
        frictions: 0,
        restitution: 0
    }
}
function initValues_ballSmash02(){
    ballSmash02  = {
        posistion: {x:37.5, y:-2, z:182},
        radius: 3,
        quat: {x:0, y:0, z:0,w:1},
        mass: .00001,
        frictions: 0,
        restitution: 0
    }
}
function createIt(values){
    //Position
    let posX = values.posistion.x;
    let posY = values.posistion.y;
    let posZ = values.posistion.z;
    //Radius
    const radius = values.radius;
    //Rotations
    const quatX = values.quat.x;
    const quatY = values.quat.y;
    const quatZ = values.quat.z;
    const quatW = values.quat.w;
    //Mass
    const MASS = values.mass;

    ballMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0x00ff08}));
    ballMesh.position.set(posX, posY, posZ);
    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;

    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( posX, posY, posZ ) );
    transform.setRotation( new Ammo.btQuaternion( quatX, quatY, quatZ, quatW));
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btSphereShape( radius );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( MASS, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( MASS, motionState, colShape, localInertia );
    ballRB = new Ammo.btRigidBody( rbInfo );

    ballMesh.userData.physicsBody = ballRB;
    ball_MeshArray.push(ballMesh);
    ball_RBArray.push(ballRB);
}
