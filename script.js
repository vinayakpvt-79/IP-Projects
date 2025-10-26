let boxes=document.querySelectorAll(".box");
let msg=document.querySelector("#msg");
let restartBtn=document.querySelector("#restart");
let playerX=true;
const winpatterns=
[ [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];
let count=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (playerX) {
        //playerX
        box.innerText = "X";
    playerX= false;
      } else {
        //playerO
        box.innerText = "O";
      playerX = true;
      }
      box.disabled=true;
      count++;
      let iswinner=winner();
      if( count===9 && !iswinner)
      {
        draw();
      }
}
);
}
);
//finding winner
function winner(){
 for( let pattern of winpatterns)
 {
    let val1= boxes[pattern[0]].innerText;
    let val2= boxes[pattern[1]].innerText;
    let val3= boxes[pattern[2]].innerText;
 if(val1!=""&&val2!=""&&val3!="")
    if(val1===val2 &&val2 ===val3){
     msg.style.display="block";
     let winner = val1 === "X" ? "Player1" : "Player2";
     msg.innerText = `Congratulations!! ${winner} is the Winner!`;
     for (let box of boxes) {
        box.disabled = true;
    }
    return true;
  }
}
return false;
}
 let draw=()=>{
    {   msg.style.display="block"; 
      msg.innerText = "Oops!!Game draw!";
      for (let box of boxes) {
        box.disabled = true;
    }
    }
}
restartBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
      box.innerText = "";
      box.disabled = false;
  });
  msg.style.display = "none";
  playerX = true;
  count=0;
});