// Calculator Project by Clint Kingston 2022

// ########--------- SETTINGS ---------###########
const soundFX = true;
const numDigits = 7;
const debugMode = true;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// alert('Welcome to my JavaScript Calculator. While basic arithmetic is fully functional some of the additional function keys may have unexpected results in some use cases. Thank you and enjoy!')

// Global Variables
const
    buttonInputs = [],
    equation = [],
    operator = [];

// List of operation buttons that should not be handled like digits
const fButtons = ["C-CE", '+/-', '√', '%', 'MRC', 'M-', 'M+', '÷', 'x', '-', '+', '='];
let
    index = 0,
    concatData = '',
    errorState = false,
    sqrt,
    calcMem = 0,
    lastButton = '',
    pressedTwice = false,
    theDate,
    formatDate;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// DOM Variables
const calcButton = document.querySelectorAll('.push-button');
const powerSwitch = document.getElementById('power');
const displayToggle = document.getElementById('display');
const lightLabel = document.getElementById('powerLabel');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// EventListerners
for (i = 0; i < calcButton.length; i++) {
    calcButton[i].addEventListener('mouseup', function () {
        buttonInput(this.innerText);
    });
}
powerSwitch.addEventListener('mousedown', function () { powerToggle(); });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Backlight and sondFx
const powerToggle = () => {
    powerSwitch.classList.toggle("slider--on");
    displayToggle.classList.toggle("display--glow");
    lightLabel.classList.toggle("on-off-label--glow");
    for (i = 0; i < calcButton.length; i++) {
        calcButton[i].classList.toggle("push-button--glow");
    }
    if (soundFX == true) soundFx2();
};
// Backlight switch soundFx
const soundFx2 = () => {
    const audio = new Audio('/media/lightSwitch.m4a');
    audio.play();
};
// button press soundFx
const soundFx1 = () => {
    const audio = new Audio('/media/soundfx.m4a');
    audio.play();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// HTML debug mode easier to see what is happening than console
if (debugMode == false) document.getElementById('debugMode').style = "display:none";
const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;
    document.getElementById('operatorValue').innerHTML = operator;
    document.getElementById('index').innerHTML = index;
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//Function to switch on and off various LCD indicators
const lcd = (arg) => {
    const LCDoperator = document.getElementById('LCDoperator');
    const LCDmemory = document.getElementById('LCDmemory');
    switch (arg) {
        //------- Operator indicators --------//
        case 'opOff': return LCDoperator.innerHTML = '&nbsp;';
        case '+': return LCDoperator.innerHTML = '+';
        case '-': return LCDoperator.innerHTML = '-';
        case 'x': return LCDoperator.innerHTML = 'x';
        case '/': return LCDoperator.innerHTML = '&#xF7';
        case '%': return LCDoperator.innerHTML = '%';
        case '√': return LCDoperator.innerHTML = '&#8730';
        //------- Memory indicators --------//
        case 'memOff': return LCDmemory.innerHTML = '&nbsp;';
        case 'm': return LCDmemory.innerHTML = 'M';
        default: return;
    }
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Collect button inputs and validate them
const buttonInput = (button) => {
//logic for MRC button 2 presses in a row clears memory
//---- has potential for better handling of the C-CE button
//---- has potential for use recursive addition and subtraction
    if (button == lastButton) {
        pressedTwice = true;
    } else { pressedTwice = false; lastButton = button; }

//logic to decide if starting a new equation or using last result
    if(operator=='=' && /[0-9]/.test(button)){
        console.log('starting new equation')
        index=0
    }

    //uncomment for console debug data
    // console.log(button);
    // console.log(pressedTwice);
    // console.log(index);

    if (soundFX == true) soundFx1();

    if (fButtons.includes(button)) {
        const operatorKey = (input) => {
            if (equation[0] == undefined) return;
            lcd(input);
            if (input === '=') {
                lcd('opOff');
                solveEquation();
            }
            storeConcatData(concatData);
            if (button != 'C-CE'&& button != '+/-')
                index = 1;
            return storeOperation(input);
        };
        //requires its own function call
        if (button === 'C-CE') cce();

        if (button === '√' && concatData.length > 0) {
            lcd('√');
            let sqrt = Math.sqrt(parseFloat(concatData));
            return updateLCD(sqrt);
        }
        // M+
        if (button === 'M+') {
            calcMem += equation[index];
            return lcd('m');
        }
        // M-
        if (button === 'M-') {
            calcMem -= equation[index];
            return lcd('m');
        }
        if (button === 'MRC') {
            concatData = calcMem;
            if (pressedTwice === true) {
                calcMem = 0;
                lcd('memOff');
            }
            updateLCD(parseFloat(concatData));
        }

        if (button === '+/-') {
            if(concatData.length == 0)return
            updateLCD(parseFloat("-" + concatData));
        }


        // REMOVE ONCE KEYS ARE CODED
        const notCoded = ['%'];
        if (notCoded.includes(button)) return alert('Sorry, not coded yet.');
        return operatorKey(button);
    }
    // Prevent further input until error state cleared with C-CE button
    if (errorState === true) return;
    // Prevent leading zeros
    if (button === '0' && concatData.length <= 1) return;
    // Handle decimals
    if (button === '.' && buttonInputs.length == 0) button = '0.';
    if (button === '.' && concatData.includes('.')) return;
    // Handle value longer than 7 digits
    if (buttonInputs.length <= numDigits) buttonInputs.push(button);
    // Concatenate collected digits into a single number
    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);
    debug();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Update LCD (Also handles values to large to fit on screen)
const updateLCD = (argument) => {
    if (isNaN(argument)) return;
    if (argument.toString().includes('.')) {
        if (argument.toString().length > numDigits + 1) {
            // Shaves off decimals if they wont fit on screen to prevent error
            let fifteenDp = argument.toFixed(15);
            for (i = 15; i > 0; i--) {
                fifteenDp = parseFloat(fifteenDp).toFixed(i);
                if (fifteenDp.toString().length < numDigits + 2) break;
            } argument = fifteenDp;
        }
    }
    if (argument.toString().length > numDigits + 1) {
        argument = 'error';
        errorState = true;
    }
    document.getElementById('LCDnumbers').innerHTML = argument;
    equation[index] = parseFloat(argument);
    debug();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Clear - Clear all
const cce = () => {
    const resetVars = () => {
        lcd('opOff');
        buttonInputs.length = 0;
        concatData = '';
        errorState = false;
    };
    //first press - Clear
    if (equation.length == 2) {
        equation.pop();
        resetVars();
        updateLCD('0');
        debug();
        return;
    }
    //Second press - clear all
    resetVars();
    operator.length = 0;
    equation.length = 0;
    index = 0;
    updateLCD(0);
    debug();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Store Data
const storeConcatData = (concatData) => {
    //remove old value
    if (equation.length >= 2) equation.pop();
    //save new value
    if (isNaN(concatData) == false) equation.push(parseFloat(concatData));
    debug();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Store Operation
const storeOperation = (input) => {
    operator.push(input);
    buttonInputs.length = 0;
    concatData = '';
    if (operator.length >= 2) solveEquation(input);
    equation.pop();
    debug();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Solve equation
const solveEquation = (input) => {
    //allow change of operator
    if (isNaN(equation[1])) return operator.shift(input);
    //solve equation using current operator
    const operation = operator.shift();
    switch (operation) {
        case ('+'):
            equation[0] += equation[1];
            return updateLCD(equation[0]);
        case ('-'):
            equation[0] -= equation[1];
            return updateLCD(equation[0]);
        case ('x'):
            equation[0] *= equation[1];
            return updateLCD(equation[0]);
        case ('÷'):
            equation[0] /= equation[1];;
            return updateLCD(equation[0]);
    }
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

setInterval(function () {
    theDate = new Date();
    document.getElementById('LCDdate').innerText = displayDate();
}, 1000);

const displayDate = () => {
    formatDate = theDate.toString().split(" ");
    let dateString = '';
    for (let i = 0; i <= 4; i++) {
        dateString += formatDate[i] + " ";
    }
    return dateString;
};

