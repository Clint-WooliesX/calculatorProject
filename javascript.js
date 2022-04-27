

// ########--------- SETTINGS ---------###########

const soundFX = true
//--------Set useCommas = <true/false>
//---changes font size and location to fit comma separators
const useCommas = true;
if (useCommas == true) {
    //change font size location
    document.getElementById('LCDnumbers').style = "font-size:35px;top:20px";
    //limit max digits on screen
    numDigits = 9;
} else {
    numDigits = 7;
}
//turn HTML debug mode on/off
const debugMode = false;
if (debugMode == false) document.getElementById('debugMode').style = "display:none";

// ########--------- SETTINGS ---------###########



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
    if(soundFX==true)soundFx2();
};

//backlight switch soundFx
const soundFx2 = () => {
    const audio = new Audio('/media/lightSwitch.m4a');
    audio.play();
};

//button press soundFx
const soundFx1 = () => {
    const audio = new Audio('/media/soundfx.m4a');
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
        case 'x': return LCDoperator.innerHTML = 'x';
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
//Attempted to make arrays const variables but it breaks code. suspect it has something to do with scope
let buttonInputs = [], equation = [], operator = [];
let index = 0, concatData = '', errorState = false;

//HTML debug mode easier to see what is happening than console
const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;
    document.getElementById('operatorValue').innerHTML = operator;
    document.getElementById('index').innerHTML = index;
};

// Collect button inputs
//----------------------------------------------------------//
const buttonInput = (button) => {
    //console.log here for demo purposes
    console.log(button);

    if (soundFX == true) soundFx1();

    //Input from HTML
    // const button = input;
    //validation                       ================> needs optimising
    if (fButtons.includes(button)) {

        //sub function replaced about 50 lines of code
        //not sure if it should reside outside of if statement
        const operatorKey = (input) => {
            if (equation[0] == undefined) return;
            lcd(input);
            if (input === '=') {
                lcd('opOff');
            updateLCD(equation[0])
            }
            storeConcatData(concatData)
            index = 1;
            return storeOperation(input);
        };
        //requires its own function call
        if (button === 'C-CE') return cce();

        // REMOVE ONCE KEYS ARE CODED
        const notCoded = ['+/-', '√', '%', 'MRC', 'M-', 'M+'];
        if (notCoded.includes(button)) return alert('Sorry, not coded yet.');

        return operatorKey(button);
    }
    // prevent further input until error state cleaed with C-CE button
    if (errorState === true) return;

    //prevent leading zeros
    if (button === '0' && parseFloat(concatData) == 0) return;

    //handle decimals
    if (button === '.' && buttonInputs.length == 0) button = '0.';

    //handle value longer than 7 digits
    if (buttonInputs.length <= numDigits) buttonInputs.push(button);

    //concatenate collected digits into a single number
    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);
    debug();
};

// Update LCD
//----------------------------------------------------------//
const updateLCD = (argument) => {
    if (isNaN(argument)) return; //return if result is NaN
    if (argument.toString().length > numDigits + 1) {
        argument = 'error';
        errorState = true;
    }
    if (useCommas == true) {
        //uses comma separators
        //Regex inserts a comma separators
        document.getElementById('LCDnumbers').innerHTML = argument.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        //no commas
        document.getElementById('LCDnumbers').innerHTML = argument;
    };


    equation[index] = parseFloat(argument); // value to equation
    debug();
};

// clear - Clear all
//----------------------------------------------------------//
const cce = () => {

    //sub function replaced duplicated code
    const resetVars = () => {
        lcd('opOff');
        buttonInputs = [];
        concatData = '';
        errorState = false;
    };

    //first press - Clear
    if (equation.length == 2) {
        console.log('clear only last input and operator');
        equation.pop();
        resetVars();
        updateLCD('0');
        debug();
        return;
    }
    //Second press - clear all
    resetVars();
    operator = [];
    equation = [];
    index = 0;
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
