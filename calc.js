let operate = {
  '+': (num1, num2) => { return num1 + num2 },
  '-': (num1, num2) => { return num1 - num2 },
  'x': (num1, num2) => { return num1 * num2 },
  '/': (num1, num2) => { return (num1 / num2).toFixed(3) },
  '%': (num1, num2) => { return "woops" }
};