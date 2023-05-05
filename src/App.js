import './App.css';
import React, { useState } from 'react';

const X="X";
const O="O";
let count = 0;

function App() {
  const [cells, setCells] = useState([["", "", ""], ["", "", ""], ["", "", ""]])
  const [currChar, setCurrChar] = useState(X); // X starts first
  const [gameEnded, setGameEnded] = useState(false);

  const cellClick = (row, column, id) => {
    if (!gameEnded) {
      if (cells[row][column] !== "") {
        console.log("This box has already been taken");
      } else {
        const newBoard = {...cells};
        newBoard[row][column] = currChar;
        setCells(newBoard);
        currChar === X ? setCurrChar(O) : setCurrChar(X);
        checkWinner();
        const box = document.getElementById(id);
        if (currChar === X) {
          box.style.color = "#AD5E6C"
        } else if (currChar === O) {
          box.style.color = "#EDC47F";
        }
        count += 1;
      }
    }
  }

  function resetApp () {
    window.location.reload();
  }

  const checkWinner = () => {
    if (checkAcross(currChar) || checkDiagonal(currChar)) {
      setGameEnded(true);
      const winnerText = document.getElementById("winner");
      winnerText.innerText = `Winner: ${currChar}`;
      winnerText.style.margin = "1rem";
      if (!localStorage.getItem(currChar)) {
        localStorage.setItem(currChar, 1);
      } else {
        localStorage.setItem(currChar, parseInt(localStorage.getItem(currChar)) + 1);
      }
      const resetBtn = document.createElement("button");
      resetBtn.innerText = "Reset Game";
      resetBtn.className="resetBtn"
      resetBtn.addEventListener("click", resetApp);
      document.getElementById("winner-content").append(resetBtn);
    } else if (count === 8) {
      setGameEnded();
      const resetBtn = document.createElement("button");
      resetBtn.innerText = "Reset Game";
      resetBtn.className="resetBtn"
      resetBtn.addEventListener("click", resetApp);
      document.getElementById("winner-content").append(resetBtn);
    }
  }

  const checkDiagonal = () => {
    if ((cells[0][0] === currChar && cells[1][1] === currChar && cells[2][2]) === currChar) {
      fillBoxes(["1", "5", "9"]);
      return true;
    }
    if ((cells[2][0] === currChar && cells[1][1] === currChar && cells[0][2]) === currChar) {
      fillBoxes(["3", "5", "7"]);
      return true;
    }
    return false;
  }

  const checkAcross = () => {
    // Check horizontally
    for (let i = 0; i < 3; i++) {
      if ((cells[i][0] === currChar && cells[i][1] === currChar && cells[i][2]) === currChar) {
        if (i === 0) {
          fillBoxes(["1", "2", "3"]);
        } else if (i === 1) {
          fillBoxes(["4", "5", "6"]);
        } else {
          fillBoxes(["7", "8", "9"]);
        }
        return true;
      }
    }

    // Check vertically
    for (let i = 0; i < 3; i++) {
      if ((cells[0][i] === currChar && cells[1][i] === currChar && cells[2][i]) === currChar) {
        if (i === 0) {
          fillBoxes(["1", "4", "7"]);
        } else if (i === 1) {
          fillBoxes(["2", "5", "8"]);
        } else {
          fillBoxes(["3", "6", "9"]);
        }
        return true;
      }
    }
    return false;
  }

  function fillBoxes(ids) {
    for (const i in ids) {
      const box = document.getElementById(ids[i]);
      console.log(box);
      box.style.backgroundColor = "#C8E9B7";
    }
  }

  const getPoints = (char) => {
    if (!localStorage.getItem(char)) {
      localStorage.setItem(char, 0);
    } 
    return localStorage.getItem(char);
  }

  return (
    <div className="main-body">
      <div className="Board" id="board">
        <div className="Row">
          <button id="1" onClick={() => cellClick(0, 0, "1")}>{cells[0][0]}</button>
          <button id="2" onClick={() => cellClick(0, 1, "2")}>{cells[0][1]}</button>
          <button id="3" onClick={() => cellClick(0, 2, "3")}>{cells[0][2]}</button>
        </div>
        <div className="Row">
          <button id="4" onClick={() => cellClick(1, 0, "4")}>{cells[1][0]}</button>
          <button id="5" onClick={() => cellClick(1, 1, "5")}>{cells[1][1]}</button>
          <button id="6" onClick={() => cellClick(1, 2, "6")}>{cells[1][2]}</button>
        </div>
        <div className="Row">
          <button id="7" onClick={() => cellClick(2, 0, "7")}>{cells[2][0]}</button>
          <button id="8" onClick={() => cellClick(2, 1, "8")}>{cells[2][1]}</button>
          <button id="9" onClick={() => cellClick(2, 2, "9")}>{cells[2][2]}</button>
        </div>
      </div>
      <div className="winner-content" id="winner-content">
        <p className="winner" id="winner"></p>
        <p className="X">X: {getPoints(X)}</p>
        <p className="O">O: {getPoints(O)}</p>
      </div>
    </div>
  );
}

export default App;



