// Define the size of the grid (number of polygons per row/column)
const SIZE = 9;

// Define the size of the polygons (in pixels)
const POLYGON_SIZE = 75;

// Define the canvas size (in pixels)
const CANVAS_SIZE = SIZE * POLYGON_SIZE;

// Define the colors for the polygons and text
const POLYGON_COLOR = '#FFFFFF';
const TEXT_COLOR = '#000000';

// Define the game board
let board = [];

// Generate the game board
function generateBoard() {
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = 0;
    }
  }
}

// Draw the game board
function drawBoard() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      context.fillStyle = POLYGON_COLOR;
      context.fillRect(j * POLYGON_SIZE, i * POLYGON_SIZE, POLYGON_SIZE, POLYGON_SIZE);
      
      context.fillStyle = TEXT_COLOR;
      context.font = 'bold 24px sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(board[i][j], j * POLYGON_SIZE + (POLYGON_SIZE / 2), i * POLYGON_SIZE + (POLYGON_SIZE / 2));
    }
  }
}

// Check if a number can be placed in a polygon
function canPlaceNumber(row, col, num) {
  // Check the row
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }
  
  // Check the column
  for (let i = 0; i < SIZE; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }
  
  // Check the polygon
  const polyRow = Math.floor(row / 2) * 2;
  const polyCol = Math.floor(col / 2) * 2;
  
  for (let i = polyRow; i < polyRow + 2; i++) {
    for (let j = polyCol; j < polyCol + 2; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }
  
  return true;
}

// Solve the game
function solve() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === 0) {
        for (let num = 1; num <= SIZE; num++) {
          if (canPlaceNumber(i, j, num)) {
            board[i][j] = num;
            if (solve()) {
              return true;
            }
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Initialize the game
function init() {
  generateBoard();
  solve();
  drawBoard();
}

init();
