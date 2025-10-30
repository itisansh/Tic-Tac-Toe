document.addEventListener("DOMContentLoaded", () => {
  // getElementsByClassName returns a list (HTMLCollection which is like an array but not an array), NOT a single element.+ u cannot use add eventListner to it
  // use queryselector for it
  // Use [0] to access one element, or use document.querySelectorAll() which has .forEach().
  const newGameBtn = document.querySelector(".new-game-btn");
  const resetBtn = document.querySelector(".reset-game-btn");
  const boxes = document.querySelectorAll(".box");
  // console.log(boxes);
  //document.getElementsByClassName('box') returns an HTMLCollection, which is an array-like object, but it is not a true JavaScript array and does not have the .forEach() method.
  const score = document.getElementById("score");
  const winner = document.querySelector(".winner");

  const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let count = 0;
  let player1 = true; // player1 = true = X player2 = false = o
  let player1Score = 0;
  let player2Score = 0;
  updateScore(player1Score, player2Score);

  for (const box of boxes) {
    box.addEventListener("click", () => {
      if (player1) {
        box.textContent = `X`;
        player1 = false;
        box.disabled = true;
        box.classList.add("player1");
        count++;
        checkWinner(boxes);
      } else {
        box.textContent = `O`;
        player1 = true;
        box.disabled = true;
        box.classList.add("player2");
        count++;
        checkWinner(boxes);
      }
    });
  }
  function checkWinner(boxes) {
    winPattern.forEach((pattern) => {
      const block1 = boxes[pattern[0]].textContent;
      const block2 = boxes[pattern[1]].textContent;
      const block3 = boxes[pattern[2]].textContent;

      if (block1 === "X" && block2 === "X" && block3 === "X") {
        console.log("winner is X");
        player1Score++;
        updateScore(player1Score, player2Score);
        disableAllBtns();
        winner.textContent = `Player 1 has won the match`;
        return;
      }
      if (block1 === "O" && block2 === "O" && block3 === "O") {
        console.log("winner is O");
        player2Score++;
        updateScore(player1Score, player2Score);
        disableAllBtns();
        winner.textContent = `Player 2 has won the match`;
        return;
      } else if (count === 9) {
        winner.textContent = `No one won the match`;
        count = 0;
      }
    });
  }
  resetBtn.addEventListener("click", () => {
    resetGame();
  });
  newGameBtn.addEventListener("click", () => {
    resetGame();
    player1Score = 0;
    player2Score = 0;
    updateScore(player1Score, player2Score);
  });

  function disableAllBtns() {
    for (const box of boxes) {
      box.disabled = true;
    }
  }

  function resetGame() {
    for (const box of boxes) {
      box.textContent = "";
      box.classList.remove("player1", "player2");
      box.disabled = false;
      winner.textContent = "";
      count = 0;
    }
  }
  function updateScore(player1Score, player2Score) {
    score.textContent = `${player1Score} - ${player2Score}`;
  }
});
