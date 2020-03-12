const container = document.querySelector('.calc-container');
const displayActive = document.querySelector('.display-active');
const displaySecond = document.querySelector('.display-second');
const displayTop = document.querySelector('.display-top');
let activeTotal = 0;
const operatorIncludedMatch = /[/x+%-]/;
const operatorBadMatch = [/[/x+%-]$/gm, /[^\w\s]{2,}/];
const operationSplit = /(\d+[x/+-]\d+)|([x/+-]\d+)/g;

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
  'clear': 'C',
  'back': '⌫'
};

const operate = {
  '+': (num1, num2) => { return num1 + num2 },
  '-': (num1, num2) => { return num1 - num2 },
  'x': (num1, num2) => { return num1 * num2 },
  '/': (num1, num2) => {
    if (num1 === 0 || num2 === 0) {
      activeTotal = 0;
      return 'Stahp';
    }
    return num1 / num2;
  },
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
  if (!btn.textContent.match(/[=%C⌫]/)) {
    btn.addEventListener('click', () => {
      addToDisplay(btn.textContent);
    })
  } else if (btn.textContent === 'C') {
    btn.addEventListener('click', () => {
      clearDisplay();
    })
  } else if (btn.textContent === '⌫') {
    btn.addEventListener('click', () => {
      backSpace();
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
  input = input.match(operationSplit);
  input.forEach((operation) => {
    let temp = operation.split(/(\d+)/).filter((element) => { return element !== '' });
    if (temp[0].match(/\d+/)) {
      activeTotal = operate[temp[1]](+temp[0], +temp[2])
    } else if (temp[0].match(/[+-x/]/)) {
      activeTotal = operate[temp[0]](+activeTotal, +temp[1]);
    }
  });
  return activeTotal.toFixed(2).replace(/[.]00$/, '');
}

function clearDisplay() {
  displayTop.textContent = '';
  displaySecond.textContent = '';
  displayActive.textContent = '0';
  activeTotal = 0;
}

function backSpace() {
  displayActive.textContent = displayActive.textContent.slice(0, -1).trimEnd();
}