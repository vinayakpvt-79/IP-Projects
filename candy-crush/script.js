const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const targetDisplay = document.getElementById('target');
const messageDisplay = document.getElementById('message');
const width = 8;
const squares = [];
const candyColors = ['red', 'yellow', 'blue', 'green', 'orange', 'purple'];

let score = 0;
let moves = 20;
let targetScore = 500;
let gameOver = false;

// Create Board
function createBoard() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        square.style.backgroundColor = randomColor;
        square.classList.add('candy');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();

// Dragging
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', dragOver));
squares.forEach(square => square.addEventListener('dragenter', dragEnter));
squares.forEach(square => square.addEventListener('dragleave', dragLeave));
squares.forEach(square => square.addEventListener('drop', dragDrop));

function dragStart() {
    if (gameOver) return;
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    if (gameOver) return;
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}

function dragEnd() {
    if (gameOver) return;
    
    const validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width
    ];
    const validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
        // Decrease moves only on valid move
        moves--;
        movesDisplay.textContent = moves;
        
        // Check for matches after valid move
        let hadMatches = checkForMatches();
        
        // If matches were found, process them
        if (hadMatches) {
            setTimeout(() => {
                moveDown();
                setTimeout(checkForMatches, 100);
            }, 300);
        }
        
        checkGameStatus();
    } else if (squareIdBeingReplaced && !validMove) {
        // Swap back if invalid move
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
}

// Check Matches - returns true if matches were found
function checkForMatches() {
    let matched = false;
    
    // Check rows
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = decidedColor === '';

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63];
        if (notValid.includes(i)) continue;

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            // Add score
            score += 30;
            scoreDisplay.textContent = score;
            matched = true;
            
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
            });
        }
    }

    // Check columns
    for (let i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = decidedColor === '';

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            // Add score
            score += 30;
            scoreDisplay.textContent = score;
            matched = true;
            
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
            });
        }
    }
    
    return matched;
}

// Drop candies
function moveDown() {
    for (let i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundColor === '') {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
            squares[i].style.backgroundColor = '';
        }
    }

    for (let i = 0; i < 8; i++) {
        if (squares[i].style.backgroundColor === '') {
            let randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            squares[i].style.backgroundColor = randomColor;
        }
    }
}

// Check game status
function checkGameStatus() {
    if (score >= targetScore) {
        gameOver = true;
        messageDisplay.textContent = "You Win! 🎉";
        messageDisplay.className = "win";
    } else if (moves <= 0) {
        gameOver = true;
        messageDisplay.textContent = "Game Over! 😞";
        messageDisplay.className = "lose";
    }
}