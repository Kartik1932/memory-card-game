const icons = ["🍎","🍌","🍇","🍒","🍋","🍊","🍓","🍉"];
    let cards = [...icons, ...icons];
    let firstCard = null;
    let lockBoard = false;
    let moves = 0;
    let timer = 0;
    let timerInterval = null;
    let gameStarted = false;

    const gameBoard = document.getElementById("gameBoard");
    const movesEl = document.getElementById("moves");
    const timerEl = document.getElementById("timer");
    const bestEl = document.getElementById("best");

    // Load best score
    let bestScore = localStorage.getItem("bestScore");
    if (bestScore) bestEl.textContent = bestScore;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = timer;
      }, 1000);
    }

    function resetGame() {
      gameBoard.innerHTML = "";
      cards = shuffle(cards);
      firstCard = null;
      lockBoard = false;
      moves = 0;
      movesEl.textContent = moves;
      timer = 0;
      timerEl.textContent = timer;
      gameStarted = false;
      clearInterval(timerInterval);

      cards.forEach(icon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
      });
    }

    function flipCard() {
      if (lockBoard || this.classList.contains("flipped")) return;

      if (!gameStarted) {
        gameStarted = true;
        startTimer();
      }

      this.textContent = this.dataset.icon;
      this.classList.add("flipped");

      if (!firstCard) {
        firstCard = this;
      } else {
        moves++;
        movesEl.textContent = moves;
        checkForMatch(this);
      }
    }

    function checkForMatch(secondCard) {
      if (firstCard.dataset.icon === secondCard.dataset.icon) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;

        // Check win condition
        if (document.querySelectorAll(".matched").length === cards.length) {
          clearInterval(timerInterval);
          setTimeout(() => {
            alert(`You won in ${moves} moves and ${timer} seconds!`);

            if (!bestScore || moves < bestScore) {
              bestScore = moves;
              localStorage.setItem("bestScore", bestScore);
              bestEl.textContent = bestScore;
            }

            resetGame();
          }, 300);
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          lockBoard = false;
        }, 800);
      }
    }

    resetGame();