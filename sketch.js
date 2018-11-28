var mySong;
var yoff=0;
var myCircle;
var moreCircles= [];

function preload(){
  // put preload code here
  mySong= loadSound('./assets/Westworld_soundtrack .mp3');
}

function setup() {
  // put setup code here
createCanvas(windowWidth,windowHeight);
analyzer = new p5.Amplitude();
analyzer.setInput(mySong);
mySong.play()

for (var k=0; k < 200; k += 40){
myCircle = new Circle();
moreCircles.push(myCircle);
}
}

function draw() {

  background(0);
  var volume = analyzer.getLevel();
  //console.log(volume);
  var mappedVolume = map(volume, 0,0.8, 1,15);

  for(var j=0; j < moreCircles.length; j++){
    moreCircles[j].mappedVolume= mappedVolume;
    moreCircles[j].display();

}

}

function Circle(){
  this.volume;
  this.mappedVolume;


  this.display = function(){
    angleMode(DEGREES);

    push();
    translate(windowWidth/2,windowHeight/2);
    rotate(frameCount)
    var reverse= -1;
    console.log(reverse);
    if (this.mappedVolume < 2){
    scale(frameCount/100* this.mappedVolume*10)}
    else {
      scale(-frameCount/550);
    }


    beginShape();

    var xoff=0;

    for(var i =0; i < 360; i += 10){

      var offset= map(noise(xoff, yoff), 0,1,-5, +5)
      r=100;


      r= r + offset* this.mappedVolume;

      var x = r * cos(i);
      var y = r * sin(i);
      noStroke();
      //vertex(x,y);
      ellipse(x,y,4,4);
      xoff+=1;
    }

    endShape();
    pop();

    yoff+= 0.1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
