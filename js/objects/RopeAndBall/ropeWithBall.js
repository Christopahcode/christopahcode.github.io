import * as THREE from "../../../lib/three/three.js-dev/build/three.module.js";

export let rope;
export let armMovement = 0;
export let threeObjectArray = [];
export let threeObjectRBArray = [];
export let softBodyHelpers;
export let ropeStart;
export let ropeEnd;
export let ball;
export let arm;
export let pylon;
export let  pivotA;
export let pivotB;
export let axis;
export let MASS_ROPE;


let valuesRopeAndBall;
const margin = 0.05;

export function createRopeWithBall(){
    initValues();
    createIt(valuesRopeAndBall);
}
function initValues(){
    initValuesRopeAndBall();
}
function initValuesRopeAndBall(){
    valuesRopeAndBall = {
        posistion: {x:50, y:-15, z:-50},
        ballMass: 1.2,
        ropeMass:3,
        armMass:2,
        frictions: 0.5,
        restitution: 0.8,
        ballRadius: 5
    }
}


function createIt(values) {
    let scale = 5;
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    //Position
    let posX = values.posistion.x;
    let posY = values.posistion.y;
    let posZ = values.posistion.z;

    //Physics Info
    let MASS_BALL = values.ballMass;
     MASS_ROPE = values.ropeMass;
    let FRICTION = values.frictions;
    let RESTITUTION = values.restitution;
    let BALL_RADIUS = values.ballRadius;







     ball = new THREE.Mesh( new THREE.SphereBufferGeometry( BALL_RADIUS, 20, 20 ), new THREE.MeshPhongMaterial( { color: 0x202020 } ) );
    ball.castShadow = true;
    ball.receiveShadow = true;
    const ballShape = new Ammo.btSphereShape( BALL_RADIUS );
    ballShape.setMargin( margin );
    pos.set( 80, 0, -80 );
    quat.set( 0, 0, 5, 1 );
    createRigidBody( ball, ballShape, MASS_BALL, pos, quat );
    ball.userData.physicsBody.setFriction( FRICTION );


    // The rope
    // Rope graphic object
    const ropeNumSegments = 10;
    const ropeLength = 4 * scale;

    const ropePos = ball.position.clone();
    ropePos.y += BALL_RADIUS;

    const segmentLength = ropeLength / ropeNumSegments;
    const ropeGeometry = new THREE.BufferGeometry();
    const ropeMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
    const ropePositions = [];
    const ropeIndices = [];

    for ( let i = 0; i < ropeNumSegments + 1; i ++ ) {

        ropePositions.push( ropePos.x, ropePos.y + i * segmentLength, ropePos.z );

    }

    for ( let i = 0; i < ropeNumSegments; i ++ ) {

        ropeIndices.push( i, i + 1 );

    }

    ropeGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( ropeIndices ), 1 ) );
    ropeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( ropePositions ), 3 ) );
    ropeGeometry.computeBoundingSphere();
    rope = new THREE.LineSegments( ropeGeometry, ropeMaterial );
    rope.castShadow = true;
    rope.receiveShadow = true;
    //scene.add( rope );

    // Rope physic object
     softBodyHelpers = new Ammo.btSoftBodyHelpers();
     ropeStart = new Ammo.btVector3( ropePos.x, ropePos.y, ropePos.z );
     ropeEnd = new Ammo.btVector3( ropePos.x , ropePos.y + ropeLength, ropePos.z );

/*    const ropeSoftBody = softBodyHelpers.CreateRope( physicsWorld.getWorldInfo(), ropeStart, ropeEnd, ropeNumSegments - 1, 0 );
    const sbConfig = ropeSoftBody.get_m_cfg();
    sbConfig.set_viterations( 10 );
    sbConfig.set_piterations( 10 );
    ropeSoftBody.setTotalMass( MASS_ROPE, false );
    Ammo.castObject( ropeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin * 3 );
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




     //physicsWorld.addSoftBody( ropeSoftBody, 1, - 1 );

    rope.userData.physicsBody = ropeSoftBody;
    // Disable deactivation
    ropeSoftBody.setActivationState( 4 );

 */

    // The base
    const armMass = 2;
    const armLength = 10;
    const pylonHeight = ropePos.y + ropeLength;
    const baseMaterial = new THREE.MeshPhongMaterial( { color: 0x606060 } );
    pos.set( ropePos.x, 0.1, ropePos.z - armLength );
    quat.set( 0, 0, 0, 1 );
    const base = createParalellepiped( 1 *scale, 0.2 * scale, 1 * scale, 0, pos, quat, baseMaterial );
    base.castShadow = true;
    base.receiveShadow = true;
    pos.set( ropePos.x, 0.5 * pylonHeight, ropePos.z - armLength );
     pylon = createParalellepiped( 0.4 * scale, pylonHeight * scale , 0.4 * scale, 0, pos, quat, baseMaterial );
    pylon.castShadow = true;
    pylon.receiveShadow = true;
    pos.set( ropePos.x, pylonHeight + 0.2 , ropePos.z - 0.5 * armLength );
     arm = createParalellepiped( 0.4* scale, 0.4 * scale , armLength + 0.4 * scale, armMass, pos, quat , baseMaterial );
    arm.castShadow = true;
    arm.receiveShadow = true;

    // Glue the rope extremes to the ball and the arm
  /*  const influence = 1;
    ropeSoftBody.appendAnchor( 0, ball.userData.physicsBody, true, influence );
    ropeSoftBody.appendAnchor( ropeNumSegments, arm.userData.physicsBody, true, influence );
*/
    // Hinge constraint to move the arm
     pivotA = new Ammo.btVector3( 0, pylonHeight * 0.5, 0 );
     pivotB = new Ammo.btVector3( 0, - 0.2, - armLength * 0.5 );
     axis = new Ammo.btVector3( 0, 1, 0 );
//    hinge = new Ammo.btHingeConstraint( pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true );
   // physicsWorld.addConstraint( hinge, true );


}

function createParalellepiped( sx, sy, sz, mass, pos, quat, material ) {

    const threeObject = new THREE.Mesh( new THREE.BoxBufferGeometry( sx, sy, sz, 1, 1, 1 ), material );
    const shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
    shape.setMargin( margin );

    createRigidBody( threeObject, shape, mass, pos, quat );

    return threeObject;

}

function createRigidBody( threeObject, physicsShape, mass, pos, quat ) {

    threeObject.position.copy( pos );
    threeObject.quaternion.copy( quat );

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    const motionState = new Ammo.btDefaultMotionState( transform );

    const localInertia = new Ammo.btVector3( 0, 0, 0 );
    physicsShape.calculateLocalInertia( mass, localInertia );

    const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
    const body = new Ammo.btRigidBody( rbInfo );

    threeObject.userData.physicsBody = body;

  //  scene.add( threeObject );

    if ( mass > 0 ) {

        //   rigidBodies.push( threeObject );

      //  dynamicObjects.push(threeObject);
        threeObjectArray.push(threeObject);
        // Disable deactivation
        body.setActivationState( 4 );

    }

    //physicsWorld.addRigidBody( body );
    threeObjectRBArray.push(body);

}

function createRandomColor() {

    return Math.floor( Math.random() * ( 1 << 24 ) );

}

function createMaterial() {

    return new THREE.MeshPhongMaterial( { color: createRandomColor() } );

}
