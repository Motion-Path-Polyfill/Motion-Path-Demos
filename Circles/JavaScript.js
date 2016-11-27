
var timing = {duration: 3500, iterations: Infinity};
var circleCounter = 0; // The number of circles to draw in canvas
var pathCounter = 0; // The path number
var index = 0;
// If path command is upper-case then the coordinate is absolute.
// If path command lower-case then interpreted as the relative offset from out 
// last point -> interpreted as the relatice offset from our last point. 

// M -> move to 

// COMMANDS TO DRAW STRAIGHT LINES FROM THE CURRENT TO NEW POINT
// L -> draws line from current point to new point
// H -> draws horizontal line from the current point
// V -> draws a vertical line from the current point

// COMMANDS TO DRAW CURVES 
// 3 Groups that draw curved paths -> Cubic Bezier(C,c & S,c), Quadratic Bezier(Q,q & T,t) amd Elliptical Arc(A,a) 
// A -> defines a segment of an ellipse
/*  The first and last sets of values within this path represent initial and final coordinates 
    The second set of values define the two radii
    The second last values (large-arc-flag, sweep-flag) determine how the arc is drawn as there are 4 different options
    T
*/
// Z -> close path

function createPath1(index) {
    return "path('M0,200 a 100,200 0 1," + Number(index % 2 == 0) + " 200,0 a 100,200 0 1,1 -200,0')";
}

function createPath2(index) {
    return "path('M0,200 a 100,200 0 1,"+ Number(index > (circleCounter / 2))+" 200,0 a 100,200 0 1,1 -200,0')";
}

function createPath3(index) {
    return "path('M150 5 L"+ 50 * (index / 2 + 1) +" 200 L"+ 22 * (index/2 + 1) +" 200 Z')";
}

function createPath4(index) {
    return  "path('M0,200 a 100,200 0 1,1 200,0 a 100,200 0 1,1 -200,0')";
}

function createPath5(index) {
    return "path('M0,200 a200,"+ 100 * ((index % 3)) + " 0 1,1 200,100 a200,100 0 1,0 200,100')";
}

var array_of_functions = [createPath5, createPath1, createPath2, createPath3, createPath4];

window.onload = function() {
  
  /**
  * Function to increment the circleCounter upon the 'add' button click
  */
  add.onclick = function(event) {
    circleCounter++;
    drawCanvas();
  };

  /**
  * Function to decrement the circleCounter upon the 'remove' button click
  */
  remove.onclick = function(event) {   
    circleCounter--;   
    if(circleCounter < 0) {
      circleCounter = 0;
    }
    drawCanvas();
  };

  /**
  * Function to change the path to the next design
  */
  next.onclick = function(event) {
    pathCounter++;
    if(pathCounter >= array_of_functions.length) {
      pathCounter = 0;
    }
    drawCanvas();
  };

  /**
  * Function to change the path to the previous design
  */
  back.onclick = function(event) {
    pathCounter--;
    if(pathCounter < 0) {
      pathCounter = array_of_functions.length - 1;
    }
    drawCanvas();
  };
};

/**
* Refreshes the canvas. Number of circles = circleCounter.
*/
function drawCanvas() {
  document.getElementById("container").textContent = " "; // Clear the body
  // To now redraw the circle based on the value of the circleCounter
  for(var j = 0; j < circleCounter; j++) {
    container.innerHTML += '<div class="rotater"><p class="circle"+circleCounter ></p></div>';
  }

  // Get all the elements of class rotator
  var rotaters = document.querySelectorAll(".rotater");
  
  // To now equally rotate the path of each circle
  for(var i = 0; i < rotaters.length; i++) {
  	var rotater = rotaters[i];
    rotater.style.transform = "rotate(" 
        + ((360 / rotaters.length) * i) + "deg)"; 
  }

  // To now animate the circles 
  var circles = document.querySelectorAll(".circle"); // "array" of rotaters
  
  for(var i = 0; i <  circles.length; i++) {
    var circle = circles[i]
    var newPath = array_of_functions[pathCounter](i);
    // .animate(properties, [chosen->duration/easing/complete]);
    circle.animate([
      {offsetPath: newPath},
      {offsetPath: newPath}
    ], timing); // <- Duration

    // To animate the circles
    circle.animate([ 
      {offset: 0, offsetDistance: '0%'},
      {offset: 1, offsetDistance: '100%'}
    ], timing);

    // To gradually change the colour of the circles
    circle.animate([
      {offset: 0.45, background: "lightSkyBlue"},
      {offset: 0.7, background: "mediumPurple"}
    ], timing); 

    // To gradually fade the circles
    circle.animate([
      {offset: 0, opacity: 0.0},
      {offset: 0.05, opacity: 1},
      {offset: 0.5, opacity: 1},
      {offset: 0.8, opacity: 0.5},
      {offset: 1, opacity: 0}
    ], timing); 
    
  }
}
