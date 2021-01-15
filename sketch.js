//Create variables here
var dog, happyDog;
var database;
var foodS, foodstock;

function preload()
{
  //load images here
  dogImg= loadImage("images/dogImg.png");
  happyDog= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage("dogImg", dogImg);
  dog.scale = 0.2;
 

  foodstock= database.ref("Food")
  foodstock.on("value",readStock)
  
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage("dogImg", happyDog)
}



  drawSprites();
  //add styles here

  fill("white")
  textSize(16)
  text("Press up arrow key to feed the dog", 100,100)


  if(foodS){
    text("Food Remaing :- " + foodS, 150, 150);
  }
}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){

if(x<=0){
  x=0
} else{
  x=x-1;
}



  database.ref("/").update({
    Food:x
  })
}



