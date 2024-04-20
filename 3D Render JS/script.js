const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const xZero = canvas.width/2;
const yZero = canvas.height/2;

let rad = 2;
let fps = 1000/60;
let focalDist = 600;

let theta = 0;
let thetaGrowth = 2*Math.PI/180;

const shapes = [];

function Main(){
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    for(let s = 0; s < shapes.length; s++){
        for(let p = 0; p < shapes[s].points.length; p++){
            //window.alert(shapes[s].points[p][0]);
            let realX = (focalDist * shapes[s].points[p][0]) / (focalDist + shapes[s].points[p][2]) + xZero;
            let realY = -(focalDist * shapes[s].points[p][1]) / (focalDist + shapes[s].points[p][2]) + yZero;

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(realX, realY, rad, 0, 2*Math.PI);
            ctx.fill();

            if(p + 1 < shapes[s].points.length){
                let secondX = (focalDist * shapes[s].points[p + 1][0]) / (focalDist + shapes[s].points[p + 1][2]) + xZero;
                let secondY = -(focalDist * shapes[s].points[p + 1][1]) / (focalDist + shapes[s].points[p + 1][2]) + yZero;

                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(realX, realY);
                ctx.lineTo(secondX, secondY);
                ctx.stroke();
            }

            shapes[s].points[p][1] += Math.cos(theta);
        }
    }
    theta += thetaGrowth;
}

class Cube{
    constructor(x, y, z, sideLen){
        this.x = x;
        this.y = y;
        this.z = z;
        this.sideLen = sideLen;

        this.points = [
            [this.x, this.y, this.z],
            [this.x + this.sideLen, this.y, this.z],
            [this.x + this.sideLen, this.y + this.sideLen, this.z],
            [this.x, this.y + this.sideLen, this.z],

            [this.x, this.y, this.z],

            [this.x, this.y, this.z + this.sideLen],

            [this.x + this.sideLen, this.y, this.z + this.sideLen],
            [this.x + this.sideLen, this.y, this.z],
            [this.x + this.sideLen, this.y, this.z + this.sideLen],

            [this.x + this.sideLen, this.y + this.sideLen, this.z + this.sideLen],
            [this.x + this.sideLen, this.y + this.sideLen, this.z],
            [this.x + this.sideLen, this.y + this.sideLen, this.z + this.sideLen],

            [this.x, this.y + this.sideLen, this.z + this.sideLen],
            [this.x, this.y + this.sideLen, this.z],
            [this.x, this.y + this.sideLen, this.z + this.sideLen],

            
            [this.x, this.y, this.z + this.sideLen],
        ];

        shapes.push(this);
    }
}

for(let cubesX = -100; cubesX < 100; cubesX += 100){
    for(let cubesZ= -100; cubesZ < 100; cubesZ += 100){
        new Cube(cubesX, -225, cubesZ, 100);
    }
}

setInterval(Main, fps);


//Get (X, Y) at chosen point relative to center of canvas
/* window.addEventListener('mousedown', e => {
    let xtotal = e.clientX - canvas.getBoundingClientRect().x - xZero;
    let ytotal = e.clientY - canvas.getBoundingClientRect().y - yZero;
    window.alert("(" + xtotal + ", " + ytotal + ")");
}); */
