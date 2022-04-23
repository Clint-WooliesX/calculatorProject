
const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

let tempData = '', lastSubTotal = 0, subTotal = 0;


// begin program
//--------------------------//
const begin = (button) => {
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
    case "equals": return equals();
  }
  return;
};


// clear - clear all button
//--------------------------//
const clear = () => {
  document.getElementById('LCDoperator').innerHTML = '';
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
    console.log('addition indicator on');
    document.getElementById('LCDoperator').innerHTML = '+';
    return;}
  console.log('addition indicator on');
  document.getElementById('LCDoperator').innerHTML = '+';
  subTotal = subTotal + parseFloat(tempData);
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
    tempData='';
    updateDisplay(subTotal);
  }
  if (tempData.length > 0) {
    subTotal = subTotal + parseFloat(tempData);
    tempData = '';
    document.getElementById('LCDoperator').innerHTML = '';
    updateDisplay(subTotal);
  }
};

// Update LCD display
//--------------------------//
const updateDisplay = (value) => {
  if (value.length >= 9) return;
  if (tempData === '' && subTotal === 0) value = 0;
  document.getElementById('LCDnumbers').innerHTML = value;
  console.log("sub-total=", subTotal, "last-sub-total=", lastSubTotal, "tempData=", tempData);
  return;
};
