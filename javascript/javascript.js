//turn HTML debug mode on/off
let debugMode = false;
if (debugMode == false) document.getElementById('debugMode').style = "display:none";

//get all buttons with class '.push-button'. Assign eventListener click and return ID of clicked button
const calcButton = document.querySelectorAll('.push-button');
for (i = 0; i < calcButton.length; i++) {
    calcButton[i].addEventListener('mouseup', function () {
        buttonInput(this.innerText);
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
        calcButton[i].classList.toggle("push-button--glow");
    }
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
const fButtons = ["C-CE", '+/-', '√', '%', 'MRC', 'M-', 'M+', '÷', 'x', '-', '+', '='];

//function to switch on and off various LCD indicators
const lcd = (arg) => {
    const LCDoperator = document.getElementById('LCDoperator');
    const LCDmemory = document.getElementById('LCDmemory');
    switch (arg) {
        //------- Operator indicators --------//
        case 'opOff': return LCDoperator.innerHTML = '&nbsp;';
        case '+': return LCDoperator.innerHTML = '+';
        case '-': return LCDoperator.innerHTML = '-';
        case '*': return LCDoperator.innerHTML = 'x';
        case '/': return LCDoperator.innerHTML = '&#xF7';
        case '%': return LCDoperator.innerHTML = '%';
        case 'root': return LCDoperator.innerHTML = '&#8730';
        //------- Memory indicators --------//
        case 'memOff': return LCDmemory.innerHTML = '&nbsp;';
        case 'm': return LCDmemory.innerHTML = 'M';
        default: return;
    }
};

//global Variables
let buttonInputs = [], equation = [], operator = [], index = 0, concatData = '', errorState = false;

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
console.log(input)
    //comment to disable button sounds
    soundFx1(); 

    //Input from HTML
    const button = input
    //validation                       ================> needs optimising
    if (fButtons.includes(input)) {
        switch (input) {
            case 'C-CE': return cce();
            case '+': {
                lcd('+');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case '*': {
                lcd('-');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'x': {
                lcd('*');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case '÷': {
                lcd('/');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case '=': {
                lcd('opOff');
                storeConcatData(concatData);
                index = 1;
                return storeOperation(input);
            }
            case 'MRC': {
                ;
                return alert('key not coded yet');
            }
            case 'M-': {
                ;
                return alert('key not coded yet');
            }
            case 'M+': {
                ;
                return alert('key not coded yet');
            }
            case '+/-': {
                ;
                return alert('key not coded yet');
            }
            case '√': {
                ;
                return alert('key not coded yet');
            }
            case '%': {
                ;
                return alert('key not coded yet');
            }
        };
    }
    if (errorState === true) return;
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
    if (argument.toString().length > 9) {
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
        errorState = false;
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
    errorState = false;
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
