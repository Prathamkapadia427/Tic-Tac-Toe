const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');
const playerXCard = document.getElementById('playerX');
const playerOCard = document.getElementById('playerO');
const restartButton = document.getElementById('restart');
const resetButton = document.getElementById('reset');

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

function updateTurnDisplay() {
  playerXCard.classList.toggle('active', currentPlayer === 'X' && gameActive);
  playerOCard.classList.toggle('active', currentPlayer === 'O' && gameActive);
}

function checkWinner() {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winningLine = checkWinner();
  if (winningLine) {
    gameActive = false;
    scores[currentPlayer]++;
    scoreXText.textContent = scores.X;
    scoreOText.textContent = scores.O;
    winningLine.forEach(position => cells[position].classList.add('winner'));
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    updateTurnDisplay();
    return;
  }

  if (board.every(value => value !== '')) {
    gameActive = false;
    statusText.textContent = "It's a draw! 🤝";
    updateTurnDisplay();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  updateTurnDisplay();
}

function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'winner');
  });
  statusText.textContent = "Player X's turn";
  updateTurnDisplay();
}

function resetScore() {
  scores = { X: 0, O: 0 };
  scoreXText.textContent = '0';
  scoreOText.textContent = '0';
  restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
resetButton.addEventListener('click', resetScore);
updateTurnDisplay();
