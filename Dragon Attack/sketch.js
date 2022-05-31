var canhao,cannon_ball,cannon_ballImage,restart,restartImage,background,reddrag,bluedrag, canhao_running, edges, ground,groundImage;
var wait= 0
var dragoes= []
var speed= 2
var bulspeed= -3
var gamestage= "play"
var fr
var dragoess, bullets
var a= 1
var score= 0
var castle
function preload() {
  canhao_standing = loadImage("canhao.png")
  cannon_ballImage= loadImage("cannonball_1.png")
  reddrag = loadAnimation("./reddrag/1.png","./reddrag/2.png","./reddrag/3.png","./reddrag/4.png")
  bluedrag = loadAnimation("./bluedrag/1.png","./bluedrag/2.png","./bluedrag/3.png","./bluedrag/4.png")
  backgroundi = loadImage("background.png")
  groundImage = loadImage("ground2.png")
  restartImage= loadImage("restart_button.png")
}

function setup() {
  createCanvas(600, 800);
  canhao = createSprite(50, 700, 20, 50);
  castle = createSprite(300,700,600,70)
  castle.depth= canhao.depth-0.5
  background = createSprite(300,400,50,50)
  canhao.addAnimation("canhao",canhao_standing);
  background.addAnimation("background", backgroundi);
  canhao.scale = 0.4
  background.scale=1
  restart= createSprite(300,520)
  restart.addImage("restart",restartImage)
  restart.scale= 0.4
  dragoess= createGroup()
  bullets= createGroup()
}

function draw() { 
fr= 140-score
if(keyIsDown(LEFT_ARROW)){
  canhao.x-=3
}
if(keyIsDown(RIGHT_ARROW)){
  canhao.x+=3
}
if(keyIsDown(ENTER)&&gamestage=="play"&&wait>=100){
  cannon_ball=createSprite(canhao.x,canhao.y,20,20)
  cannon_ball.velocityY= -10
  cannon_ball.lifetime= 500
  bullets.add(cannon_ball)
  cannon_ball.addImage("cannon_ball",cannon_ballImage)
  cannon_ball.scale=0.07
  wait=0
}
if(wait<=101){
  wait+=2
}
if(canhao.x<30){
  canhao.x=30
}
if(canhao.x>570){
  canhao.x=570
}
background.depth= 0
if(frameCount % fr ===0){
  dragoes =createSprite(random(70,530),-100,50,50)
  dragoes.velocityY= speed
  dragoes.lifetime= 500
  dragoess.add(dragoes)
  textuDrag=Math.round(random(1,2)) 
  switch(textuDrag){
    case 1: dragoes.addAnimation("reddragidle",reddrag)
    dragoes.scale=0.75
    break
    case 2: dragoes.addAnimation("bluedragidle",bluedrag)
    break
    default:
    break
    }
    
  dragoes.rotation=180
  }
canhao.setCollider("rectangle",0,0,120,200)
bullets.isTouching(dragoess,executar)
castle.isTouching(dragoess,gameover) 
 if(gamestage=="end"&&mousePressedOver(restart)){
    gamestage="play"
    score=0
  }
drawSprites();
if(gamestage=="end"){
  dragoess.destroyEach()
  canhao.visible=false
  castle.visible=false
  textSize(50)
  text("Você Perdeu!",140,450)
  restart.visible=true
  text("score:"+score,200,680)

}

textSize(30)
if(gamestage=="play"){
  text("score:"+score,440,780)
  canhao.visible=true
  castle.visible=true
  restart.visible=false
}
if(fr==40){
  gamestage="win"
}
if(gamestage=="win"){
  textSize(50)
  text("Você Ganhou!!!",100,400)
  fr=0
  dragoess.destroyEach()
}
}
function executar(bullet,sprite){
sprite.remove()
bullet.destroy()
score+=1
}
function gameover(sprite){
  gamestage="end"
  }