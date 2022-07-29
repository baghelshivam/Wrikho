const paths = [];
let currentPath = [];
function setup(){
    // Your setup code goes here
    let width = window.innerWidth*(0.9);
    createCanvas(width, width*Math.sqrt(2));
    background(200);
    // var draw  = false;
  }
  
  function draw(){
    noFill();
    if(mouseIsPressed){
      const point = {
        x: mouseX,
        y: mouseY
      };
    currentPath.push(point);
    }

    paths.forEach(path => {
      beginShape();
      path.forEach(point => {
        vertex(point.x,point.y);
      });
      endShape();
  
    });   
  }

  function mousePressed(){
    currentPath = [];
    paths.push(currentPath);
  }