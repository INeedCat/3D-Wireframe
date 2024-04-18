const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const xZero = canvas.width/2;
const yZero = canvas.height/2;

let rad = 2;
let fps = 1000/100;

let thetaGrowth = Math.PI/180;

let theta = 0;

let spinXAxis = true;
let spinYAxis = false;
let spinZAxis = false;

//Cube
const vertices = [
    //Outside Cube
    [-100,-100,-100, "blue"],
    [-100,100,-100, "blue"],
    [100,100,-100, "blue"], 
    [100,-100,-100, "blue"],

    [-100,-100,-100, "blue"],

    //Inside Cube
    [100,100,100, "red"],
    [-100,100,100, "red"],
    [-100,-100,100, "red"],
    [100,-100,100, "red"],

    [100,100,100, "red"],

    //Connections
    [100,100,-100, "purple"],
    [100,-100,-100, "blue"],
    [100,-100,100, "purple"],
    [-100,-100,100, "red"],
    [-100,-100,-100, "purple"],
    [-100,100,-100, "blue"],
    [-100,100,100, "purple"],
    
    [0,0,0, "white"]
];

let focalDist = 300;

function Main(){
    spinXAxis = document.querySelector('#xAxis').checked;
    spinYAxis = document.querySelector('#yAxis').checked;
    spinZAxis = document.querySelector('#zAxis').checked

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    for(let i = 0; i < vertices.length; i++){
        let x = vertices[i][0];
        let y = vertices[i][1];
        let z = vertices[i][2];
        let col = vertices[i][3];

        let rx, ry, rz; //declare variable changes to be based on rotation axis
        

        let newX = (focalDist * rx) / (focalDist + rz) + xZero;
        let newY = (focalDist * ry) / (focalDist + rz) + yZero;

        //lines
        if(i + 1 < vertices.length && i != 4){
            //window.alert(i + 1);
            x = vertices[i][0];
            y = vertices[i][1];
            z = vertices[i][2];
            col = vertices[i][3];

            if(spinXAxis){
                rx = x;
                ry = (y*Math.cos(theta)) - (z*Math.sin(theta));
                rz = (y*Math.sin(theta)) + (z*Math.cos(theta));
            }
            else if(spinYAxis){
                rx = (x*Math.cos(theta)) + (z*Math.sin(theta));
                ry = y;
                rz = ((0-x)*Math.sin(theta)) + (z*Math.cos(theta));
            }
            else if(spinZAxis){
                rx = (x*Math.cos(theta)) - (y*Math.sin(theta));
                ry = (x*Math.sin(theta)) + (y*Math.cos(theta));
                rz = z;
            }

            newX = (focalDist * rx) / (focalDist + rz) + xZero;
            newY = (focalDist * ry) / (focalDist + rz) + yZero;
            
            
            x = vertices[i+1][0];
            y = vertices[i+1][1];
            z = vertices[i+1][2];
            col = vertices[i+1][3];

            if(spinXAxis){
                rx = x;
                ry = (y*Math.cos(theta)) - (z*Math.sin(theta));
                rz = (y*Math.sin(theta)) + (z*Math.cos(theta));
            }  
            else if(spinYAxis){
                rx = (x*Math.cos(theta)) + (z*Math.sin(theta));
                ry = y;
                rz = ((0-x)*Math.sin(theta)) + (z*Math.cos(theta));
            } 
            else if(spinZAxis){
                rx = (x*Math.cos(theta)) - (y*Math.sin(theta));
                ry = (x*Math.sin(theta)) + (y*Math.cos(theta));
                rz = z;
            }

            secondNewX = (focalDist * rx) / (focalDist + rz) + xZero;
            secondNewY = (focalDist * ry) / (focalDist + rz) + yZero;

            ctx.beginPath();
            ctx.strokeStyle = col;
            ctx.moveTo(newX, newY);
            ctx.lineTo(secondNewX, secondNewY);
            ctx.stroke();
        } 

        //Draw Points
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(newX , newY, rad, 0, 2*Math.PI);
        ctx.fill()
    }
    
    if(theta != 2*Math.PI){
        theta+=thetaGrowth;
    } else {
        theta = 0;
        theta+=thetaGrowth;
    }
}

setInterval(Main, fps);

//Get (X, Y) at chosen point relative to center of canvas
/* window.addEventListener('mousedown', e => {
    let xtotal = e.clientX - canvas.getBoundingClientRect().x - xZero;
    let ytotal = e.clientY - canvas.getBoundingClientRect().y - yZero;
    window.alert("(" + xtotal + ", " + ytotal + ")");
}); */