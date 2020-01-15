
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);


var cubes = []
var renderer = new THREE.WebGLRenderer({ antialias: true });
const geometry = new THREE.BoxGeometry(2, 2, 2);
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var hexColors = []
//var controls = new THREE.OrbitControls( camera, renderer.domElement );

var startColor = hexToRgb("#ff0000");
var endColor = hexToRgb("#0000ff");


function run() {
    let start = hexToRgb($("#color2").val());
    let end = hexToRgb($("#color1").val());
    let n = $("#num").val()

    if (n == undefined || n == null || n <= 0) {
        deleteAllCubes()
        cubes = []
        generateColor(start, end)

    }
    else {
        if(n>9){
            alert("Az oldal csak 9 különböző színű kocka megjelenítését tudja garantálni")
        }
        deleteAllCubes()
        cubes = []
        generateColor(start, end, n)
    }

}

function deleteAllCubes() {
    for (let i = 0; i < cubes.length; i++) {
        scene.remove(cubes[i])
    }
}

function generateColor(colorStart, colorEnd, n = 5) {

    let start = colorStart;
    let end = colorEnd;

    let alpha = 0.0;
    let colors = [];
    hexColors = []
    for (i = 0; i < n; i++) {
        let c = [];
        alpha += (1.0 / n);

        c[0] = Math.round(start.r * alpha + (1 - alpha) * end.r);
        c[1] = Math.round(start.g * alpha + (1 - alpha) * end.g);
        c[2] = Math.round(start.b * alpha + (1 - alpha) * end.b);



        hexColors.push(rgbToHex(c[0], c[1], c[2]));
        colors.push(c[0], c[1], c[2]);

    }


    console.log(hexColors)
    generateMaterial(hexColors)
    generateText(hexColors)

}



function generateMaterial(colors) {
    let materials = []
    for (let i = 0; i < colors.length; i++) {
        materials.push(new THREE.MeshLambertMaterial({ color: colors[i] }));
    }
    generateCubes(materials)
}


function generateCubes(materials) {
    let localCubes = []
    for (let i = 0; i < materials.length; i++) {
        localCubes.push(new THREE.Mesh(geometry, materials[i]))
        //cubes[i].position.set()
    }
    cubes = localCubes

    cubeRender(localCubes)
}



camera.position.z = 30;

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25)
//var helper = new THREE.DirectionalLightHelper( light, 5 );

scene.add(light);

function cubeRender(localCubes) {
    for (let i = 0; i < cubes.length; i++) {
        scene.add(cubes[i])
        cubes[i].position.set(-20 + (5 * i), 0, 0)
    }

}

function animation() {
    requestAnimationFrame(animation);
    for (var i = 0; i < cubes.length; i++) {
        var cube = cubes[i];
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    renderer.render(scene, camera)

}

animation()



function rgb(c) {
    let string = "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")"
    return string
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function generateText(colors) {
    $(".colors-block").html("")
    for (let i = 0; i < colors.length; i++) {
        $(".colors-block").append(`
        <p style="margin: 2vw;color:`+colors[i]+`" >`+colors[i]+`</p>
    `)
    }
}