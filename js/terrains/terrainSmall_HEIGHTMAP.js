//IMPORTS
import * as THREE from "../../lib/three/three.js-dev/build/three.module.js";
//Export varaibles sent to main.js
export let terrainMesh;
export let groundBody;
///////////////////////////////////
//Local data
let heightData = null;
let ammoHeightData = null;
let terrainWidth = 128;
let terrainDepth = 128;
let terrainMaxHeight = 8;
let terrainMinHeight = -20;
let terrainWidthExtents = 100;
let terrainDepthExtents = 100;
/////////////////////////////////
//Three
let geometry;
let vertices;
let groundMaterial;
let textureLoader;
let floorMat;
/////////////////////////////////
//Ammo
let groundShape;
let groundTransform;
let groundLocalInertia;
let groundMotionState;
let groundMass = 0;
///////////////////////////////////


export function createTerrainSmall_HEIGHTMAP(){
    heightData = generateHeight( terrainWidth, terrainDepth, terrainMinHeight, terrainMaxHeight );
    geometry = new THREE.PlaneBufferGeometry( 100, 100, terrainWidth - 1, terrainDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    vertices = geometry.attributes.position.array;
    for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
        // j + 1 because it is the y component that we modify
        vertices[ j + 1 ] = heightData[ i ];
    }
        geometry.computeVertexNormals();

 /*   floorMat = new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.7,
        bumpScale: 0.0005
    } );*/
   floorMat =  new THREE.MeshPhongMaterial({

       color: 0xff2500,
       opacity: 0.5,
       transparent: true,
       side: THREE.DoubleSide
   })
    terrainMesh = new THREE.Mesh( geometry, floorMat );

      loadTexture();
      groundShape = createTerrainShape( heightData );

     groundTransform = new Ammo.btTransform();
     groundTransform.setIdentity();
     // Shifts the terrain, since bullet re-centers it on its bounding box.
     groundTransform.setOrigin( new Ammo.btVector3( 0, ( terrainMaxHeight + terrainMinHeight ) / 2 , 0 ) );
     groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
     groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
     groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
     terrainMesh.userData.physicsBody = groundBody;

}

function generateHeight( width, depth, minHeight, maxHeight ) {
    // Generates the height data (a sinus wave)
    var size = width * depth;
    var data = new Float32Array( size );
    var hRange = maxHeight - minHeight;
    var w2 = width / 1;
    var d2 = depth / 1;
    var phaseMult = 3;
    var p = 0;
    for ( var j = 0; j < depth; j ++ ) {
        for ( var i = 0; i < width; i ++ ) {
            var radius = Math.sqrt(
                Math.pow( ( i - w2 ) / w2, 2.0 ) +
                Math.pow( ( j - d2 ) / d2, 2.0 ) );
            var height = ( Math.sin( radius * phaseMult ) + 1 ) * 0.5  * hRange + minHeight;
            data[ p ] = height;
            p++;
        }
    }
    return data;
}
function createTerrainShape() {
    // This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
    var heightScale = 1;
    // Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
    var upAxis = 1;
    // hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
    var hdt = "PHY_FLOAT";
    // Set this to your needs (inverts the triangles)
    var flipQuadEdges = false;
    // Creates height data buffer in Ammo heap
    ammoHeightData = Ammo._malloc( 4 * terrainWidth * terrainDepth );
    // Copy the javascript height data array to the Ammo one.
    var p = 0;
    var p2 = 0;
    for ( var j = 0; j < terrainDepth; j ++ ) {
        for ( var i = 0; i < terrainWidth; i ++ ) {
            // write 32-bit float data to memory
            Ammo.HEAPF32[ammoHeightData + p2 >> 2] = heightData[ p ];
            p ++;
            // 4 bytes/float
            p2 += 4;
        }
    }
    // Creates the heightfield physics shape
    var heightFieldShape = new Ammo.btHeightfieldTerrainShape(
        terrainWidth,
        terrainDepth,
        ammoHeightData,
        heightScale,
        terrainMinHeight,
        terrainMaxHeight,
        upAxis,
        hdt,
        flipQuadEdges
    );
    // Set horizontal scale
    var scaleX = terrainWidthExtents / ( terrainWidth - 1 );
    var scaleZ = terrainDepthExtents / ( terrainDepth - 1 );
    heightFieldShape.setLocalScaling( new Ammo.btVector3( scaleX, 1, scaleZ ) );
    heightFieldShape.setMargin( 0.05 );
    return heightFieldShape;
}
function loadTexture(){
    textureLoader = new THREE.TextureLoader();

    textureLoader.load( "./textures/hardwood2_diffuse.jpg", function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        map.encoding = THREE.sRGBEncoding;
        floorMat.map = map;
        floorMat.needsUpdate = true;

    } );
    textureLoader.load( "./textures/hardwood2_bump.jpg", function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;

    } );
    textureLoader.load( "./textures/hardwood2_roughness.jpg", function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;

    } );
}