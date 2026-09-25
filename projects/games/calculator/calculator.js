const keyMap = {
    'Numpad0': '0',
    'Numpad1': '1',
    'Numpad2': '2',
    'Numpad3': '3',
    'Numpad4': '4',
    'Numpad5': '5',
    'Numpad6': '6',
    'Numpad7': '7',
    'Numpad8': '8',
    'Numpad9': '9',
    'Digit0': '0',
    'Digit1': '1',
    'Digit2': '2',
    'Digit3': '3',
    'Digit4': '4',
    'Digit5': '5',
    'Digit6': '6',
    'Digit7': '7',
    'Digit8': '8',
    'Digit9': '9',
    'NumpadAdd': '+',
    'NumpadSubtract': '-',
    'NumpadMultiply': '*',
    'NumpadDivide': '/',
    'Equal': '=',
    'NumpadEnter': '=',
    'Escape': 'Clear'
};

let formula = ['', '', ''];
let hasError = false;

const ROW_COUNT = 7;
const COL_COUNT = 4;
const CELL_SIZE = 100;
const CELL_MARGIN = 7;
const FONT_SIZE = 30;

let calculatorContainer = document.getElementById('calculator');
calculatorContainer.style.maxWidth = CELL_SIZE * COL_COUNT;
calculatorContainer.style.maxHeight = CELL_SIZE * (ROW_COUNT - 0.5);

document.addEventListener('keydown', function(e) {
    let keyStroke = keyMap[e.code];
    if (keyStroke) {
        document.getElementById(String(keyStroke)).click();
    }
});

for (let y = 0; y < ROW_COUNT; y++) {
    let row = document.createElement('div');
    row.className = `calc-row row-${y}`;
    row.style.width = COL_COUNT * CELL_SIZE;
    row.style.height = CELL_SIZE / (y == 0 ? 2 : 1);
    calculatorContainer.append(row);
}

let rows = document.getElementsByClassName('calc-row');

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        let cell = createCell(String(7 - 3 * y + x), CELL_SIZE - 2 * CELL_MARGIN);
        cell.setAttribute('data-type', 'key-num');
        rows[y + 2].append(cell);
    }
}

let cell = createCell(String(0), 3 * CELL_SIZE - 2 * CELL_MARGIN);
cell.setAttribute('data-type', 'key-num');
rows[5].append(cell);

cell = createCell(String('='), 3 * CELL_SIZE - 2 * CELL_MARGIN);
cell.setAttribute('data-type', 'equal');
rows[6].append(cell);

let operators = ['+', '-', '*', '/', 'Clear'];
for (let c = 0; c < operators.length; c++) {
    cell = createCell(String(operators[c]), CELL_SIZE - 2 * CELL_MARGIN);
    cell.style.fontSize = (operators[c] !== 'Clear') ? '48px' : `${FONT_SIZE}px`;
    if (operators[c] !== 'Clear') {
        cell.setAttribute('data-type', 'operator');
    } else {
        cell.setAttribute('data-type', 'clear');
    }
    rows[c + 2].append(cell);
}

let display = document.createElement('input');
display.type = 'text';
display.id = 'display';
display.style.textAlign = 'end';
display.style.width = CELL_SIZE * COL_COUNT - 2 * CELL_MARGIN;
display.style.height = CELL_SIZE - 2 * CELL_MARGIN;
display.style.fontSize = FONT_SIZE;
display.style.margin = CELL_MARGIN;
display.disabled = true;
rows[1].append(display);

let imageContainer = document.createElement('a');
imageContainer.href = 'https://www.casio-intl.com/hk/zh/calc/';
let image = document.createElement('img');
image.src = './logo.png';
image.style.float = 'left';
image.style.width = '15%';
image.style.margin = 8;
image.style.marginLeft = 2 * CELL_MARGIN;
imageContainer.append(image);
rows[0].append(imageContainer);

document.getElementById('display').value = 0;

function createCell(text, w) {
    let cellDiv = document.createElement('div');
    cellDiv.className = 'calc-cell no-select';
    cellDiv.style.width = w - 2 * 3;
    cellDiv.style.height = CELL_SIZE - 2 * CELL_MARGIN - 2 * 3;
    cellDiv.style.fontSize = FONT_SIZE;
    cellDiv.style.margin = CELL_MARGIN;
    cellDiv.style.verticalAlign = 'middle';
    cellDiv.innerText = text;
    cellDiv.id = text;
    cellDiv.addEventListener('click', function() {
        let calculator = new Calculator();
        calculator.handleClick(this);
    });
    return cellDiv;
}

class Calculator {
    handleClick(target) {
        if (hasError) {
            if (target.id == 'Clear') {
                formula = ['', '', ''];
                hasError = false;
            } else {
                return;
            }
        }

        let isValid = true;
        if (['+', '-', '*', '/'].includes(target.innerText)) {
            if (formula[0]) {
                if (formula[1]) {
                    isValid = false;
                } else {
                    formula[1] = target.innerText;
                }
            }
        } else {
            if (target.innerText == 'Clear') {
                formula = ['', '', ''];
            } else {
                if ('=' == target.innerText) {
                    if (formula[0] && formula[2]) {
                        switch (formula[1]) {
                            case '+':
                                formula[0] = String(Number(formula[0]) + Number(formula[2]));
                                break;
                            case '-':
                                formula[0] = String(Number(formula[0]) - Number(formula[2]));
                                break;
                            case '*':
                                formula[0] = String(Number(formula[0]) * Number(formula[2]));
                                break;
                            case '/':
                                formula[0] = String(Number(formula[0]) / Number(formula[2]));
                                if (Number(formula[2]) == 0) {
                                    hasError = true;
                                }
                                break;
                        }
                        formula[1] = '';
                        formula[2] = '';
                    }
                } else {
                    if (formula[1]) {
                        if (Number(formula[2]) != 0 || formula[2] === '') {
                            formula[2] += target.innerText;
                        }
                    } else {
                        if (Number(formula[0]) != 0 || formula[0] === '') {
                            formula[0] += target.innerText;
                        }
                    }
                }
            }
        }

        if (isValid) {
            if (formula[0] == '') {
                document.getElementById('display').value = 0;
            } else {
                document.getElementById('display').value = formula.join('');
            }
        }
    }
}
