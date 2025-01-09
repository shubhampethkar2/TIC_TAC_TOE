let boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector("#Reset");
let newgame=document.querySelector("#newgame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#message");

let TurnO = true;  // playerX and playerO

const winPatterns=[
    [0,1,3],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
   box.addEventListener("click",()=>{
 if(TurnO){
box.innerText="O";
TurnO=false;
 }
 else{
    box.innerText="X";
    TurnO="true";
 }
 box.disabled=true;


 checkWinner();
   });
});


const Disableboxes = () => {
    for( let box of boxes ){
       box.disabled =true;
    }
}

const Enableboxes = () => {
    for( let box of boxes ){
       box.disabled =false;
       box.innerText="";
    }
}


const resetGame = () => {
    TurnO =true ;
    Enableboxes();
    msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations , winner is ${winner}`;
    msgContainer.classList.remove("hide");
Disableboxes();

};

const checkWinner = () => {
    for( let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
         let pos2val = boxes[pattern[1]].innerText;
         let pos3val = boxes[pattern[2]].innerText;

         if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
              

                showWinner(pos1val);
            }
         }
    }

 


};

newgame.addEventListener("click",resetGame);
Reset.addEventListener("click",resetGame);