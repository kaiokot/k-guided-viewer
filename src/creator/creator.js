let img;

function setup() {
  createCanvas(1280, 1967);
  img = loadImage("samples/01.jpg");
}

function draw() {
  image(img, 0, 0);
  image(img, 0, height, img.width / 2, img.height / 2);
}