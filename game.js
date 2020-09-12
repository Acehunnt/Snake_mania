


function init(){
    canvas=document.getElementById('mycanvas');
   W=H= canvas.width=canvas.height=600;
   pen=canvas.getContext('2d');
   cs=50;
   game_over=false;
   score=0;

   //image object for food

   foodimg= new Image();
   foodimg.src = "img/food2.png";

   prizeimg= new Image();
   prizeimg.src = "img/trophy.png";


   food =randomfood();

   snake={
    init_len:5,
    color:"blue",
    cells:[],
    direction:"right",
    


   createSnake:function(){
       for(var i=this.init_len;i>0;i--){
           this.cells.push({x:i,y:0});
       }
   },

   drawSnake:function(){
    for(var i=0;i<this.cells.length;i++){
        pen.fillStyle=this.color;
       pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
    }
   },

   updateSnake:function(){

    var headX=this.cells[0].x;
    var headY=this.cells[0].y;

    if(headX==food.x && headY==food.y){
        food=randomfood();
        score++;
    }
    else{
        this.cells.pop();
    }

        var nextx,nexty;

        if(this.direction=="right"){
            nextx=headX+1;
            nexty=headY;
        }

        else if(this.direction=="left"){
            nextx=headX-1;
            nexty=headY;
        }

        else if(this.direction=="up"){
            nextx=headX;
            nexty=headY-1;
        }
        else {
            nextx=headX;
            nexty=headY+1;
        }


        this.cells.unshift({x:nextx,y:nexty});

        var lastx=Math.round(W/cs);
        var lasty=Math.round(H/cs);

        if(this.cells[0].x<0 ||this.cells[0].y<0 ||this.cells[0].x>lastx ||this.cells[0].y>lasty){
            game_over=true;
        }

   }



};

    snake.createSnake();

    function keypressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else {
            snake.direction="up";
        }

    }

    document.addEventListener('keydown',keypressed);
}
function draw(){
    //earse the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.color;
   // pen.fillRect(food.x*cs,food.y*cs,cs,cs);
   pen.drawImage(foodimg, food.x*cs,food.y*cs,cs,cs);

   pen.drawImage(prizeimg,18,20,cs,cs);


   pen.fillStyle="blue";
   pen.font="20px Roboto";

   pen.fillText(score,50,50);
   
}
function update(){
    snake.updateSnake();
   
}

function randomfood(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:foodx,
        y:foody,
        color:"red",

    }
    return food;

}
function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game over");

    }
    draw();
    update();
   
}

init();
var f= setInterval(gameloop,100);
