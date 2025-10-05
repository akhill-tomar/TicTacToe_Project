let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let winMsg = document.querySelector("#win-msg");
let main = document.querySelector("main");
let drawMsg = document.querySelector("#draw-msg");

let turn = true; //to set the intial turn for the playerO or playerX
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turn = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn){
            box.innerText = "O";
            turn = false;
        }
        else{
            box.innerText = "X";
            turn = true;
        }
        count++;
        box.disabled = true;
        

        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        winMsg.innerText = "";
        drawMsg.innerText = "";
        main.classList.remove("hide-main");
    }
}

const drawGame = () => {
    main.classList.add("hide-main");
    drawMsg.innerText = `DRAW`;
    winMsg.innerText = "";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) => {
    main.classList.add("hide-main");
    winMsg.innerText = `Congratulations, Winner is Player ${winner}`;
    drawMsg.innerText = "";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos1Val === pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    if(!winnerFound && count == 9){
        drawGame();
    }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);