
const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

let tempData = '', Data = 0, userNum = [], index = 0, currentFunction, errorState = false;

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

console.log("Data=", Data, "tempData=", tempData, 'userNum 0:', userNum[0], 'userNum 1:', userNum[1], 'index:', index);

// begin program
//--------------------------//
const begin = (button) => {
  if (errorState === true && button != 'cce') return;
  errorState = false;
  let input = document.getElementById(button).innerHTML;
  console.log(button, input);
  if (fButtons.includes(button) === false) recordInput(input);
  Data=parseFloat(tempData)
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
};

// Function buttons
//--------------------------//
const functionButton = (button, input) => {
  // Data = parseFloat(tempData);
  userNum[index] = Data;
  index++;

  switch (button) {
    case "cce": return clear();
    case "addition":
      lcd('+');
      currentFunction = '+';
      break;
    case "subtraction":
      lcd('-');
      currentFunction = '-';
      break;
    case "multiply":
      lcd('*');
      currentFunction = '*';
      break;
    case "division":
      lcd('/');
      currentFunction = '/';
      break;
  }
  tempData = '';
  if (index == 2) {
    index = 0;
    switch (currentFunction) {
      case '+':
        result = userNum[0] + userNum[1];
        return updateDisplay(result);
      case '-':
        result = userNum[0] + userNum[1];
        return updateDisplay(result);
      case '*':
        result = userNum[0] + userNum[1];
        return updateDisplay(result);
      case '/':
        result = userNum[0] + userNum[1];
        return updateDisplay(result);
    }

  }
};


// clear - clear all button
//--------------------------//
const clear = () => {
  console.log('$$$$$');
  if (tempData === '') {
    Data = 0;
  }
  tempData = '';
  lcd('opOff');
  lcd('memOff');
  updateDisplay(0);
  return;
};

// Addition button
//--------------------------//
// const addition = () => {

//   console.log('+ function start');
//   lcd('+');

//   if (isNaN(parseFloat(tempData))) {
//     updateDisplay(subTotal)
//     return;
//   }

//   lcd('+'); 
//   subTotal = subTotal + lastSubTotal;
//   lastSubTotal = parseFloat(tempData);
//   tempData = '';
//   updateDisplay(subTotal);
// };

// operation button
//--------------------------//
// const operation = (arg) => {

//   console.log('+ function start');
//   lcd(arg);

//   if (isNaN(parseFloat(tempData))) {
//     updateDisplay(Data);
//     return;
//   }

//   switch (arg) {
//     case '+':
//       lastSubTotal = parseFloat(tempData);
//       subTotal = subTotal + lastSubTotal;
//       break;
//     case '-':
//       lastSubTotal = parseFloat(tempData);
//       subTotal = subTotal - lastSubTotal;
//       break;
//     case '*':
//       lastSubTotal = parseFloat(tempData);
//       subTotal = subTotal * lastSubTotal;
//       break;
//     case '/':
//       lastSubTotal = parseFloat(tempData);
//       subTotal = subTotal / lastSubTotal;
//       break;
//   }

//   tempData = '';
//   updateDisplay(subTotal);
// };


// Equals function
//--------------------------//
// const equals = () => {
//   if (tempData === '') {
//     tempData = subTotal;
//     tempData = '';
//     updateDisplay(subTotal);
//   }
//   if (tempData.length > 0) {
//     subTotal = subTotal + parseFloat(tempData);
//     tempData = '';
//     lcd('opOff');
//     updateDisplay(subTotal);
//   }
// };

// Update LCD display
//--------------------------//
const updateDisplay = (value) => {
  if (value.toString().length >= 9) {
    value = 'ERROR'; errorState = true;
  }
  if (tempData === '' && Data === 0) value = 0;
  document.getElementById('LCDnumbers').innerHTML = value;
  console.log("Data=", Data, "tempData=", tempData, 'userNum 0:', userNum[0], 'userNum 1:', userNum[1], 'index:', index);
  return;
};
