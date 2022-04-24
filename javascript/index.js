const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

let tempData = '', lastSubTotal = 0, subTotal = 0, currentOperator = '';

const LCD = (arg) => {
  switch (arg) {
    //----operator arguments----//
    case 'op-off': return document.getElementById('LCDoperator').innerHTML = '&nbsp;';
    case '+': return document.getElementById('LCDoperator').innerHTML = '+';
    case '-': return document.getElementById('LCDoperator').innerHTML = '-';
    case 'x': return document.getElementById('LCDoperator').innerHTML = 'x';
    case '/': return document.getElementById('LCDoperator').innerHTML = '&#xF7';
    case '%': return document.getElementById('LCDoperator').innerHTML = '%';
    case 'root': return document.getElementById('LCDoperator').innerHTML = '&#8730';
    //----memory arguments----//
    case 'mem-off': return document.getElementById('LCDmemory').innerHTML = '&nbsp;';
    case 'mem-on': return document.getElementById('LCDmemory').innerHTML = 'M';

  }
};



// begin program
//--------------------------//
const begin = (button) => {
  let input = document.getElementById(button);
  console.log(button, input);
  if (fButtons.includes(button) === false) recordInput(input);
  functionButton(button, input);
};

// Record input from user
//--------------------------//
const recordInput = (input) => {
  if (tempData === '0' && input != '.') return;
  if (tempData.length === 0 && input === '.') input = '0.';
  tempData = tempData + input;
  updateDisplay(tempData);
  return;
};

// Function buttons
//--------------------------//
const functionButton = (button, input) => {
  switch (button) {
    case "cce": return clear();
    case "addition": return operator('+');
    case "subtraction": return operator('-');
    case "multiply": return operator('*');
    case "equals": return equals();
    case "M+": return LCD('mem-on');
  }
  return;
};


// clear - clear all button
//--------------------------//
const clear = () => {
  LCDoperator = '';
  if (tempData.length > 0) {
    subTotal = lastSubTotal;
    lastSubTotal = 0;
  } else {
    if (lastSubTotal == 0) {
      subTotal = 0;
    }
  }
  if (tempData === '') {
    lastSubTotal = 0;
    subTotal = 0;
  }
  tempData = '';
  updateDisplay(0);
  return;
};

// Addiction button
//--------------------------//
const addition = () => {
  console.log('+ function start');

  if (isNaN(parseFloat(tempData))) {
    currentOperator = '+';
    LCD('+');
    return;
  }
  console.log('addition indicator on');
  currentOperator = '+';
  LCD('+');
  subTotal = subTotal + parseFloat(tempData);
  lastSubTotal = subTotal;
  tempData = '';
  updateDisplay(subTotal);
  return;
};

// subtraction button
//--------------------------//
const subtraction = () => {
  console.log('- function start');

  if (isNaN(parseFloat(tempData))) {
    currentOperator = '-';
    LCD('-');
    return;
  }
  console.log('subtraction indicator on');
  currentOperator = '-';
  LCD('-');
  subTotal = subTotal - parseFloat(tempData);
  lastSubTotal = subTotal;
  tempData = '';
  updateDisplay(subTotal);
  return;
};

// operator button
//--------------------------//
const operator = (arg) => {
  console.log(arg, ' function start');
  equals();
  if (isNaN(parseFloat(tempData))) {
    currentOperator = arg;
    LCD(arg);
    return;
  }
  console.log(arg, ' indicator on');
  currentOperator = arg;
  LCD(arg);
  switch (arg) {
    case '+': subTotal = subTotal + parseFloat(tempData); break;
    case '-': subTotal = subTotal - parseFloat(tempData); break;
    case '*': subTotal = subTotal * parseFloat(tempData); break;
  }
  lastSubTotal = subTotal;
  tempData = '';
  updateDisplay(subTotal);
  return;
};

// Equals function
//--------------------------//
const equals = () => {
  if (tempData === '') {
    tempData = subTotal;
    tempData = '';
    updateDisplay(subTotal);
  }
  switch (currentOperator) {
    case '+': {
      console.log('plus case');
      if (tempData.length > 0) {
        subTotal = subTotal + parseFloat(tempData);
      }
      break;
    }
    case '-': {
      console.log('minus case');
      if (tempData.length > 0) {
        subTotal = subTotal - parseFloat(tempData);
      }
    }
    case '*': {
      console.log('minus case');
      if (tempData.length > 0) {
        subTotal = subTotal * parseFloat(tempData);
      }
    }
  }

  tempData = '';
  currentOperator = '';
  LCD('op-off');
  updateDisplay(subTotal);
  return;
};

// Update LCD display
//--------------------------//
const updateDisplay = (value) => {
  if (value.length >= 9) return;
  if (tempData === '' && subTotal === 0) value = 0;
  LCDnumbers = value;
  console.log("sub-total=", subTotal, "last-sub-total=", lastSubTotal, "tempData=", tempData);
  return;
};
