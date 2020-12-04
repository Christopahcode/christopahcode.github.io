import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";
export let domino_MeshArray = [];
export let domino_RBArray = [];
let domino_Mesh;
let domino_RB;

let wallToStopBall;
let valuesStep1;
let valuesStep2;
let valuesStep3;
let valuesStep5;
let valuesStep6;
let valuesStep7;
let valuesStep8;
let valuesStep9;
let valuesStep10;
let valuesStep11;
let valuesStep13;
let valuesStep14;
let valuesStep15;
let valuesStep16;
export function createDominoSteps(){
   initValues();
    createDominos(wallToStopBall);
    createDominos(valuesStep1);
    createDominos(valuesStep2);
    createDominos(valuesStep3);
    createDominos(valuesStep5);
    createDominos(valuesStep6);
    createDominos(valuesStep7);
    createDominos(valuesStep8);
    createDominos(valuesStep9);
    createDominos(valuesStep10);
    createDominos(valuesStep11);
    createDominos(valuesStep13);
    createDominos(valuesStep14);
    createDominos(valuesStep15);
    createDominos(valuesStep16);
}
function initValues(){
    initValues_WallToStopTheBall();
    initValues_Step1();
    initValues_Step2();
    initValues_Step3();
    initValues_Step5();
    initValues_Step6();
    initValues_Step7();
    initValues_Step8();
    initValues_Step9();
    initValues_Step10();
    initValues_Step11();
    initValues_Step13();
    initValues_Step14();
    initValues_Step15();
    initValues_Step16();
}
function initValues_WallToStopTheBall(){
    wallToStopBall  = {
        posistion: {x:55, y:18, z:-75},
        scale: {x:20, y:20, z:1},
        quat: {x:0, y:.2, z:.1,w:1},
        mass: 0,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 1,
        placeObjectPosition: {x:0,y:0,z:32},
        groundMaterial : new THREE.MeshPhongMaterial({
            color: 0xa4a400,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        })
    }
}
function initValues_Step5(){
    valuesStep5  = {
        posistion: {x:57, y:10, z:-60},
        scale: {x:2, y:2, z:1},
        quat: {x:0, y:0, z:0,w:1},
        mass: 0,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 1,
        placeObjectPosition: {x:-2,y:0,z:-2},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0xff2500, side: THREE.DoubleSide } )
    }
}
function initValues_Step13(){
    valuesStep13  = {
        posistion: {x:40, y:-13, z:100},
        scale: {x:200, y:20, z:1},
        quat: {x:0, y:1, z:0,w:1},
        mass: 0,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 1,
        placeObjectPosition: {x:0,y:0,z:32},
        groundMaterial : new THREE.MeshPhongMaterial({
            color: 0xff2500,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        })
    }
}
//Height box with ball on top
function initValues_Step14(){
    valuesStep14  = {
        posistion: {x:37.5, y:-4, z:182},
        scale: {x:4, y:4, z:1},
        quat: {x:1, y:0, z:0,w:1},
        mass: 0,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 2,
        placeObjectPosition: {x:0,y:0,z:7},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step1(){
    valuesStep1  = {
        posistion: {x:-23.86020851135254, y:-11.500057220458984, z:-106.82605743408203},
        scale: {x:10, y:20, z:1},
        quat: {x:0, y:3, z:0,w:1},
        mass: 1,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 10,
        placeObjectPosition: {x:0,y:0,z:-10},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step2(){
    valuesStep2  = {
        posistion: {x:70, y:-11.500057220458984, z:-200.82605743408203},
        scale: {x:10, y:20, z:1},
        quat: {x:0, y:1.5, z:0,w:1},
        mass: 1,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 10,
        placeObjectPosition: {x:-10,y:0,z:0},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step3(){
    valuesStep3  = {
        posistion: {x:80.86020851135254, y:-11.500057220458984, z:-200.82605743408203},
        scale: {x:10, y:20, z:1},
        quat: {x:0, y:-3, z:0,w:1},
        mass: 1,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 10,
        placeObjectPosition: {x:0,y:0,z:8},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )

    }
}

function initValues_Step6(){
    valuesStep6  = {
        posistion: {x:-60, y:-10, z:-80},
        scale: {x:100, y:20, z:1},
        quat: {x:0, y:1, z:0,w:1},
        mass: 1,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 1,
        placeObjectPosition: {x:-2,y:0,z:-2},
        groundMaterial : new THREE.MeshPhongMaterial({
            color: 0xC709C7,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        })
     //FFC0CB
    }
}
function initValues_Step7(){
    valuesStep7  = {
        posistion: {x:-59, y:-13, z:30},
        scale: {x:2, y:5, z:1},
        quat: {x:0, y:0, z:0,w:1},
        mass: .1,
        frictions: 0.3,
        restitution: 0.3,
        howMany: 20,
        placeObjectPosition: {x:0,y:0,z:-3},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step8(){
    valuesStep8  = {
        posistion: {x:-58, y:-13, z:32},
        scale: {x:2, y:6, z:1},
        quat: {x:0, y:.2, z:0,w:1},
        mass: .1,
        frictions: 0.3,
        restitution: 0.3,
        howMany: 20,
        placeObjectPosition: {x:2,y:0,z:2},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step9(){
    valuesStep9   = {
        posistion: {x:-60, y:-13, z:34},
        scale: {x:2, y:5, z:1},
        quat: {x:0, y:-.2, z:0,w:1},
        mass: .1,
        frictions: 0.3,
        restitution: 0.3,
        howMany: 20,
        placeObjectPosition: {x:-1,y:0,z:2},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step10(){
    valuesStep10   = {
        posistion: {x:-78, y:-13, z:74},
        scale: {x:2, y:5, z:1},
        quat: {x:0, y:.2, z:0,w:1},
        mass: .1,
        frictions: 0.3,
        restitution: 0.3,
        howMany: 54,
        placeObjectPosition: {x:2,y:0,z:2},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step11(){
    valuesStep11  = {
        posistion: {x:39, y:-13, z:186},
        scale: {x:5, y:20, z:1},
        quat: {x:0, y:0, z:0,w:1},
        mass: .0001,
        frictions: 0.7,
        restitution: 0,
        howMany: 1,
        placeObjectPosition: {x:0,y:0,z:32},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step15(){
    valuesStep15  = {
        //  let pos = {x: 39, y: -13, z: 177};
        posistion: {x:37, y:-13, z:58},
        scale: {x:4, y:4, z:1},
        quat: {x:0, y:0, z:0,w:1},
        mass: .00001,
        frictions: 0.3,
        restitution: 0.3,
        howMany: 70,
        placeObjectPosition: {x:0,y:0,z:-3},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function initValues_Step16(){
    valuesStep16  = {
        //  let pos = {x: 39, y: -13, z: 177};
        posistion: {x:6, y:-13, z:58},
        scale: {x:65, y:4, z:1},
        quat: {x:0, y:0, z:0,w:1},
        mass: .00001,
        frictions: 0.9,
        restitution: 0.8,
        howMany: 1,
        placeObjectPosition: {x:0,y:0,z:-3},
        groundMaterial : new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } )
    }
}
function createDominos(values){
    let howMany = values.howMany;
    //Position
    let posX = values.posistion.x;
    let posY = values.posistion.y;
    let posZ = values.posistion.z;
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
    //Material
    const material = values.groundMaterial;

    for (var i = 0; i < howMany; i++){
        let terrainGeometry = new THREE.BoxBufferGeometry( scaleX, scaleY,scaleZ);
      //  let groundMaterial = new THREE.MeshPhongMaterial( { color: 0x09F099, side: THREE.DoubleSide } );
        domino_Mesh = new THREE.Mesh( terrainGeometry, material );
        domino_Mesh.receiveShadow = true;

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( posX, posY, posZ ) );
        transform.setRotation( new Ammo.btQuaternion( quatX, quatY, quatZ, quatW ) );
        let motionState = new Ammo.btDefaultMotionState( transform );
        let terrainShape = new Ammo.btBoxShape( new Ammo.btVector3( scaleX * 0.5, scaleY * 0.5, scaleZ * 0.5 ) );
        terrainShape.setMargin( 0.05 );
        let localInertia = new Ammo.btVector3( 0, 0, 0 );
        terrainShape.calculateLocalInertia( MASS, localInertia );
        let rbInfo = new Ammo.btRigidBodyConstructionInfo( MASS, motionState, terrainShape, localInertia );

        domino_RB = new Ammo.btRigidBody( rbInfo );
        domino_RB.setRestitution(RESTITUTION);
        domino_RB.setFriction(FRICTION);

        domino_Mesh.userData.physicsBody = domino_RB;
        domino_MeshArray.push(domino_Mesh);
        domino_RBArray.push(domino_RB);

        posX+= values.placeObjectPosition.x;
        posY+= values.placeObjectPosition.y;
        posZ+= values.placeObjectPosition.z;


    }
}





