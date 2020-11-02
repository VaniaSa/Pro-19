var banana, obstacles;
var obstaclesGroup, bananaGroup;
var bg;
var score = 0;
var monkey;
var ground;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation( "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_image = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);

  ground = createSprite(200, 400, 800, 20);
  ground.visible = false;

  bg = createSprite(0, 0, 800, 400);
  bg.addImage("jungle", backImage);
  bg.velocityX = -2;
  bg.x = bg.width / 2

  monkey = createSprite(70, 320, 20, 20);
  monkey.addAnimation("monkeyMoving", player_running);
  monkey.scale = 0.1

  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(220);

  if (bg.x < 300) {
    bg.x = bg.width / 2
  }

  food();
  rock();

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2
  }

  if (obstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.08;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.14;
      break;
    case 20:
      monkey.scale = 0.18;
      break;
    case 30:
      monkey.scale = 0.22;
      break;
    case 40:
      monkey.scale = 0.23;
      break;
    default:
      break;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(ground);

  drawSprites();

  stroke("yellow");
  textSize(20);
  fill("blue");
  text("Score: " + score, 500, 50);
}

function food() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.075;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function rock() {
  if (frameCount % 150 === 0) {
    var obstacles = createSprite(600, 365, 40, 10);
    obstacles.addImage("rock", obstacle_image);
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
    obstacles.lifetime = 200;
    obstaclesGroup.add(obstacles);
  }
}