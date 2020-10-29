var dog,happyDog,database,foodS,foodStock;
var foodStock;
		var lastFed;
function preload()
{
  Dog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog=createSprite(300,350,10,10);
  dog.addImage(Dog);
  dog.scale = 0.4;


  foodObj = new Food();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);


fill(255,255,254);
textSize(15);
if(lastFed>12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}

foodObj.display();
FeedTime=database.ref("FeedTime");
FeedTime.on("value",function(data){
  lastFed=data.val();
})
drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodstock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodstock(foodObj.getFoodstock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodstock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

