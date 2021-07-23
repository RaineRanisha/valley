var startTime,EndTime, player1, player2,player3,player4, player1image,player2image,player3image, player4image;
var player;
var gameState = 0;
var count = 2;
var trackimg, crosstrackimg, ttrackimg,ytrackimg;
var track;
var op1, op2, op3;
var police;
var play1;
var distance = 0;
var policeimg, image1,image2,image3;
var difference;
var car;
var times = 2;
var carGroup;
var touch = 0;
var carsound,carcrash;
var intro ; 
var gameFail;
var yay;
function preload(){
//carsound = loadSound("carsound.mp3");
carcrash = loadSound("crash.mp3")
trackimg = loadImage("tracks.png");
intro = loadSound("intro.mp3");
gameFail = loadSound("game-fail-sound-effect.mp3")
player1image = loadImage("whitecar.png");
player2image = loadImage("redcar.png");
player3image = loadImage("yellowcar.png");
player4image = loadImage("bluecar.png");
yay = loadSound("yaya.mp3")
policeimg = loadImage("policecar.png");

image1 = loadImage("ob1.png");
image2 = loadImage("ob2.png");
image3 = loadImage("ob3.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
 carGroup = new Group();
play1 = createSprite(10,10);
 player1 = createSprite(displayWidth/ 4 , displayHeight/2 + 120);
 player1.addImage(player1image)
 player1.scale = 0.05

 player2 = createSprite(displayWidth/ 4 + 210, displayHeight/2 + 120 );
 player2.addImage(player2image)
 player2.scale = 0.05

 player3 = createSprite(displayWidth/ 2 + 100 , displayHeight/2 + 120);
 player3.addImage(player3image)
 player3.scale = 0.05

 player4 = createSprite(displayWidth/ 2 + 300 , displayHeight/2 + 120 );
 player4.addImage(player4image)
 player4.scale = 0.46;

ob1 =  createSprite(10,10);
ob1.visible= false;
ob2 = createSprite(10,10);
ob2.visible = false;

ob3 = createSprite(20,20);
ob3.visible= false;
police = createSprite(300,30);
police.visible = false;

 ob1.addImage(image1);
 ob3.addImage(image3);
 ob2.addImage(image2);

 police.addImage(policeimg);
play1.visible = false;

intro.play(false)

 
}

function draw() {
  background("white");  
 
  
  image(trackimg, 0, -10 * height ,5* width , 11 * height);
//console.log(mouseX+ ","+ mouseY)
  drawSprites();
  
  if(keyIsDown("y") && gameState === 2){
    gameState = 0
  }
  if (gameState === 0){
    intro.play()
    textSize(23);
    fill("blue");
  text("Press your most favorite car to start! Find the exit !",displayWidth / 2 + -10 , displayHeight / 2 - 100);
 text("Navigate your way.Only 3 chances. Can you do it?",displayWidth / 2, displayHeight / 2 - 70)}


  if (gameState === 0){
    
  if (mousePressedOver(player1)){

    player2.destroy();
    player3.destroy();
    player4.destroy();
    player1.x = width/5;
    player = player1
    gameState = 1;
    startTime = new Date().getTime()
  }

  if (mousePressedOver(player2)){
    player1.destroy();
    player3.destroy();
    player4.destroy();
    player2.x = width/5
    player = player2
    gameState = 1
    startTime = new Date().getTime()

  }

  if (mousePressedOver(player3)){
    player2.destroy();
    player1.destroy();
    player4.destroy();
    player3.x = width/5;
    player = player3;
    gameState = 1;
    startTime = new Date().getTime()

  }

  if (mousePressedOver(player4)){
    player2.destroy();
    player3.destroy();
    player1.destroy();
    player4.x = width/5;
    player = player4;
    gameState = 1;
    
    startTime = new Date().getTime()

  }
}

//play1.y = player.y ;
if (gameState === 1){
  intro.stop()

  
camera.position.y = player.y;

camera.position.x = player.x;


  if ( keyIsDown(UP_ARROW) ){
   player.y -=5
   //carsound.play(true)
    
      //carsound.stop()
      player.rotation = 360;
    
  }
 
  if (keyIsDown(RIGHT_ARROW) ){
    player.x +=5
    //carsound.play()
    if (player.velocity === 0){
      //carsound.stop()
    }
   // player.velocityY = player.velocityY + 1 ;
   player.rotation = 90;
   

  }
  if (keyIsDown(LEFT_ARROW) ){
    player.x -=5
    //carsound.play()
    if (player.velocity === 0){
     // carsound.stop()
    }
   // player.velocityY = player.velocityY + 1 ;
   player.rotation = -90;
   

  }
  if (keyIsDown(DOWN_ARROW) ){
    player.y +=5
    //carsound.play()
    if (player.velocity === 0){
     // carsound.stop()
    }
   // player.velocityY = player.velocityY + 1 ;
   player.rotation = -180;
   

  }


   spawnCar();
   if( player.setVelocity(0,0)){
     //carsound.stop()
   }
   if ( keyWentDown("b") && count > 0){
      player.velocityY = 0
      
     count = count - 1;
     //carsound.stop()
     }
     if(player.x >= 5700 && player.x <= 6350 && player.y <= -6900){
      endTime = new Date().getTime();
   console.log(endTime);
   alert("Game Over! Congrats you won!!:)");
      gameState = 3;

     }
     
if (carGroup.isTouching(player) && times === 0){
 gameState = 2 
}
    
else if(carGroup.isTouching(player) && times> 0){
  times--
  //carsound.stop()
  player.setVelocity(0,0);
  carGroup.destroyEach();
  
  
  textSize(30)
  text("Oops! Be careful.Press R to resume", 300,300)
  carcrash.play(false);
  

}


}

/*if (player.x % 100 === 0|| player.y % 100 === 0){
  textSize(30);
  text("You have travelled: " + player.y + "m")
}*/
 if (gameState === 2){
   
  textSize(40);
  //carsound.stop()
    fill("yellow");
    stroke("black");
    strokeWeight(3);
    text("You Failed! Better Luck Next Time", player.x  , player.y - 300 );
    //text("To play again, press Y",player.x,player.y + 20);
player.setVelocity(0,0);

carGroup.destroyEach()

gameFail.play(true)
if (keyIsDown("y")){
  gameState = 0;
}
} 
if(gameState === 3){
  yay.play(false)
}
}


function spawnCar(){
  if(frameCount % 85  === 0 ){

    var rand = Math.round(random(1,3));
    var rand2  = Math.round(random(0,3));
   // console.log(player.y);
 car = createSprite(player.x  ,player.y - 200);
 carGroup.add(car);
 car.lifetime = 200;
player.depth = car.depth+ 2;
if(rand === 1){
  car.addImage(image1);
  car.scale = 0.45;


}
else if(rand === 2){
  car.addImage(image2);
  car.scale = 0.22;


}
else if (rand === 3){
  car.addImage(image3);
 car.scale = 0.6;
}

switch(rand2){
  //left
  case 0: car.x = player.x - 500;
  car.y = Math.round(random(player.y - 500,player.y + 500))
  car.velocityX = 6;
 // car.setSpeedAndDirection(5,90);
car.rotation = 90
 // car.addImage("image",image1);

  break;
  //right
  case 1: car.x = player.x + 400
  car.y = Math.round(random(player.y - 500,player.y + 500))
  car.velocityX = -8
  //car.setSpeedAndDirection(-5,-90);
car.rotation = -90;
  //car.addImage("image",image1);

  break;
  //up
  case 2: car.x = Math.round(random(player.x - 500,player.x + 500))
  car.y = player.y - 300;
  car.velocityY = 6;
  car.rotation = 180;
  break;
  //bottom

  case 3: car.x = Math.round(random(player.x - 500,player.x + 500))
  car.y = player.y + 300;
  car.velocityY = -7;
  break;
  default: break;
}
  
  }
}
function increaseSpeedX(d1){
  d1.velocityX = d1.velocityX + 1
}
function increaseSpeedY(d1){
  d1.velocityY = d1.velocityY + 1
}
function decreaseSpeedX(d1){
  d1.velocityX = d1.velocityX - 1
}
function decreaseSpeedY(d1){
  d1.velocityY = d1.velocityY- 1
}
/* */