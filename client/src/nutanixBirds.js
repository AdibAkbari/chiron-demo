import React, { useEffect } from 'react';

import * as THREE from 'three';

// import Stats from 'three/addons/libs/stats.module.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

function NutanixBirds() {
    /* TEXTURE WIDTH FOR SIMULATION */
  const WIDTH = 16;

  const BIRDS = WIDTH * WIDTH;

  // Custom Geometry - using 3 triangles each. No UVs, no normals currently.
  class BirdGeometry extends THREE.BufferGeometry {

    constructor() {

      super();

      const trianglesPerBird = 38;    //HERE
      const triangles = BIRDS * trianglesPerBird;
      const points = triangles * 3;

      const vertices = new THREE.BufferAttribute( new Float32Array( points * 3 ), 3 );
      const birdColors = new THREE.BufferAttribute( new Float32Array( points * 3 ), 3 );
      const references = new THREE.BufferAttribute( new Float32Array( points * 2 ), 2 );
      const birdVertex = new THREE.BufferAttribute( new Float32Array( points ), 1 );

      this.setAttribute( 'position', vertices );
      this.setAttribute( 'birdColor', birdColors );
      this.setAttribute( 'reference', references );
      this.setAttribute( 'birdVertex', birdVertex );

      let v = 0;

      function verts_push() {

        for ( let i = 0; i < arguments.length; i ++ ) {

          vertices.array[ v ++ ] = arguments[ i ];

        }

      }

      // const wingsSpan = 20;

      for ( let f = 0; f < BIRDS; f ++ ) {

        // Body

        // verts_push(
        //   0, - 0, - 20,
        //   0, 4, - 20,
        //   0, 0, 30
        // );

        // Wings

        // verts_push(   // HERE
        //   0, 0, - 15,
        //   10, 0, - 15,
          
        //   5, 0, 0,
          
        //   10, 0, 15,

        //   0, 0, 15
        // );

        // verts_push(
        //   0, 0, - 15,
        // )


        // verts_push(
        //   0, 0, -15,
        //   -wingsSpan, 0, 0,
        //   0, 0,  15
        // );

        // verts_push(
        //   0, 0, 15,
        //   wingsSpan, 0, 0,
        //   0, 0, - 15
        // );

        
        verts_push(
          20.017323494, -6.999999881, 0.000000000, 15.176287889, -9.004948735, -0.021038353, 15.168085098, -15.161638260, -0.021038353);
verts_push(
          -0.000001057, 13.000000715, -0.053556580, 0.000000000, 6.000000238, 0.000000000, 8.980835676, 15.176321268, -0.021038353);
verts_push(
          6.999999881, 20.017323494, 0.000000000, -0.000001057, 13.000000715, -0.053556580, 8.980835676, 15.176321268, -0.021038353);
verts_push(
          13.000000715, 0.000001057, 0.000000000, 20.000000000, 6.999999881, 0.000000000, 15.161640644, 9.004114270, -0.021038353);
verts_push(
          20.000000000, 6.999999881, 0.000000000, 19.999998808, 20.000002384, 0.000000000, 15.161640644, 15.168086290, -0.021038353);
verts_push(
          15.161640644, 9.004114270, -0.021038353, 20.000000000, 6.999999881, 0.000000000, 15.161640644, 15.168086290, -0.021038353);
verts_push(
          20.000002384, -19.999996424, 0.000000000, 20.017323494, -6.999999881, 0.000000000, 15.168085098, -15.161638260, -0.021038353);
verts_push(
          20.017323494, -6.999999881, 0.000000000, 13.000000715, 0.000001057, 0.000000000, 15.176287889, -9.004948735, -0.021038353);
verts_push(
          -0.000000167, -13.000000715, -0.053556580, 6.999999881, -19.999998808, 0.000000000, 9.010356069, -15.161639452, -0.021038353);
verts_push(
          6.999999881, -19.999998808, 0.000000000, 20.000002384, -19.999996424, 0.000000000, 15.168085098, -15.161638260, -0.021038353);
verts_push(
          9.010356069, -15.161639452, -0.021038353, 6.999999881, -19.999998808, 0.000000000, 15.168085098, -15.161638260, -0.021038353);
verts_push(
          -20.000000000, -20.000000000, 0.000000000, -6.999999881, -20.017323494, 0.000000000, -15.088443756, -15.094984770, -0.021656454);
verts_push(
          -6.999999881, -20.017323494, 0.000000000, -0.000000167, -13.000000715, -0.053556580, -9.011171460, -15.103082657, -0.021656454);
verts_push(
          -13.000000715, 0.000000167, 0.000000000, -20.000000000, -6.999999881, 0.000000000, -15.088443756, -9.034432769, -0.021656454);
verts_push(
          -20.000000000, -6.999999881, 0.000000000, -20.000000000, -20.000000000, 0.000000000, -15.088443756, -15.094984770, -0.021656454);
verts_push(
          -15.088443756, -9.034432769, -0.021656454, -20.000000000, -6.999999881, 0.000000000, -15.088443756, -15.094984770, -0.021656454);
verts_push(
          -20.000000000, 20.000000000, 0.000000000, -20.017323494, 6.999999881, 0.000000000, -15.094987154, 15.088446140, -0.021656454);
verts_push(
          -20.017323494, 6.999999881, 0.000000000, -13.000000715, 0.000000167, 0.000000000, -15.103052855, 9.035279751, -0.021656454);
verts_push(
          0.000000000, 13.000000715, 0.000000000, -6.999999881, 20.000000000, 0.000000000, -9.034432173, 15.088446140, -0.021656454);
verts_push(
          -6.999999881, 20.000000000, 0.000000000, -20.000000000, 20.000000000, 0.000000000, -15.094987154, 15.088446140, -0.021656454);
verts_push(
          -9.034432173, 15.088446140, -0.021656454, -6.999999881, 20.000000000, 0.000000000, -15.094987154, 15.088446140, -0.021656454);
verts_push(
          -9.034432173, 15.088446140, -0.021656454, 0.000000000, 6.000000238, 0.000000000, 0.000000000, 13.000000715, 0.000000000);
verts_push(
          -15.103052855, 9.035279751, -0.021656454, -15.094987154, 15.088446140, -0.021656454, -20.017323494, 6.999999881, 0.000000000);
verts_push(
          6.999999881, 20.017323494, 0.000000000, 8.980835676, 15.176321268, -0.021038353, 15.161640644, 15.168086290, -0.021038353);
verts_push(
          -6.049718857, 0.004294515, -0.021656454, -15.103052855, 9.035279751, -0.021656454, -13.000000715, 0.000000167, 0.000000000);
verts_push(
          -15.088443756, -9.034432769, -0.021656454, -6.049718857, 0.004294515, -0.021656454, -13.000000715, 0.000000167, 0.000000000);
verts_push(
          19.999998808, 20.000002384, 0.000000000, 6.999999881, 20.017323494, 0.000000000, 15.161640644, 15.168086290, -0.021038353);
verts_push(
          -9.011171460, -15.103082657, -0.021656454, -15.088443756, -15.094984770, -0.021656454, -6.999999881, -20.017323494, 0.000000000);
verts_push(
          13.000000715, 0.000001057, 0.000000000, 15.161640644, 9.004114270, -0.021038353, 6.153295636, -0.004228354, -0.021038353);
verts_push(
          -0.040787458, -6.110498309, -0.090288222, -9.011171460, -15.103082657, -0.021656454, -0.000000167, -13.000000715, -0.053556580);
verts_push(
          9.010356069, -15.161639452, -0.021038353, -0.040787458, -6.110498309, -0.090288222, -0.000000167, -13.000000715, -0.053556580);
verts_push(
          13.000000715, 0.000001057, 0.000000000, 6.153295636, -0.004228354, -0.021038353, 15.176287889, -9.004948735, -0.021038353);
     
     
        }

      for ( let v = 0; v < triangles * 3; v ++ ) {

        const triangleIndex = ~ ~ ( v / 3 );
        const birdIndex = ~ ~ ( triangleIndex / trianglesPerBird );
        const x = ( birdIndex % WIDTH ) / WIDTH;
        const y = ~ ~ ( birdIndex / WIDTH ) / WIDTH;

        const c = new THREE.Color(
          0x666666 +
          ~ ~ ( v / 9 ) / BIRDS * 0x666666
        );

        birdColors.array[ v * 3 + 0 ] = c.r;
        birdColors.array[ v * 3 + 1 ] = c.g;
        birdColors.array[ v * 3 + 2 ] = c.b;

        references.array[ v * 2 ] = x;
        references.array[ v * 2 + 1 ] = y;

        birdVertex.array[ v ] = v % 9;

      }

      this.scale( 0.3, 0.3, 0.3 );

    }

  }

  //

  let container;
//   let stats;
  let camera, scene, renderer;
  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  const BOUNDS = 800, BOUNDS_HALF = BOUNDS / 2;

  let last = performance.now();

  let gpuCompute;
  let velocityVariable;
  let positionVariable;
  let positionUniforms;
  let velocityUniforms;
  let birdUniforms;
  
let once = false;

  useEffect(() => {
    if (!once) {
      // eslint-disable-next-line
      once = true;
      init();
    }

    // Cleanup function
    return () => {
      // Remove event listeners
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      
      // Dispose of Three.js resources
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.clear();
      }
      
      // Remove container from DOM
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  
  function init() {
    const existingContainer = document.querySelector('.nutanix-birds-container');
    if (existingContainer) {
      existingContainer.parentNode.removeChild(existingContainer);
    }

    container = document.createElement('div');
    document.body.appendChild(container);

    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '-100';
    // container.style.opacity = '0';
    
    // Add class for styling
    container.className = "nutanix-birds-container";

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 350;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x131313);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    initComputeRenderer();

    // Remove direct event listener from container
    document.addEventListener('pointermove', onPointerMove);

    window.addEventListener('resize', onWindowResize);

    const effectController = {
      separation: 95.0,
      alignment: 37.0,
      cohesion: 60.0,
      freedom: 0.75
    };

    const valuesChanger = function() {
      velocityUniforms['separationDistance'].value = effectController.separation;
      velocityUniforms['alignmentDistance'].value = effectController.alignment;
      velocityUniforms['cohesionDistance'].value = effectController.cohesion;
      velocityUniforms['freedomFactor'].value = effectController.freedom;
    };

    valuesChanger();
    initBirds();
  }

  // Update pointer move handler to check element classes
  // function onPointerMove(event) {
  //   if (event.isPrimary === false) return;

  //   // Get the element under the cursor
  //   const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY);
    
  //   // Check if any UI elements are being interacted with
  //   const isOverUI = elementsUnderCursor.some(element => {
  //     const hasUIClass = element.classList.contains('url-input-container') || 
  //                       element.classList.contains('loading-animation') ||
  //                       element.classList.contains('MuiBox-root') ||
  //                       element.classList.contains('MuiInputBase-root');
  //     return hasUIClass;
  //   });

  //   // Only update bird movement if not over UI elements
  //   if (!isOverUI) {
  //     mouseX = event.clientX - windowHalfX;
  //     mouseY = event.clientY - windowHalfY;
  //   }
  // }

  function initComputeRenderer() {

    gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();
    fillPositionTexture( dtPosition );
    fillVelocityTexture( dtVelocity );

    velocityVariable = gpuCompute.addVariable( 'textureVelocity', document.getElementById( 'fragmentShaderVelocity' ).textContent, dtVelocity );
    positionVariable = gpuCompute.addVariable( 'texturePosition', document.getElementById( 'fragmentShaderPosition' ).textContent, dtPosition );

    gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
    gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

    positionUniforms = positionVariable.material.uniforms;
    velocityUniforms = velocityVariable.material.uniforms;

    positionUniforms[ 'time' ] = { value: 0.0 };
    positionUniforms[ 'delta' ] = { value: 0.0 };
    velocityUniforms[ 'time' ] = { value: 1.0 };
    velocityUniforms[ 'delta' ] = { value: 0.0 };
    velocityUniforms[ 'testing' ] = { value: 1.0 };
    velocityUniforms[ 'separationDistance' ] = { value: 1.0 };
    velocityUniforms[ 'alignmentDistance' ] = { value: 1.0 };
    velocityUniforms[ 'cohesionDistance' ] = { value: 1.0 };
    velocityUniforms[ 'freedomFactor' ] = { value: 1.0 };
    velocityUniforms[ 'predator' ] = { value: new THREE.Vector3() };
    velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

    velocityVariable.wrapS = THREE.RepeatWrapping;
    velocityVariable.wrapT = THREE.RepeatWrapping;
    positionVariable.wrapS = THREE.RepeatWrapping;
    positionVariable.wrapT = THREE.RepeatWrapping;

    const error = gpuCompute.init();

    if ( error !== null ) {

      console.error( error );

    }

  }

  function initBirds() {

    const geometry = new BirdGeometry();

    // For Vertex and Fragment
    birdUniforms = {
      'color': { value: new THREE.Color( 0x7855fa ) },
      'texturePosition': { value: null },
      'textureVelocity': { value: null },
      'time': { value: 1.0 },
      'delta': { value: 0.0 }
    };

    // THREE.ShaderMaterial
    const material = new THREE.ShaderMaterial( {
      uniforms: birdUniforms,
      vertexShader: document.getElementById( 'birdVS' ).textContent,
      fragmentShader: document.getElementById( 'birdFS' ).textContent,
      side: THREE.DoubleSide

    } );

    const birdMesh = new THREE.Mesh( geometry, material );
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();

    scene.add( birdMesh );

  }

  function fillPositionTexture( texture ) {

    const theArray = texture.image.data;

    for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

      const x = Math.random() * BOUNDS - BOUNDS_HALF;
      const y = Math.random() * BOUNDS - BOUNDS_HALF;
      const z = Math.random() * BOUNDS - BOUNDS_HALF;

      theArray[ k + 0 ] = x;
      theArray[ k + 1 ] = y;
      theArray[ k + 2 ] = z;
      theArray[ k + 3 ] = 1;

    }

  }

  function fillVelocityTexture( texture ) {

    const theArray = texture.image.data;

    for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;

      theArray[ k + 0 ] = x * 10;
      theArray[ k + 1 ] = y * 10;
      theArray[ k + 2 ] = z * 10;
      theArray[ k + 3 ] = 1;

    }

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onPointerMove( event ) {

    if ( event.isPrimary === false ) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  function animate() {

    render();
    // stats.update();

  }

  function render() {

    const now = performance.now();
    let delta = ( now - last ) / 1000;

    if ( delta > 1 ) delta = 1; // safety cap on large deltas
    last = now;

    positionUniforms[ 'time' ].value = now;
    positionUniforms[ 'delta' ].value = delta;
    velocityUniforms[ 'time' ].value = now;
    velocityUniforms[ 'delta' ].value = delta;
    birdUniforms[ 'time' ].value = now;
    birdUniforms[ 'delta' ].value = delta;

    velocityUniforms[ 'predator' ].value.set( 0.5 * mouseX / windowHalfX, - 0.5 * mouseY / windowHalfY, 0 );

    mouseX = 10000;
    mouseY = 10000;

    gpuCompute.compute();

    birdUniforms[ 'texturePosition' ].value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    birdUniforms[ 'textureVelocity' ].value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

    renderer.render( scene, camera );

  }

  
  return (
    <div></div>
  );
}

export default NutanixBirds;