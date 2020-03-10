const container = document.querySelector('.calc-container');
const displayActive = document.querySelector('.display-active');
const displaySecond = document.querySelector('.display-second');
const displayTop = document.querySelector('.display-top');

window.onload = () => {
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
  if (btn.textContent !== '=') {
    btn.addEventListener('click', () => {
      addToDisplay(btn.textContent);
    })
  } else {
    btn.addEventListener('click', () => {
      let calculate = parseDisplay();
      addToDisplay(calculate, true);
    })
  }
}

function addToDisplay(btn, equals = false) {
  if (equals) {
    shiftDisplay(btn);
  } else {
    if (displayActive.textContent === '0') {
      displayActive.textContent = btn;
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
  console.log(displayActive.textContent);
  return 'no return set'
}