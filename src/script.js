import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'stats.js'
import { Sphere, SpotLight, SpotLightHelper, TorusBufferGeometry } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { floorPowerOfTwo } from 'three/src/math/MathUtils';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import { Vector3 } from 'mesh-simplifier';

console.log(SimplifyModifier)





window.createImageBitmap = undefined
//FPS Anzeige
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)





/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);

//light source
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 0);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);



//Setup Skybox
/*
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('/textures/Skybox/trance_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('/textures/Skybox/trance_bk.jpg');
let texture_up = new THREE.TextureLoader().load('/textures/Skybox/trance_up.jpg');
let texture_dn = new THREE.TextureLoader().load('/textures/Skybox/trance_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('/textures/Skybox/trance_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('textures/Skybox/trance_lf.jpg');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(300, 500, 650);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
skybox.position.set(0, 0, 0)
scene.add(skybox);
*/

//Setup Plane

//Load Texture
/*
const textureLoader = new THREE.TextureLoader()
const planetexture = textureLoader.load('/textures/Grass/large_thumbnail.jpg')

const geometry = new THREE.PlaneGeometry(200, 500)
//const material = new THREE.MeshBasicMaterial( {color: "#0b460b", side: THREE.DoubleSide} );
const material = new THREE.MeshBasicMaterial({ map: planetexture })
material.side = THREE.BackSide;
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = 0.5 * Math.PI
scene.add(plane);*/

//Setup Sphere1
/*
const geometrySphere1 = new THREE.SphereGeometry(5, 16, 8);
const materialSphere1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const Sphere1 = new THREE.Mesh(geometrySphere1, materialSphere1);
Sphere1.position.set(960, 1150,1000)
scene.add(Sphere1);

//Setup Sphere2
const geometrySphere2 = new THREE.SphereGeometry(5, 16, 8);
const materialSphere2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const Sphere2 = new THREE.Mesh(geometrySphere2, materialSphere2);
Sphere2.position.set(900, 1050, 1000)
scene.add(Sphere2);

//Setup Sphere3
const geometrySphere3 = new THREE.SphereGeometry(5, 16, 8);
const materialSphere3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const Sphere3 = new THREE.Mesh(geometrySphere3, materialSphere3);
Sphere3.position.set(900, 1050, 900)
scene.add(Sphere3);

//Setup some Cylinder
const geometryCylinder1 = new THREE.CylinderGeometry(5, 5, 30, 32);
const materialCylinder1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const Cylinder1 = new THREE.Mesh(geometryCylinder1, materialCylinder1);
Cylinder1.position.set(920, 7000, 900)
scene.add(Cylinder1)

*/


//LOAD Leipzig Model
const texture_dn = new THREE.TextureLoader().load('/textures/Skybox/trance_dn.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture_dn });
const loader = new GLTFLoader();
var Leipzig = new THREE.Object3D();


/*loader.load("/models/schlag/seusslitz_WGSCoordinates_textrure-tiff_raster_indexValues.glb", function (WGS) {

    WGS.scene.scale.set(1, 1, 1)
    WGS.scene.position.set(0, 0, 0)
    const materialforObj = new THREE.MeshBasicMaterial({ color: 0xffff00 });

   WGS.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material = materialforObj
            
           
            child.castShadow = true;
        }
    })
    WGS.scene.castShadow=true
    WGS.scene.recieveShadow=true
    console.log("Leipzig")
    scene.add(WGS.scene)
    console.log(WGS.scene)



}, undefined, function (error) {

    console.error(error);

});*/

loader.load("/models/schlag/seusslitz_ownCoordinates_texture-jpeg_raster-indexValues_medium (1).glb", function (gltf) {



    const materialforObj = new THREE.MeshBasicMaterial({ color: "black" });

    // var numVertices = gltf.scene.child[0].geometry.attributes.position.count;
    // const modifier = new SimplifyModifier();
    //  var geometry = modifier.modify( gltf.scene.child[0].geometry, Math.floor( numVertices * 0.9375 ) );


    //console.log(array)
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.geometry.computeVertexNormals()
            //child.material =material
            child.castShadow = false;
            child.geometry.morphTargetsRelative = false
            console.log(child.geometry.morphTargetsRelative)//.morphAttributs.morphTargetsRelative=true

        }
    })
    //console.log(gltf.scene.children[0].geometry.attributes)

    gltf.scene.castShadow = false
    gltf.scene.receiveShadow = false
    Leipzig = gltf.scene
    console.log("Leipzig")
    //  scene.add(gltf.scene)
    console.log(gltf.scene)
    runSTUFF()


}, undefined, function (error) {

    console.error(error);

});
//Load Sphere with Onclick element
function runSTUFF() {

    let count = Leipzig.children[0].geometry.attributes.position.count;
    console.log(count)
    let firstX = Leipzig.children[0].geometry.attributes.position.array[0]
    let lastX = Leipzig.children[0].geometry.attributes.position.array[Leipzig.children[0].geometry.attributes.position.array.length - 3]
    console.log(firstX, lastX)
    const size = 10;
    const divisions = 50;

    const geometry = new THREE.SphereGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(50, 0, -80)

    const spheregroup = new THREE.Group()

    for (let i = 0; i < Leipzig.children[0].geometry.attributes.position.array.length; i += 600) {

        let randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        let r = randomBetween(0, 255);
        let g = randomBetween(0, 255);
        let b = randomBetween(0, 255);
        let rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string

        sphere.material = new THREE.MeshBasicMaterial({ color: rgb });


        let copy = sphere.clone()



        copy.rotateX(Math.random() * Math.PI)
        // copy.position.set(Leipzig.children[0].geometry.attributes.position.array[i], Leipzig.children[0].geometry.attributes.position.array[i + 1], Leipzig.children[0].geometry.attributes.position.array[i + 2])

        spheregroup.add(copy)





    }



    const bbox = new THREE.BoxHelper(Leipzig.children[0], 0xffff00);

    console.log(spheregroup.children[0].geometry.attributes)
    Leipzig.scale.set(1, 1, 1)
    // Leipzig.position.set(0, -200, -20)
    // Leipzig.rotateX(Math.PI / 3 * 4)
    console.log(Leipzig)



    scene.add(bbox)
    console.log(bbox.geometry.attributes.position.array[0])

    console.log(sphere.position)


    const geometryt = new THREE.SphereGeometry(1, 1, 1);
    const materialt = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const spheret = new THREE.Mesh(geometryt, materialt);
    spheret.position.set(0, 0, 0)
    sphere.position.set(bbox.geometry.attributes.position.array[12], bbox.geometry.attributes.position.array[13], bbox.geometry.attributes.position.array[14])
    scene.add(sphere)
    //  spheregroup.rotateX(Math.PI / 3 * 4)
    //  spheregroup.position.set(0, -200, -20)
    //scene.add(spheregroup)
    console.log(Leipzig.position)

    scene.add(Leipzig)
    console.log(bbox.geometry.attributes.position.array[0], bbox.geometry.attributes.position.array[1], bbox.geometry.attributes.position.array[2])
    console.log(bbox.geometry.attributes.position.array[6], bbox.geometry.attributes.position.array[7], bbox.geometry.attributes.position.array[8])

    var pointAbove = new Vector3((bbox.geometry.attributes.position.array[0]+bbox.geometry.attributes.position.array[6])/2,(bbox.geometry.attributes.position.array[1]+bbox.geometry.attributes.position.array[7])/2,(bbox.geometry.attributes.position.array[2]+bbox.geometry.attributes.position.array[8])/2)   
    var pointBelow = new Vector3(bbox.geometry.attributes.position.array[12], bbox.geometry.attributes.position.array[13], bbox.geometry.attributes.position.array[14])
    console.log(pointBelow)
    console.log(pointAbove)

    sphere.position.set(pointAbove.x, pointAbove.y, pointAbove.z)
    sphere.scale.set(6,6,6)
    spotLight.position.set(pointAbove.x, pointAbove.y, pointAbove.z);
    spotLight.target.position.set(bbox.geometry.attributes.position.array[0]-1, bbox.geometry.attributes.position.array[1]-1, bbox.geometry.attributes.position.array[2]-1);
    spotLightHelper.position.set(bbox.geometry.attributes.position.array[0], bbox.geometry.attributes.position.array[1], bbox.geometry.attributes.position.array[2]);
    spotLight.intensity = 10
    spotLightHelper.update();

    const raycaster = new THREE.Raycaster(
        new THREE.Vector3(pointAbove.x, pointAbove.y, pointAbove.z).normalize(),
        new THREE.Vector3(0,0,-1).normalize(),
        0,
        1000
    );
    console.log(scene.children)
    const intersects = raycaster.intersectObject(bbox)
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xffffff);
        console.log("intersects")
    }


};


//UNCOMMENT FOR BUSHES
/*
//Setup Custom Group for Trees

const Tree = new THREE.Group()
const Trees = new THREE.Group()
//scene.add(Tree)

//Setup Branch
const BranchGeometry = new THREE.CylinderGeometry( 0.05, 0.1, 1.6, 8 );
const BranchMaterial = new THREE.MeshBasicMaterial( {color: "brown"} );
const BranchCylinder = new THREE.Mesh( BranchGeometry, BranchMaterial );

//Setup Leaves
const LeavesTexture = textureLoader.load('/textures/Leaves/kindpng_2371419.png')
const LeavesGeometry = new THREE.PlaneGeometry(0.3,1.4)
const LeavesMaterial = new THREE.MeshBasicMaterial( { map: LeavesTexture,transparent: true, opacity: 0.8 }, );
const LeavesPlane = new THREE.Mesh( LeavesGeometry, LeavesMaterial );
LeavesMaterial.side = THREE.DoubleSide;
LeavesPlane.position.set(0,0.4,0)
LeavesPlane.rotation.y=Math.PI

Tree.add(LeavesPlane)
Tree.add( BranchCylinder );
Tree.scale.set(20,20,20)

//Setup Cylinders for moistness
const MoistnessCylinders = new THREE.Group()

const MoistnessCylinderGeometry = new THREE.CylinderGeometry( 0.05, 0.05, 5, 8 );
const MoistnessCylinderMaterial = new THREE.MeshBasicMaterial( {color: "blue"} );
const MoistnessCylinder = new THREE.Mesh( MoistnessCylinderGeometry, MoistnessCylinderMaterial );
MoistnessCylinder.position.y=80
MoistnessCylinder.scale.set(20,20,20)
scene.add(MoistnessCylinder)
//Setup Box for moistness

//Place Trees and Cylinders

for(let xpos = 0; xpos < 20; xpos++)
   for (let zpos = 0; zpos < 50; zpos++){

    Tree.position.set(xpos*15, 0, zpos*10)    
    Tree.rotation.z = (Math.random() - 0.5) * 0.4
    Tree.rotation.y = (Math.random() - 0.5) * 0.4
    Trees.add(Tree.clone())

    
    MoistnessCylinder.position.set(xpos*15, 0, zpos*10)
    MoistnessCylinder.name="x"+xpos+"z"+zpos
    MoistnessCylinder.scale.set(20,Math.random()*20,20)
    console.log(MoistnessCylinder.name)
    MoistnessCylinders.add(MoistnessCylinder.clone())
   }

scene.add(MoistnessCylinders)
scene.add(Trees)
//console.log(Trees)
*/

//Setup 360 Grad Video

//Load Video
const video = document.getElementById('360GradVideo');
const VideoTexture = new THREE.VideoTexture(video);



// Create Video Sphere
/*
const geometryVideoSphere = new THREE.SphereGeometry(100, 100, 16);
const materialVideoSphere = new THREE.MeshBasicMaterial({ map: VideoTexture })
materialVideoSphere.side = THREE.DoubleSide;
const sphere = new THREE.Mesh(geometryVideoSphere, materialVideoSphere);
sphere.scale.x = -1
sphere.position.x = 0
sphere.position.y = -1.6
sphere.position.z = 0
scene.add(sphere);
*/

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 7000)
camera.position.x = 50
camera.position.y = 50
camera.position.z = 50

scene.add(camera)
/*var dolly= new THREE.Object3D()
dolly.position.x = 1000
dolly.position.y = 1100
dolly.position.z = 1400


dolly.add(camera)
scene.add(dolly)
var dummyCam= new THREE.Object3D()
camera.add(dummyCam)*/


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 0
controls.maxDistance = 40000
var orbitcontrols = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


renderer.xr.enabled = true;

//VR Button
document.body.appendChild(VRButton.createButton(renderer));

console.log(renderer.xr.getCamera())

console.log(renderer.xr.getReferenceSpace())
console.log(renderer.xr.ArrayCamera)


//HTML EVENTS


document.getElementById("MoveCameraButton").onclick = function () {

    controls.maxDistance = 0.1
    controls.target.set(0, 1, 0)
    camera.position.x = -1
    camera.position.y = -0.1
    camera.position.z = -1


};

document.getElementById("MoveCameraBackButton").onclick = function () {

    controls.maxDistance = 100000
    controls.target.set(1000, 1000, 1000)


    camera.position.x = 1000
    camera.position.y = 1100
    camera.position.z = 1400

};

document.getElementById("RemoveObjects").onclick = function () {

    scene.remove(Trees);
    scene.remove(MoistnessCylinders)
    scene.remove(MoistnessCylinder)


};

// Video Event Listener 
var PlayStatus = false
window.addEventListener("keyup", (evt) => {
    if (evt.key === " " && PlayStatus === false) {
        video.play()
        console.log("play")
        PlayStatus = true
    }
    else (video.pause(), PlayStatus = false,
        console.log("pause"))
});

//Mouse Event Listener
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

    //console.log(mouse)
})

//MouseClick Event Listener
var click = true
window.addEventListener('mousedown', event => {
    click = false
    //console.log(click)
});
window.addEventListener('mouseup', event => {
    click = true
    //console.log(click)
});






/**
 * Animate
 */
const clock = new THREE.Clock()
const raycaster = new THREE.Raycaster()
var showCylinder1 = false
let x = 900
let y = 1200
let z = 1300


const tick = () => {

    stats.begin()

    // FeuchtigkeitsFunktion()

    const elapsedTime = clock.getElapsedTime()

    // Raycaster
    /*
        raycaster.setFromCamera(mouse, camera)
    
        const objectsToTest = [Sphere1, Sphere2, Sphere3]
        const intersects = raycaster.intersectObjects(objectsToTest)
        showCylinder1 = false
        for (const intersect of intersects) {
            intersect.object.material.color.set('#0000ff')
            if (click === false && intersect.object === Sphere1) {
                controls.maxDistance = 10000
                controls.target.set(0, 0, 0)
                camera.position.x = 0
                camera.position.y = -1.6
                camera.position.z = 0
            }
            if (click === false && intersect.object === Sphere2) {
                controls.maxDistance = 100
                controls.target.set(10, 10, 10)
                camera.position.x = 1100
                camera.position.y = 1000
                camera.position.z = 1100
            }
    
            if (intersect.object === Sphere3) {
                Cylinder1.position.set(920, 1060, 900)
                Cylinder1.scale.set(1, 1, 1)
                Cylinder1.rotateZ(0.001)
                showCylinder1 = true
    
            }
        }
        if (intersects.object !== Sphere3 && showCylinder1 === false) { Cylinder1.position.set(920, 7000, 900) }
    
        for (const object of objectsToTest) {
            if (!intersects.find(intersect => intersect.object === object)) {
                object.material.color.set('#ff0000')
    
    
    
            }
        }
    */
    if (1300 >= z && z >= 1000) { z = z - 0.1 }

    if (z <= 1000) { z = z + 1300 }

    //spotLight.position.set(x, y, z);




    // Check if Camera is under Plane

    // if (camera.position.y < 15) { camera.position.y = 15.1 }

    // Update controls
    if (orbitcontrols) { controls.update() }

    // Render

    renderer.render(scene, camera)

    // Call tick again on the next frame
    renderer.setAnimationLoop(function () {
        tick()

        renderer.render(scene, camera);

    });

    stats.end()
}


tick()


