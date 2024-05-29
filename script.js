const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelectorAll('.player1');
const player2 = document.querySelectorAll('.player2');
const restartBtn = document.querySelectorAll('.restartBtn');

// making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;



//function to start game
const startGame = () => {

    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            console.log(`${playerTurn} is a Winner`);
            disableCells();
            alert(`${playerTurn} is a Winner`);

        }
        else if (checkTie()) {
            console.log(`It's a tie!`);
            disableCells();
            alert(`It's a tie!`);
        }
        winner();
        changePlayerTurn();
    }
}
//funtion to change player turn
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
    document.getElementById('turn').innerHTML = 'Player ' + playerTurn + `'s turn`;

}
//to display who is winner
const winner = () => {
    if (checkWin()) {
        document.getElementById('tur').innerHTML = playerTurn + `is winner`;
    }

    else if (checkTie()) {
        document.getElementById('tur').innerHTML = `It's a tie!`;
    }
}

//function to check win
const checkWin = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        if (gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
        }
        //console.log(`${pos1} ${pos2} ${pos3}`);
    }
    return false;
}
//function to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWin();
}
//function to disable game-board cell after win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

//function to restart game
document.querySelector('.restartBtn').addEventListener('click', function () {
    window.location.reload();
    return false;
});
//calling startGame function
startGame();