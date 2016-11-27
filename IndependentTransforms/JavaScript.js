
var timingA = {duration: 5000, iterations: Infinity, direction: "alternate"};
var timingB = {duration: 3000, iterations: Infinity, direction: "alternate"};
var timingC = {duration: 2000, iterations: Infinity, direction: "alternate"};

var path = "path('M150 5 L75 200 L225 200 Z')";

var square = document.getElementById("square");

// All these animations happen together
square.animate([
  {translate: "10px 100px"},
  {translate: "200px 300px"},
], timingA);

square.animate([
  {rotate: "45deg"},
  {rotate: "90deg"}
], timingB);

square.animate([
  {scale: "2 3"},
  {scale: "0.5 5"}
], timingC);

