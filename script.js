// Selecting elements
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
const moveCountEl = document.getElementById('move-count');
const timerEl = document.getElementById('timer');

// Emoji list (you can replace with images if you want later)
const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍍', '🥝', '🍒'];

let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let timer = 0;
let interval;

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create the board
function createBoard() {
  const shuffledCards = shuffle(cards);
  board.innerHTML = '';
  shuffledCards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// Flip a card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
    this.textContent = this.dataset.emoji;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }
}

// Check if two cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedCards.push(card1, card2);
  } else {
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
  moveCount++;
  moveCountEl.textContent = moveCount;

  if (matchedCards.length === cards.length) {
    clearInterval(interval);
    setTimeout(() => {
      alert(`You won in ${moveCount} moves and ${timer} seconds! 🎉`);
    }, 500);
  }
}

// Start the timer
function startTimer() {
  timer = 0;
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

// Restart the game
restartButton.addEventListener('click', () => {
  resetGame();
});

// Reset everything
function resetGame() {
  clearInterval(interval);
  moveCount = 0;
  moveCountEl.textContent = moveCount;
  timer = 0;
  timerEl.textContent = timer;
  flippedCards = [];
  matchedCards = [];
  createBoard();
  startTimer();
}

// Initialize
resetGame();
