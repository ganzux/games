// Create the canvas and set its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the game variables
let score = 0;
let time = 60;
let gems = [];

// Set the player variables
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 20,
  height: 20,
  speed: 50
};

// Handle player movement
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 37) {
    player.x -= player.speed;
  } else if (event.keyCode === 39) {
    player.x += player.speed;
  }
});

// Create a function to spawn gems
function spawnGem() {
    const colors = ['#FF0000', '#00FF00', '#0000FF'];
    const x = Math.random() * (canvas.width - 50) + 25;
    const y = -20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    gems.push({x, y, color});
    
    // Add the following line to fill the rectangle
    ctx.fillStyle = color;
    ctx.fillRect(x - 10, y - 10, 20, 20);
  }
  

// Create a function to update the game
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillStyle = '#000000';
  ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

  // Draw the gems
  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];
    ctx.fillStyle = gem.color;
    ctx.fillRect(gem.x - 10, gem.y - 10, 20, 20);
    gem.y += 5;
    if (gem.y > canvas.height + 10) {
      gems.splice(i, 1);
    } else if (gem.x > player.x - player.width / 2 && gem.x < player.x + player.width / 2 && gem.y > player.y - player.height / 2 && gem.y < player.y + player.height / 2) {
      gems.splice(i, 1);
      score += 10;
    }
  }

  // Update the score and time
  ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('Time: ' + time, canvas.width - 100, 30);

  // Decrease the time
  time -= 0.01;
  if (time <= 0) {
    clearInterval(interval);
    alert('Game over! Your score is ' + score);
  }
}

// Call the spawnGem function every second
setInterval(spawnGem, 1000);

// Call the update function every frame
const interval = setInterval(update, 16.67);
