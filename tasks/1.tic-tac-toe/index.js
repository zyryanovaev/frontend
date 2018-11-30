const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const container = document.getElementById('fieldWrapper');

let fieldSide;
let field = [];
let currentPlayer;
let currentStepNumber;
let winnerIsExist;

fieldSide = prompt('Введите размер стороны поля', 3);
startGame();
addResetListener();

function createGrid(){
    for (let i = 0; i < fieldSide; i++) {
        field[i] = [];
        for (let j = 0; j < fieldSide; j++) {
            field[i][j] = EMPTY;
        }
    }
}

function startGame() {
    if (fieldSide) {
        renderGrid();
        createGrid();
        currentPlayer = ZERO;
        currentStepNumber = 0;
        winnerIsExist = false;
    }
}

function renderGrid() {
    container.innerHTML = '';

    for (let i = 0; i < fieldSide; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < fieldSide; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function makeWinnerRed(x, y, shiftX, shiftY) {
    for (let i = 0; i < fieldSide; i++) {
        x -= shiftX;
        y -= shiftY;
        findCell(x, y).style.color = '#FF0000';
    }
}

function checkСombination(x, y, shiftX, shiftY) {
    for (let i = 0; i < fieldSide; i++) {
        if (field[x][y] !== currentPlayer)
            return false;
        x += shiftX;
        y += shiftY;
    }
    makeWinnerRed(x, y, shiftX, shiftY);
    return true;
}

function checkWin(row, col) {
    return checkСombination(row, 0, 0, 1) ||
        checkСombination(0, col, 1, 0) ||
        checkСombination(0, 0, 1, 1) ||
        checkСombination(0, 2, 1, -1);
}

function cellClickHandler(row, col) {
    if (field[row][col] === EMPTY && !winnerIsExist) {
        renderSymbolInCell(currentPlayer, row, col);
        field[row][col] = currentPlayer;
        currentStepNumber++;
        if (checkWin(row, col)) {
            alert("Победил " + currentPlayer);
            winnerIsExist = true;
        }
        currentPlayer = currentPlayer === ZERO ? CROSS : ZERO;
    }
    if (currentStepNumber === fieldSide * fieldSide) {
        alert("Победила дружба");
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame();
    renderGrid(fieldSide);

}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function artificialIntelligence() {
    
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
