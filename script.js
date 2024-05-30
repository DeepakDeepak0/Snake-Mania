//Game variables & constants

const Board = document.getElementById('board');

let inputDir = {x:0,y:0}
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;

let snakeArray = [
    {x:13 ,y:15}
]
let food = {x:6 ,y:7}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArray){
  //if you are bump into yourself
  for(let i = 1;i<snakeArray.length;i++){
    if(snakeArray[i].x ===snakeArray[0].x && snakeArray[i].y ===snakeArray[0].y){
        return true;
    }
}
    //If you bump into the wall
    if(snakeArray[0].x >=18 || snakeArray[0].x <=0 || snakeArray[0].y >=18 || snakeArray[0].y <=0)
        return true;
  
}

function gameEngine(){
    // part-1 update the snake array &food
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        let inputDir = {x:0,y:0}
        alert("game Over and press any key to continue!");
        let snakeArray = [{x:13 ,y:15}];
        

    }
    //If you have eaten the food -Increment the score and regenarate the food
    if(snakeArray[0].x ===food.x  && snakeArray[0].y === food.y){
        foodsound.play();
        score +=1;
        scoreBox.innerHTML = "Score :" + score;
        snakeArray.unshift({x:snakeArray[0].x + inputDir.x, y: snakeArray[0].y +inputDir.y});
        let a = 2;//2
        let b = 16;//16
        food ={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())}  //To genarate the random no.
    }

    //Move snake
    for(let i = snakeArray.length-2;i>=0;i--){
        snakeArray[i+1] ={...snakeArray[i]};

    }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;




    //part-2 Render the snake & food

    //display the snake
    Board.innerHTML = '';
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');    
            }
        Board.appendChild(snakeElement);
    })

    //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        Board.appendChild(foodElement);
    
}







//Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e)=>{
inputDir ={x:0 , y:1} //start game
moveSound.play();
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0 ;
        inputDir.y= -1;
        break;

    case "ArrowDown":
    console.log("ArrowDown");
        inputDir.x=0 ;
        inputDir.y=1 ;
    break;

    case "ArrowLeft":
    console.log("ArrowLeft");
        inputDir.x= -1;
        inputDir.y=0 ;
    break;

    case "ArrowRight":
    console.log("ArrowRight");
    inputDir.x=1 ;
    inputDir.y= 0;
    break;

    default:
        break;
}
})