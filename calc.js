const container = document.querySelector('.calc-container');
const displayActive = document.querySelector('.display-active');
const displaySecond = document.querySelector('.display-second');
const displayTop = document.querySelector('.display-top');
let activeTotal = 0;
const operatorIncludedMatch = /[/x+%-]/;
const operatorBadMatch = [/[/x+%-]$/gm, /[^\w\s]{2,}/];

window.onload = () => {
  displayActive.textContent = activeTotal;
  setButtons();
};

const buttonsList = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'zero': 0,
  'dot': '.',
  'percent': '%',
  'divide': '/',
  'mult': 'x',
  'sub': '-',
  'add': '+',
  'eq': '=',
  'clear': 'C'
};

// TODO instead of making new operators array, check against keys in operate obj

const operate = {
  '+': (num1, num2) => { return num1 + num2 },
  '-': (num1, num2) => { return num1 - num2 },
  'x': (num1, num2) => { return num1 * num2 },
  '/': (num1, num2) => { return (num1 / num2).toFixed(3) },
  '%': (num1, num2) => { return 'woops' }
};

function setButtons() {
  for (let button in buttonsList) {
    let btn = document.createElement('button');
    btn.classList.add('btn', button);
    btn.textContent = buttonsList[button];
    setEvents(btn);
    container.appendChild(btn);
  }
}

function setEvents(btn) {
  if (!btn.textContent.match(/[=%C]/)) {
    btn.addEventListener('click', () => {
      addToDisplay(btn.textContent);
    })
  } else if (btn.textContent === 'C') {
    btn.addEventListener('click', () => {
      clearDisplay();
    })
  } else {
    btn.addEventListener('click', () => {
      activeTotal = parseDisplay();
      addToDisplay(activeTotal, true);
    })
  }
}

function addToDisplay(btn, operateNow = false) {
  if (operateNow) {
    shiftDisplay(btn);
  } else {
    if (displayActive.textContent === '0' || displayActive.textContent === 'Err') {
      displayActive.textContent = btn;
    } else if (btn in operate) {
      displayActive.textContent += ` ${btn} `
    } else {
      displayActive.textContent += `${btn}`;
    }
  }
}

function shiftDisplay(btn) {
  displayTop.textContent = displaySecond.textContent;
  displaySecond.textContent = displayActive.textContent;
  displayActive.textContent = btn;
}

function parseDisplay() {
  let parsedInput = displayActive.textContent.replace(/\s/gm, '');
  if (parsedInput[0].match(operatorIncludedMatch)) { return 'Err' }
  if (!findOperator(parsedInput)) { return 'Err' }
  if (badOperator(parsedInput)) { return 'Err' }
  parsedInput = splitOperations(parsedInput);   // TODO
  console.log(displayActive.textContent);
  return parsedInput;
}

function findOperator(input) {
  return operatorIncludedMatch.test(input);
}

function badOperator(input) {
  if (operatorBadMatch[0].test(input) || operatorBadMatch[1].test(input)) { return true }
}

function splitOperations(input) {
  // TODO use unshift (beginning) on div and mult, and push (end) for sub and add for order of operations
  // \d+[x%-\/+]\d+
  // if next block starts with an operator ( [x%-\/+]\d+ ), only cut the operator and number after it
  // make sure you can still just +3 on a cleared input and have it add 3 to 0, etc
}

function clearDisplay() {
  displayTop.textContent = '';
  displaySecond.textContent = '';
  displayActive.textContent = '0';
  activeTotal = 0;
}