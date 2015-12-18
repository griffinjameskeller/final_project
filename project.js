
var mic;
var fft;
var binCount = 1024;
var bins = new Array(binCount);
var speed = 2;
var cvas;
var saveButton;

function setup() {
  cvas = createCanvas(windowWidth-25, windowHeight-100);
  background('white');
  console.log(width, height);
  noStroke();
  colorMode(HSB);
  mic = new p5.AudioIn();
  mic.start();

  var smoothing = 0.5;
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(mic);

}

function draw() {

  var spectrum = fft.analyze();


  var can = copy(cvas, 0, 0, width, height, speed, 0, width, height);


  for (var i = 0; i < spectrum.length; i++) {
    var value;
    if (logView) {
      logIndex = logScale(i, spectrum.length);
      value = spectrum[logIndex];
    } else {
      value = spectrum[i];
    }
    var c = value;
    fill(c, c, 255);
    var percent = i / spectrum.length;
    var y = percent * height;
    rect(0, height - y, speed, height - spectrum.length);
  }


}

//// call functions ////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function keyPressed() {
  if (key == 'L') {
    toggleScale();
  }
}

function mousePressed() {
save(cvas, 'sound.jpg');
}

var logView = true;
function toggleScale() {
  logView = !logView;
}


/**
 * Given an index and the total number of entries, return the
 * log-scaled value.
 */
function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
  return Math.log(val) / Math.log(base);
}
