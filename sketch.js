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
let fitTime = 500;
let bgpattern = 0;
let setV = false;
let startMove = false;
let interval = 50;
let finishEating = false;
let img;
let ifImage = true;
function preload(){
  img = loadImage("Lab.jpg");
}
function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  for (let i = 0; i < 100; i++) {
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
  if(ifImage){
    push();
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Interactive Biology Lab", 400, 70);
    scale(1.8);
    image(img, 20, 55);
    pop();
  }else{
  //plants
  drawPlant(60, 130, 1);
  drawPlant(600, 90, 0.7);
  drawPlant(610, 87, 0.9);
  drawPlant(450, 70, 0.7);
  drawPlant(210, 200, 1.3);
  drawPlant(195, 210, 0.7);
  drawPlant(60, 220, 1.5);
  drawPlant(650, 170, 1.6);
  drawPlant(400, 240, 1.5);
  drawPlant(700, 400, 3);
  drawPlant(300, 300, 2.4);
  drawPlant(320, 160, 1.1);
  drawPlant(100, 400, 3);
  drawPlant(500, 350, 2.6);

  //text

  drawText(0, 20);

  //temperature change
  if (bgpattern == 3) {
    stroke("red");
    for (let i = 0; i < 600; i++) {
      noFill();
      let x = random(0, 800);
      let y = random(0, 500);
      let W = random(0, 30);
      rect(x, y, W, W);
    }
  } else if (bgpattern == 4) {
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
  if (bgpattern == 1) {
    push();
    fill(0, 153, 153);

    if (time > 0) {
      time--;
    } else {
      for (let i = 0; i < 100; i++) {
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
  } else if (bgpattern == 2) {
    push();
    noStroke();
    fill(204, 204, 0, 70);
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
//movement
  if (
    bgpattern == 0 ||
    bgpattern == 1 ||
    bgpattern == 2 ||
    bgpattern == 3 ||
    bgpattern == 4
  ) {
    if (frameCount % interval == 0) {
      speedX = random(-2, 2);
      speedY = random(-2, 2);
      interval = int(random(100, 150));
    }
  }

  if (x < 30 || x > width - 30) {
    speedX = -speedX;
  }
  if (y < 30 || y > height - 65) {
    speedY = -speedY;
  }

  //color change
  drawBird("#f7da7e");
  if (bgpattern == 1) {
    drawBird("green");
  } else if (bgpattern == 2) {
    drawBird("blue");
  } else if (bgpattern == 3) {
    drawBird("red");
  } else if (bgpattern == 4) {
    drawBird("white");
  }

  //start to move to food
  if (startMove) {
    if (x2.length == 0) {
      startMove = false;
      finishEating = false;
      return;
    }
    moveToFood();
  } else {
    x += speedX;
    y += speedY;
  }

  //food
  push();
  rectMode(CENTER);
  fill(random(0, 255), random(0, 255), random(0, 255), 90);
  for (let i = 0; i < x2.length; i++) {
    rect(x2[i], y2[i], 20, 20);
  }
  pop();
}
}
function moveToFood() {
  x = lerp(x, x2[0], 0.1);
  y = lerp(y, y2[0], 0.1);
  if (dist(x, y, x2[0], y2[0]) < 5) {
    dis.splice(0, 1);
    x2.splice(0, 1);
    y2.splice(0, 1);
    finishEating = true;
    foodEaten++;
  }
}

function drawBird(birdColor) {
  push();

  translate(x, y);
  Size = map(y, 0, height, 0.2, 1.5);
  scale(Size);
  scale(map(foodEaten, 0, 100, 1, 8));
  fitTime--;
  if (fitTime == 0) {
    foodEaten--;
    if (foodEaten == 0) {
      fitTime = 500;
    }
  }

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
  fill(247, 218, 126, 90);
  ellipse(-30, 15, 55, 30);
  //feather
  fill(birdColor);
  arc(-30, 30, 70, 70, 3.5 * QUARTER_PI, -QUARTER_PI, CHORD);
  //head
  fill(247, 218, 126);
  circle(0, 0, 30);
  fill(0);
  circle(5, -2, 7);

  pop();
}

function drawPlant(PX, PY, size) {
  noStroke();
  push();
  translate(PX, PY);
  scale(size);
  fill("green");
  ellipse(0, 0, 20, 30);
  strokeWeight(2);
  stroke(229, 240, 68);
  for (let i = 0; i < 10; i++) {
    let x = random(-10, +10);
    let y = random(-15, +15);
    point(x, y);
  }

  pop();
}

function drawText(TX, TY) {
  push();
  translate(TX, TY);
  scale(0.7);
  stroke(0);
  fill(212, 181, 127);
  rect(262, -30, 20, 90);
  fill(212, 181, 127);
  rect(35, 0, 460, 100);
  textSize(27);
  fill("red");
  text("NOTICE", 215, 25);
  fill(0);
  stroke(0);
  textSize(17);
  text(
    "It's a highly intelligent creature. Be careful interacting with it!",
    40,
    40
  );
  stroke(255);
  textSize(15);
  text("Change temperature: press h / c", 40, 60);
  text("Change humidity: press r / d", 40, 75);
  text("Feed it: press f", 40, 90);
  pop();
}

function keyPressed() {
  if (key == "r") {
    // pattern = 1;
    bgpattern = 1;
  }
  if (key == "d") {
    bgpattern = 2;
  }
  if (key == "h") {
    bgpattern = 3;
  }
  if (key == "c") {
    bgpattern = 4;
  }
  if (key == "f") {
    x2.push(mouseX);
    y2.push(mouseY);
    for (let i = 0; i < x2.length; i++) {
      dis.push(dist(x, y, x2[i], y2[i]));
    }
    if (!finishEating) {
      startMove = true;
    }
  }
  if (key == "s") {
    bgpattern = 0;
  }
  if(keyCode == 13){
    ifImage = false;
 }
}