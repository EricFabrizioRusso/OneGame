let d= document, w=window,n= navigator;

let canvas= d.getElementById("canvas"),
 context= canvas.getContext('2d'),
 ballRadius= 9,
 x = canvas.width / (Math.floor(Math.random() * Math.random()) + 3),
 y =canvas.height - 40,
 dx= 2,
 dy = -2;




let paddleHeight= 12,
    paddleWidth= 122;


let paddleX=(canvas.width - paddleWidth) / 2;

//Bricks
let rowCount= 5,
    columCount= 9,
    brickWidth= 54,
    brickHeight= 18,
    brickPadding= 12,
    topOffset= 40,
    leftOffset= 33,
    score= 0;



//bricks array
let bricks= [];
for(let c= 0; c < columCount; c++){

   bricks[c]=[];
    //console.log(example)
    for (let r= 0; r < rowCount; r++){

        //Set Position of bricks
        bricks[c][r] = {x: 0, y: 0, status: 1};
        //console.log(example2)

    }


}

//Mouse moving eventListener and function

//Move paddle with mouse
const mouseMoveHandler=(e)=>{
    
    var relativeX= e.clientX - canvas.offsetLeft;
    if(relativeX > 0 &&  relativeX < canvas.width){
        
        paddleX = relativeX - paddleWidth / 2;
        
        
    }
    
    
}

d.addEventListener("mousemove" ,mouseMoveHandler, false);
/*document.addEventListener("mousemove", mouseMoveHandler, false);

// Move paddle with mouse
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}*/


const drawPaddle=()=>{

    context.beginPath();
    context.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();



}



const drawBall=()=>{

    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle= '#454DD9';
    context.fill();
    context.closePath();



}


function drawBricks(){

    for(let c= 0; c < columCount; c++){

        for(let r= 0; r < rowCount; r++){

            if(bricks[c][r].status === 1){

                let brickX= (c * (brickWidth + brickPadding) + leftOffset);

                let brickY= (r * (brickHeight + brickPadding) + topOffset) ;

                
                
                bricks[c][r].x = brickX;

                bricks[c][r].y = brickY;

                context.beginPath();
                context.roundRect(brickX,brickY, brickWidth, brickHeight, 30);
                context.fillStyle= '#333';
                context.fillStyle=`rgb(
                    ${Math.floor(255 - 42.5 * c)},
                    ${Math.floor(255 - 42.5 * r)},
                    0)`;
                context.fill();
               
                context.closePath();



            }

        }

    }

}

const trackScore=()=>{

    context.font = 'bold 16px sans-serif';
    context.fillStyle = '#333';
    context.fillText('Score : ' + score, 8, 24);



}

//check ball hit bricks
const hitDetection=()=>{
    for(let c= 0; c < columCount; c++){
        for(let r= 0; r < rowCount; r++){
           
            let b= bricks[c][r];
            //console.log(b.status)
            if(b.status === 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy= -dy;
                    b.status = 0;   
                    score ++;
                    
                    //Check Win

                    if(score === 5){

                        dx= 4;
                        dy= -4;
                        
                        

                    }

                    if(score === rowCount * columCount){
                        alert('You Win');
                        d.location.reload();
                    }


                }

                
            }

        }

    }


}




const init=()=>{

    context.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    trackScore();
    drawBricks();
    drawPaddle();
    hitDetection();

    //Detect right and left wall
    if(x + dx > canvas.width - ballRadius ||  x + dx < ballRadius){

        console.log("se detecto una pared")
        dx = -dx;

    }

    //Detect top wall
    if(y + dy < ballRadius){

        dy= -dy;

    }else if(y + dy > canvas.height - ballRadius){

        //Detect Paddle hits
        if(x > paddleX && x < paddleX + paddleWidth){


            dy= -dy;

        }else{


            //If ball don't hit paddle
            alert('Game Over!');
            d.location.reload();

        }
        
    }
    //Bottom wall
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
    
        dy = -dy;
    
    }
    
    //Move Ball
    
    x += dx;
    y += dy;

 
}


setInterval(init,10)


