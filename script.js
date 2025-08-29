const board = document.querySelector(".game-board");
const winMessage = document.getElementById("winMessage")

const emojis = ["🍎","🍌","🍓","🍇","🍉","🍍","🥑","🍒"];
let cards = [...emojis, ...emojis];

cards.sort(()=>Math.random() - 0.5);

// const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = emojis.length;

cards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
})

function flipCard() {
    if(lockBoard) return;

    if(this.classList.contains("flipped") || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.emoji;

    if(!firstCard)
        firstCard = this;
    else
    {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    if(firstCard.dataset.emoji === secondCard.dataset.emoji){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        if(matchedPairs === totalPairs){
            winMessage.style.display = "block";
        }
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}