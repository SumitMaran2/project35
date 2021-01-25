var Balloon;
var database, Balloonposition;

function preload(){
  database = firebase.database();
backgroundImg = loadImage("Hot Air Ballon-01.png");
hotairBalloon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
BalloonImg1 = loadImage("Hot Air Ballon-02.png");
BalloonImg2 = loadImage("Hot Air Ballon-03.png");
BalloonImg3 = loadImage("Hot Air Ballon-04.png");
var ballposition = database.ref("Balloon/Position");
ballposition.on("value", readposition, showError);
}

function setup() {
  createCanvas(900,620);
  Balloon = createSprite(250, 650, 50, 50);
  Balloon.addAnimation("hotairBalloon", BalloonImg2);   
  Balloon.scale = 0.7;
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the Arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0);
  Balloon.addAnimation("hotairBalloon", BalloonImg3);
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    Balloon.addAnimation("hotairBalloon", BalloonImg3);                                                              
  }

  else if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    Balloon.addAnimation("hotairBalloon", BalloonImg2); 
    Balloon.scale = Balloon.scale-0.02;                                                       
  }

  else if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    Balloon.addAnimation("hotairBalloon", BalloonImg2);     
    Balloon.scale = Balloon.scale+0.02;                                                           
  }
 // else  {Balloon.addAnimation("flying",hotairBalloon);}


  drawSprites();
}

function readposition(data){
position = data.val();
Balloon.x = position.x;
Balloon.y = position.y;
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  x:Balloon.x + x,
  y:Balloon.y + y,
})
}

function showError(){
  console.log("error");
}