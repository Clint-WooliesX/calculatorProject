//turn HTML debug mode on/off
let debugMode = true;
if (debugMode == false) document.getElementById('debugMode').style = "display:none";

//get all buttons with class '.push-button'. Assign eventListener click and return ID of clicked button
const calcButton = document.querySelectorAll('.push-button');
for (i = 0; i < calcButton.length; i++) {
    calcButton[i].addEventListener('mouseup', function () {
        buttonInput(this.id);
    });
}

//event listener for power back light switch
const powerSwitch = document.getElementById('power');
const displayToggle = document.getElementById('display');
const lightLabel = document.getElementById('powerLabel');
powerSwitch.addEventListener('mousedown', function () { powerToggle(); });

//back light fx
const powerToggle = () => {
    console.log('mouseup');
    powerSwitch.classList.toggle("slider--on");
    displayToggle.classList.toggle("display--glow");
    lightLabel.classList.toggle("on-off-label--glow");
    for (i = 0; i < calcButton.length; i++) {
        calcButton[i].classList.toggle("push-button--glow");}
    soundFx2();
};

//backlight switch soundFx
const soundFx2 = () => {
    var audio = new Audio('/media/lightSwitch.m4a');
    audio.play();
};

//button press soundFx
const soundFx1 = () => {
    var audio = new Audio('/media/soundfx.m4a');
    audio.play();
};

//List of operation buttons that should not be handled like digits
const fButtons = ["cce", 'plusMinus', 'root', 'percent', 'mrc', 'm-', 'm+', 'division', 'multiply', 'subtraction', 'addition', 'equals'];

//function to switch on and off various LCD indicators
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

//global Variables
let buttonInputs = [], concatData = ''; equation = [], operator = []; index = 0,errorState=false;

//HTML debug mode easier to see what is happening than console
const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;
    document.getElementById('operatorValue').innerHTML = operator;
    document.getElementById('index').innerHTML = index;
};

// Collect button inputs
//----------------------------------------------------------//
const buttonInput = (input) => {
    soundFx1();
    //Input from HTML
    let button = document.getElementById(input).innerHTML;
    //validation                       ================> needs optimising
    if (fButtons.includes(input)) {
        switch (input) {
            case 'cce': return cce();
            case 'addition': {
                lcd('+');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'subtraction': {
                lcd('-');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'multiply': {
                lcd('*');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'division': {
                lcd('/');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'equals': {
                lcd('opOff');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'mrc': {
                ;
                return alert('key not coded yet');
            }
            case 'm-': {
                ;
                return alert('key not coded yet');
            }
            case 'm+': {
                ;
                return alert('key not coded yet');
            }
            case 'plusMinus': {
                ;
                return alert('key not coded yet');
            }
            case 'root': {
                ;
                return alert('key not coded yet');
            }
            case 'percent': {
                ;
                return alert('key not coded yet');
            }
        };
    }
    if(errorState===true)return
    //prevent leading zeros
    if (button === '0' && parseFloat(concatData) == 0) return;
    //handle decimals
    if (button === '.' && buttonInputs.length == 0) button = '0.';
    //handle value longer than 7 digits
    if (buttonInputs.length <= 7) buttonInputs.push(button);
    //concatenate collected digits into a single number
    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);
    debug();
};

// Update LCD
//----------------------------------------------------------//
const updateLCD = (argument) => {
    if (isNaN(argument)) return; //return if result is NaN
    if (argument.toString().length >9) {
        argument = 'error';
        errorState = true;
    }
    document.getElementById('LCDnumbers').innerHTML = argument;
    equation[index] = parseFloat(argument); // value to equation
    debug();
};

// clear - Clear all
//----------------------------------------------------------//
// one press clear last input if any. 2 presses clear all
const cce = () => {
    if (equation.length == 2) {
        console.log('clear only last input and operator');
        equation.pop();
        operator = [];
        lcd('opOff');
        buttonInputs = [];
        concatData = '';
        errorState=false
        updateLCD('0');
        debug();
        return;
    }
    //press number 2 clears all
    lcd('opOff');
    operator = [];
    buttonInputs = [];
    concatData = '';
    equation = [];
    index = 0;
    errorState = false
    updateLCD(0);
    debug();
};


// Store Data
//----------------------------------------------------------//
const storeConcatData = (concatData) => {
    //remove old value
    if (equation.length >= 2) equation.pop();
    //save new value
    if (isNaN(concatData) == false) equation.push(parseFloat(concatData));
    debug();
};

// Store Operation
//----------------------------------------------------------//
const storeOperation = (input) => {
    operator.push(input);
    buttonInputs = [];
    concatData = '';
    if (operator.length >= 2) solveEquation(input);
    equation.pop();
    debug();
};

// Solve equation
//----------------------------------------------------------//
const solveEquation = (input) => {
    //allow change of operator
    if (isNaN(equation[1])) return operator.shift(input);
    //solve equation using current operator
    const operation = operator.shift();
    switch (operation) {
        case ('addition'):
            equation[0] += equation[1];
            return updateLCD(equation[0]);
        case ('subtraction'):
            equation[0] -= equation[1];
            return updateLCD(equation[0]);
        case ('multiply'):
            equation[0] *= equation[1];
            return updateLCD(equation[0]);
        case ('division'):
            equation[0] /= equation[1];;
            return updateLCD(equation[0]);
    }
};
