//Create variables here
var Dog,DogIMG,HappyDog,bg;
var database,food,foodStock,foodS;
var food = 20;

function preload()
{
  //load images here
  DogIMG = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
  bg = loadImage("images/bg.jpeg");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 800);
  
  Dog = createSprite(400,600,100,100);
  Dog.addImage(DogIMG);
  Dog.scale = 0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock)
}

function draw() {  
  background(bg);
  fill("black");
  stroke("black");
  textSize(20);
  text("Press Up arrow key to feed the dog with a treat",100,100);
  text("Press Down arrow to play with the dog",100,200);
  text(food,240,150);
  text("Treats in stock:",100,150)

  if(keyWentDown(UP_ARROW)){
    food = food-1;
  }

  if(food===0 ){
    fill("red");
    stroke("red");
    textSize(40);
    text("Oh no we ran out of stock!!!",200,400);
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Dog.addImage(HappyDog)
  }

  if(keyWentDown(DOWN_ARROW)){
    Dog.addImage(DogIMG);
  }


 

  
 console.log(foodStock);

  drawSprites();

  //add styles here
}

function readStock(data) {
foodS=data.val();
}

function writeStock (x) {
if(x<=0){
  x=0;
}else{
  x=x-1;
}
database.ref('/').update({
  Food:x
})
}
