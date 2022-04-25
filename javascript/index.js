
const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

let tempData = '', lastSubTotal = 0, subTotal = 0, errorState = false;

const lcd = (arg) => {
  switch (arg) {
    //------- Operator indicators --------//
    case 'opOff': return document.getElementById('LCDoperator').innerHTML = '&nbsp;';
    case '+': return document.getElementById('LCDoperator').innerHTML = '+';
    case '-': return document.getElementById('LCDoperator').innerHTML = '-';
    case '*': return document.getElementById('LCDoperator').innerHTML = 'x';
    case '/': return document.getElementById('LCDoperator').innerHTML = '&#xF7';
    case '%': return document.getElementById('LCDoperator').innerHTML = '%';
    case 'root': return document.getElementById('LCDoperator').innerHTML = '&#8730';
    //------- Memory indicators --------//
    case 'memOff': return document.getElementById('LCDmemory').innerHTML = '&nbsp;';
    case 'm': return document.getElementById('LCDmemory').innerHTML = 'M';
    default: return;
  }
};

// begin program
//--------------------------//
const begin = (button) => {
  if (errorState === true && button != 'cce') return;
  errorState = false;
  let input = document.getElementById(button).innerHTML;
  console.log(button, input);
  if (fButtons.includes(button) === false) recordInput(input);
  functionButton(button, input);
};

// Record input from user
//--------------------------//
const recordInput = (input) => {
  if (tempData === '0' && input != '.') return;
  if (tempData.length === 0 && input === '.') input = '0.';
  if (tempData.length >= 8) return console.log('screen capacity exceeded');
  tempData = tempData + input;
  updateDisplay(tempData);
  return;
};

// Function buttons
//--------------------------//
const functionButton = (button, input) => {
  switch (button) {
    case "cce": return clear();
    case "addition": return addition();
    case "subtraction": return subtraction();
    case "equals": return equals();
  }
  return;
};


// clear - clear all button
//--------------------------//
const clear = () => {
  console.log('$$$$$');
  lcd('memOff');
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
  lcd('opOff');
  lcd('memOff');
  updateDisplay(0);
  return;
};

// Addition button
//--------------------------//
const addition = () => {
  console.log('+ function start');

  if (isNaN(parseFloat(tempData))) {
    console.log('addition indicator on');
    lcd('+');
    return;
  }
  console.log('addition indicator on');
  lcd('+');
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
    console.log('addition indicator -');
    lcd('-');
    return;
  }
  console.log('subtraction indicator on');
  lcd('+');
  subTotal = subTotal - parseFloat(tempData);
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
  if (tempData.length > 0) {
    subTotal = subTotal + parseFloat(tempData);
    tempData = '';
    lcd('opOff');
    updateDisplay(subTotal);
  }
};

// Update LCD display
//--------------------------//
const updateDisplay = (value) => {
  console.log('test value length');
  if (value.toString().length >= 9) {
    value = 'ERROR'; errorState = true; }
  if (tempData === '' && subTotal === 0) value = 0;
  document.getElementById('LCDnumbers').innerHTML = value;
  console.log("sub-total=", subTotal, "last-sub-total=", lastSubTotal, "tempData=", tempData);
  return;
};
