let bg;
var fire = false;
var antirichard = []
var pollos = []
var score = 0;
var hit;
var number_aliens = 15
var cnv;
var left = false;
var right = false;
var score_tot = 0
var level = 1;
window.onload =  localStorage.setItem('level',1)
function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  createCanvas(window.innerWidth, window.innerHeight-100);
  resizeCanvas(window.innerWidth, window.innerHeight-100)
  richard = new Richard();
  level = localStorage.getItem('level')
  level = localStorage.getItem('level')
  if(level == 1 ){
  for (let i = 0; i < number_aliens; i++) {
    antirichard.push(new Nani());
  }
  }
  if( level == 2){
    number_aliens = 18
    for (let i = 0; i < number_aliens; i++) {
      antirichard.push(new Pupo());
    }
  }
  if( level == 3){
    number_aliens = 25
    for (let i = 0; i < number_aliens; i++) {
      antirichard.push(new PolloBoss());
    }
  }
}
function preload(){
    image_richard = loadImage('image/richard.png')
    image_pupo = loadImage('image/pupo.png')
    image_nani = loadImage('image/nano.png')
    image_boss_pollo = loadImage('image/pollo_boss.jpg')
    image_pollo = loadImage('image/pollo.png')
    bg = loadImage('image/studio_richard.jpg');
}
function draw() {
  background(bg); 
  richard.display();
  for (let missile of pollos) {
    missile.move();
    missile.display();
    missile.y -= 1;
    for(let dimaio of antirichard) {
      var index = antirichard.indexOf(dimaio);
      var index_miss = pollos.indexOf(missile);
        if(dimaio.hits(missile)){
            antirichard.splice(index, 1);
            pollos.splice(index_miss,1)
            score += 1
            break;
        }
    }
 }
  for (let anti of antirichard) {
    anti.move();
    anti.display();
    anti.y += 0.5;
    var index = antirichard.indexOf(anti);
    if(anti.y >= window.innerHeight-80){
      noLoop();
      if (confirm("E siamo qui, richard ha perso ma a me non me ne frega un ca**0!")) {
        localStorage.setItem('level', 1)
        location.reload();
      }else{
        localStorage.setItem('level', 1)
        location.reload();
      }
    }
  }
  if(richard.x <= 0)
     richard.x = 0
  if(richard.x >= window.innerWidth -60)
    richard.x = window.innerWidth - 60
  keyPressed() 

  document.getElementById("livello").innerHTML="Livello : "+level;
  document.getElementById("score").innerHTML="  Kills : "+score;
  if(level == 1){
    if( score == number_aliens){
          pollos = []
          level = 2
          localStorage.setItem('level',level)
          preload();
          setup();
     }
   }
   if(level == 2){
    if( score == number_aliens+15){
        pollos = []
        level = 3
        localStorage.setItem('level',level)
        preload();
        setup();
     }
   }
   if(level == 3){
    if( score == number_aliens+33){
        noLoop();
        if (confirm("Ti devi spaventare!!! Richard vince!")) {
          localStorage.setItem('level', 1)
          location.reload();
        }else{
          localStorage.setItem('level', 1)
          location.reload();
        }
     }
   }

  if(left){
    richard.x -= 5
  }
  if(right){
    richard.x += 5
  }

}

function left_mouve() {
  left = true
  right = false
}
function right_mouve() {
  right = true
  left = false
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      richard.x -= 5
    }
    if(keyCode === RIGHT_ARROW){
      richard.x += 5
    }
    if(keyCode === 32){
      richard.fire()
    }

}

class Richard {
constructor() {
    this.x = 20;
    this.y =  window.innerHeight-160;
    this.diameter = 70
    this.number_missilies = 1
}

display() {
    image(image_richard,this.x, this.y, this.diameter, this.diameter);
} 

    fire(){
        pollos.push(new Pollos());
    }
}

class Pollos {
    constructor() {
      this.x = richard.x + 10
      this.y = window.innerHeight-140
      this.diameter = 20
      this.speed = 1;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
        image(image_pollo,this.x, this.y, this.diameter, this.diameter);
    }
  }



class Nani {
    constructor() {
      this.x = random(0,window.innerWidth -50);
      this.y = random(0,150);
      this.diameter = 40
      this.speed = 1;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_nani,this.x, this.y, this.diameter, this.diameter);
    }

    hits(pollo){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,pollo.x,pollo.y,pollo.diameter,pollo.diameter);
    }
  }
  class Pupo {
    constructor() {
      this.x = random(0,window.innerWidth -50);
      this.y = random(100,200);
      this.diameter = 40
      this.speed = 1.5;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_pupo,this.x, this.y, this.diameter, this.diameter);
    }

    hits(pollo){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,pollo.x,pollo.y,pollo.diameter,pollo.diameter);
    }
  }

  class PolloBoss {
    constructor() {
      this.x = random(0,window.innerWidth -50);
      this.y = random(150,300);
      this.diameter = 60
      this.speed = 2;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_boss_pollo,this.x, this.y, this.diameter, this.diameter);
    }

    hits(pollo){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,pollo.x,pollo.y,pollo.diameter,pollo.diameter);
    }
  }



