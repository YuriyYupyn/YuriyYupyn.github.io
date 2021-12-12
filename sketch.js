var pPoint = {
  x: Math.floor(Math.random() * 1200),
  y: Math.floor(Math.random() * 600),
};

function generatePPoint() {
  pPoint.x = Math.floor(Math.random() * 1200);
  pPoint.y = Math.floor(Math.random() * 600);
}

var aPoint = {
  x: 1300,
  y: 0,
};

var images = [];
var isPressed = false;
var collides = false;
var current_image = 1;

function preload() {
  asteroid = loadImage("./Sketches/8.png");
  explosion = loadImage("./Sketches/explosion.png");
  bg = loadImage("./Sketches/Background.png");
  for (var i = 1; i < 8; i++) {
    images[i] = "./Sketches/" + i + ".png";
  }
}

function setup() {
  createCanvas(1420, 750);
  placePlanet();
  noLoop();
}

function draw() {
  background(bg);
  if (isPressed) {
    asteroid_image = image(asteroid, aPoint.x, aPoint.y, 100, 100);
    var m = createVector(aPoint.x - pPoint.x, aPoint.y - pPoint.y);
    m.normalize();

    aPoint.x -= m.x * 5;
    aPoint.y -= m.y * 5;
    if (collidesImg()) {
      isPressed = false;
      collides = true;
    }
  }
  if (collides) {
    noLoop();
    button.hide();
    image(explosion, pPoint.x, pPoint.y, 100, 100);

    setTimeout(() => {
      collides = false;
      aPoint.x = 1300;
      aPoint.y = 0;
      loop();
      noLoop();
      generatePPoint();
      placePlanet();
      return;
    }, 500);
  }
}

function placePlanet() {
  button = createImg(images[current_image]);
  button.size(100, 100);
  button.position(pPoint.x, pPoint.y);
  button.mousePressed(() => {
    loop();
    isPressed = true;
  });
}

function collidesImg() {
  if (
    aPoint.y + 100 >= pPoint.y &&
    aPoint.x <= pPoint.x + 100 &&
    aPoint.x + 100 >= pPoint.x
  ) {
    if (current_image >= 8) {
      current_image = 1;
    }
    current_image += 1;
    return true;
  } else {
    return false;
  }
}
