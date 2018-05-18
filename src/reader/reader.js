let isOverRectangle;
let rectSize;
let images = [];
let showNavigation = false;

var currentImageIdx = 0;


function preload() {

  for (let index = 1; index <= 23; index++) {

    images.push(loadImage("samples/" + index + ".jpg"));
  }

  console.log(images);

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  let img = images[currentImageIdx]

  let fitScale = getFitScaleValue(windowWidth, windowHeight, img.width, img.height);
  let finalImgW = img.width * fitScale;
  let finalImgH = img.height * fitScale;
  rectSize = windowWidth * fitScale;

  let imgXposition = (width - finalImgW) / 2;

  image(img, imgXposition, 0, finalImgW, finalImgH);

  if (showNavigation)
    fill(255, 0, 0, 80);

  noStroke();
  noFill();
  rect(0, 0, rectSize, windowHeight);
  rect(windowWidth - rectSize, 0, rectSize, windowHeight);

}


function getFitScaleValue(containerW, containerH, contentW, contentH) {
  let containerProportion = containerW / containerH;
  let contentProportion = contentW / contentH;

  if (contentProportion >= containerProportion) {
    return containerW / contentW;
  }
  else {
    return containerH / contentH;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function doubleClicked() {
  var fs = fullscreen();
  fullscreen(!fs);
}

var released = true;

function mouseReleased() {
  released = true;
  return false;
}

function mousePressed() {

  if (!released) {
    return;
  }

  released = false;

  if (mouseX >= 0 && mouseX <= rectSize && mouseY >= 0 && mouseY <= windowHeight) {
    // alert("clicked left");
    if (currentImageIdx == 0)
      return;

    currentImageIdx--;
  }

  if (mouseX >= (windowWidth - rectSize) && mouseY >= 0 && mouseY <= windowHeight) {
    // alert("clicked right");
    if (currentImageIdx >= images.length)
      return;

    currentImageIdx++;
  }
}

document.ontouchmove = function (event) {
  event.preventDefault();
};