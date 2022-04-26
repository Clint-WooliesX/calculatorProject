const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

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

//global variables
let
    tempInput = '',
    input,
    inputArray = [0, 0],
    index = 0,
    errorState = false,
    currentFunction;
lastInput = 0;

const debug = () => {
    document.getElementById("tempInputValue").innerHTML=tempInput;
    document.getElementById("inputValue").innerHTML=tempInput
    htmlArrayValue = document.getElementById("arrayValue").innerHTML=inputArray
    htmlIndexValue = document.getElementById("indexValue").innerHTML=index
    document.getElementById("operatorValue").innerHTML=currentFunction
};

debug();
// begin program
//--------------------------//
const begin = (button) => {
    debug();

    console.log(button);

    //element ID cannot be a number so innHTML is used
    buttonDigit = document.getElementById(button).innerHTML;

    //prevent user input until error cleared
    if (errorState === true && button != 'cce') return;
    errorState = false;
    input = parseFloat(tempInput);
    //check if button was an operator or function button
    if (fButtons.includes(button) === false) return recordInput(buttonDigit);
    functionButton(button);
};

// Record input from user
//--------------------------//
const recordInput = (arg) => {
    //validation
    if (isNaN(parseFloat(tempInput))) input = lastInput;
    if (tempInput === '0' && input != '.') return;
    if (tempInput.length === 0 && input === '.') input = '0.';
    if (tempInput.length >= 8) return console.log('screen capacity exceeded');
    tempInput = tempInput + arg;
    updateLCD(tempInput);
};

// Update LCD display
//--------------------------//
const updateLCD = (arg) => {
    input = parseFloat(tempInput);
    //equation result larger longer than 8 digits cannot be displayed
    if (arg.toString().length >= 9) {
        arg = 'ERROR'; errorState = true;
    }
    //update calculator display with new data
    document.getElementById('LCDnumbers').innerHTML = arg;

    debug();
    return;
};

// clear - clear all button
//--------------------------//
const clear = () => {
    if (tempInput === '') {
        Data = 0;
    }
    tempInput = '';
    inputArray = [0, 0];
    index = 0;
    lcd('opOff');
    lcd('memOff');
    updateLCD(0);
    return;
};

const functionButton = (button) => {
    if (isNaN(parseFloat(tempInput))) input = lastInput;
    inputArray[index] = input;
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

    if (index == 2) {
        index = 0;
        switch (currentFunction) {
            case '+':
                result = inputArray[0] + inputArray[1];
                inputArray[0] = result;
                tempInput = '';
                index=1
                return updateLCD(result);
            case '-':
                result = inputArray[0] - inputArray[1];
                inputArray[0] = result;
                tempInput = '';
                index=1
                return updateLCD(result);
            case '*':
                result = inputArray[0] * inputArray[1];
                return updateLCD(result);
            case '/':
                result = inputArray[0] / inputArray[1];
                return updateLCD(result);
        }

    }

    index = 1
    tempInput = '';
    debug();
};