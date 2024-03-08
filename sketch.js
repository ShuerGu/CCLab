let x = 200;
let y = 200;
let x2 = [];
let y2 = [];
let dis = [];
let speedX = 1;
let speedY = 1;
let foodEaten = 1;
let pattern = 0;
let time = 60;
let eXs = [];
let eYs = [];
let ws = [];
let hs = [];
let arcX = [];
let arcY = [];
let w = 0;
let h = 0;
let setV = false;
let startMove = false;
let interval = 50;
let finishEating = true;
function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  for (let i = 0; i < 100; i++) {
    // translate(width / 2, height / 2);
    eXs[i] = random(0, 800);
    eYs[i] = random(0, 500);
    ws[i] = random(3, 10);
    hs[i] = random(11, 15);
  }
  for (let i = 0; i < 100; i++) {
    arcX[i] = random(0, 800);
    arcY[i] = random(250, 500);
  }
}

function draw() {
  background("#f7da7e");

  //temperature change
  if (pattern == 3) {
    stroke("red");
    for (let i = 0; i < 600; i++) {
      noFill();
      let x = random(0, 800);
      let y = random(0, 500);
      let W = random(0, 30);
      rect(x, y, W, W);
    }
  } else if (pattern == 4) {
    stroke("white");
    for (let i = 0; i < 600; i++) {
      noFill();
      let x = random(0, 800);
      let y = random(0, 500);
      let W = random(0, 30);
      circle(x, y, W);
    }
  }

  noStroke();

  //humidity change
  if (pattern == 1) {
    push();
    fill(255);

    if (time > 0) {
      time--;
    } else {
      for (let i = 0; i < 100; i++) {
        // translate(width / 2, height / 2);
        eXs[i] = random(0, 800);
        eYs[i] = random(0, 500);
        ws[i] = random(3, 10);
        hs[i] = random(11, 15);
      }
      time = 30;
    }
    for (let i = 0; i < 100; i++) {
      ellipse(eXs[i], eYs[i], ws[i], hs[i]);
    }

    pop();
  } else if (pattern == 2) {
    push();
    stroke(0);
    fill("green");
    if (time > 0) {
      time--;
    } else {
      for (let i = 0; i < 100; i++) {
        arcX[i] = random(0, 800);
        arcY[i] = random(250, 500);
      }
      time = 60;
    }
    for (let i = 0; i < 50; i++) {
      arc(arcX[i], arcY[i], 40, 40, PI + QUARTER_PI, 0, PIE);
    }
    pop();
  }

  //if(pattern == 9){

  //}

  //movement
  if (pattern == 5) {
    if (!keyIsPressed) {
      pattern = 0;
    }
  } else if (pattern == 6) {
    if (!keyIsPressed) {
      pattern = 0;
    }
  } else if (pattern == 7) {
    if (!keyIsPressed) {
      pattern = 0;
    }
  } else if (pattern == 8) {
    if (!keyIsPressed) {
      pattern = 0;
    }
  } else if (
    pattern == 0 ||
    pattern == 1 ||
    pattern == 2 ||
    pattern == 3 ||
    pattern == 4
  ) {
    if (frameCount % interval == 0) {
      speedX = random(-2, 2);
      speedY = random(-2, 2);
      interval = int(random(100, 150));
    }
  }

  if (x < 65 || x > width - 20) {
    speedX = -speedX;
  }
  if (y < 30 || y > height - 50) {
    speedY = -speedY;
  }

  x += speedX;
  y += speedY;

  //color change
  drawBird("#f7da7e");
  if (pattern == 1) {
    drawBird("green");
  } else if (pattern == 2) {
    drawBird("blue");
  } else if (pattern == 3) {
    drawBird("red");
  } else if (pattern == 4) {
    drawBird("white");
  }

  if (startMove) {
    if (x2.length == 0) {
      startMove = false;
      return;
    }
    moveToFood();
  }
  push();
  rectMode(CENTER);
  fill(random(0, 255), random(0, 255), random(0, 255), 90);
  for (let i = 0; i < x2.length; i++) {
    rect(x2[i], y2[i], 20, 20);
  }
  pop();

  //circle(mouseX, mouseY, 10)
  stroke(0);
  textSize(15);
  text("press arrows to control its direction", 60, 40);
  text("press h to heaten, press c to coolen", 60, 55);
  text("press r to rain, press d to dry", 60, 70);
  text("press f to feed it", 60, 85);
}
function moveToFood() {
  if (finishEating == true) {
    x = lerp(x, x2[0], 0.1);
    y = lerp(y, y2[0], 0.1);
  }
  if (dist(x, y, x2[0], y2[0]) < 1) {
    finishEating = false;
    dis.splice(0, 1);
    x2.splice(0, 1);
    y2.splice(0, 1);
    finishEating = true;
    console.log(dis);
    //foodEaten++;
  }
}
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        var tempX = x2[j + 1];
        var tempY = y2[j + 1];
        arr[j + 1] = arr[j];
        x2[j + 1] = x2[j];
        y2[j + 1] = y2[j];
        arr[j] = temp;
        x2[j] = tempX;
        y2[j] = tempY;
      }
    }
  }
  return arr;
}

function drawBird(birdColor) {
  push();
  scale(foodEaten);

  translate(x, y);
  //scale(s);

  if (speedX < 0) {
    scale(-1, 1);
  }

  //mouse
  fill(0);
  triangle(13, -2, 13, 4, 20, 0);
  //feet
  stroke(0);
  strokeWeight(2);
  line(-30, 30, -20, 40);
  line(-20, 30, -10, 40);
  //body
  stroke(0);
  strokeWeight(1);
  fill("#f7da7e");
  ellipse(-30, 15, 55, 30);
  //feather
  fill(birdColor);
  arc(-30, 30, 70, 70, 3.5 * QUARTER_PI, -QUARTER_PI, CHORD);
  //head
  fill("#f7da7e");
  circle(0, 0, 30);
  fill(0);
  circle(5, -2, 7);

  pop();
}

function keyPressed() {
  if (key == "r") {
    pattern = 1;
  }
  if (key == "d") {
    pattern = 2;
  }
  if (key == "h") {
    pattern = 3;
  }
  if (key == "c") {
    pattern = 4;
  }
  if (keyCode == 37) {
    pattern = 5;
    speedX = -1;
  }
  if (keyCode == 39) {
    pattern = 6;
    speedX = 1;
  }
  if (keyCode == 38) {
    pattern = 7;
    speedY = -1;
  }
  if (keyCode == 40) {
    pattern = 8;
    speedY = 1;
  }
  if (key == "s") {
    pattern = 9;
  }
  if (key == "f") {
    x2.push(mouseX);
    y2.push(mouseY);
    for (let i = 0; i < x2.length; i++) {
      dis.push(dist(x, y, x2[i], y2[i]));
    }
    bubbleSort(dis);
    startMove = true;
  }
}
