//Create variables here
var dog;
var Dog,happyDog;
var database;
var foodS;
var foodStock;
var fedTime;
var lastFed;
var foodObj;
var addFood;
var getFoodStock;
var updateFoodStock;
var deductFood;
function preload()
{
	//load images here
  Dog= loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();
	createCanvas(500,500);
 //foodObj = new food();
  foodStock =database.ref("food");
  foodStock.on("value",readStock);

  feed = createButton( "Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(AddFood);
}


function draw() {  
background(46, 139, 87);

//dog.display();
drawSprites();

Fill(255,255,254);
textSize(15);
fedTime = database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});
if(lastFed>=12){
  text( "Last Fed :"+ lastFed%12 +"PM" ,350,30);
} else if (lastFed==0){
  text("Last Feed : 12 AM",350,30);
} else{
  text("Last Feed :"+ lastFed + "AM, 350,30");
}



}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  db.ref("/").update({
    food:x
  })
  
}
 
// to update food stock and last fed time
function feedDog () {
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
// to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}


