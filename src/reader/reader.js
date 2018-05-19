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
  let imgXposition = (width - finalImgW) / 2;

  rectSize = windowWidth * fitScale;

  image(img, imgXposition, 0, finalImgW, finalImgH);

  if (showNavigation) {
    fill(255, 0, 0, 80);
  } else noFill();

  noStroke();
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

let doublet = false;
function doubleClicked() {
  doublet = true;
  var fs = fullscreen();
  fullscreen(!fs);

}

var released = true;

function mouseReleased() {
  released = true;
  return false;
}

function mousePressed() {

  if (!released && !doublet) {
    return;
  }

  released = false;

  if (mouseX >= 0 && mouseX <= rectSize && mouseY >= 0 && mouseY <= windowHeight) {
    if (currentImageIdx < 0)
      return;

    currentImageIdx--;
  }

  if (mouseX >= (windowWidth - rectSize) && mouseY >= 0 && mouseY <= windowHeight) {
    if (currentImageIdx >= images.length - 1)
      return;

    currentImageIdx++;
  }
}

document.ontouchmove = function (event) {
  event.preventDefault();
};



function keyPressed(event) {
  if (keyCode === RIGHT_ARROW) {
    if (currentImageIdx >= images.length - 1) return;
    currentImageIdx++;
    event.preventDefault();
  } else if (keyCode === LEFT_ARROW) {
    if (currentImageIdx <= 0) return;
    currentImageIdx--;
    event.preventDefault();
  }  
}