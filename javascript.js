import * as Lcd from './modules/lcd.js';

// ########--------- SETTINGS ---------###########
let numDigits;
export const soundFX = true;
//--------Set useCommas = <true/false>
//---changes font size and location to fit comma separators
const useCommas = false;
if (useCommas == true) {
    //change font size location
    document.getElementById('LCDnumbers').style = "font-size:35px;top:20px";
    //limit max digits on screen
    numDigits = 9;
} else {
    numDigits = 8;
}
//turn HTML debug mode on/off
const debugMode = true;
if (debugMode == false) document.getElementById('debugMode').style = "display:none";

// ########--------- SETTINGS ---------###########



//get all buttons with class '.push-button'. Assign eventListener click and return ID of clicked button
export const calcButton = document.querySelectorAll('.push-button');
for (let i = 0; i < calcButton.length; i++) {
    calcButton[i].addEventListener('mouseup', function () {
        buttonInput(this.innerText);
    });
}

//event listener for power back light switch
export const powerSwitch = document.getElementById('power');
export const displayToggle = document.getElementById('display');
export const lightLabel = document.getElementById('powerLabel');
powerSwitch.addEventListener('mousedown', function () { Lcd.powerToggle(); });



//backlight switch soundFx
export const soundFx2 = () => {
    const audio = new Audio('/media/lightSwitch.m4a');
    audio.play();
};

//button press soundFx
export const soundFx1 = () => {
    const audio = new Audio('/media/soundfx.m4a');
    audio.play();
};

//global Variables
export const buttonInputs = [];
export const equation = [];
export const operator = [];
export let index, concatData, errorState;
window.index = 0;
window.concatData = '';
window.errorState = false;

//List of operation buttons that should not be handled like digits
export const fButtons = ["C-CE", '+/-', '√', '%', 'MRC', 'M-', 'M+', '÷', 'x', '-', '+', '='];


//HTML debug mode easier to see what is happening than console
export const debug = () => {
    document.getElementById('concatD').innerHTML = window.concatData;
    document.getElementById('arrayValue').innerHTML = equation;
    document.getElementById('operatorValue').innerHTML = operator;
    document.getElementById('index').innerHTML = window.index;
};

//sub function replaced about 50 lines of code
//not sure if it should reside outside of if statement
export const operatorKey = (input) => {
    if (equation[0] == undefined) {
        // return console.log('operatorkey sub function')
    };
    Lcd.lcd(input);
    if (input === '=') {
        Lcd.lcd('opOff');
        Lcd.updateLCD(equation[0]);
    }
    storeConcatData(window.concatData);
    console.log('this was run after equals key');

    window.index = 1;
    return storeOperation(input);
};


// Collect button inputs
//----------------------------------------------------------//
export const buttonInput = (button) => {
    //console.log here for demo purposes
    console.log(button);

    if (soundFX == true) soundFx1();

    //Input from HTML
    // const button = input;
    //validation                       ================> needs optimising
    if (fButtons.includes(button)) {
        if (button === 'C-CE') return cce();

        // REMOVE ONCE KEYS ARE CODED
        const notCoded = ['+/-', '√', '%', 'MRC', 'M-', 'M+'];
        if (notCoded.includes(button)) return alert('Sorry, not coded yet.');
        return operatorKey(button);
    }
    // prevent further input until error state cleaed with C-CE button
    if (window.errorState === true) return;

    //prevent leading zeros
    if (button === '0' && parseFloat(window.concatData) == 0) return;

    //handle decimals
    if (button === '.' && buttonInputs.length == 0) button = '0.';

    if (button === '.' && window.concatData.includes('.')) return;

    //handle value longer than 7 digits
    if (buttonInputs.length <= numDigits) buttonInputs.push(button);

    //concatenate collected digits into a single number
    window.concatData = buttonInputs.join("");
    if (isNaN(window.concatData) != true) Lcd.updateLCD(window.concatData);
    debug();
};

// clear - Clear all
//----------------------------------------------------------//
const cce = () => {

    //sub function replaced duplicated code
    const resetVars = () => {
        Lcd.lcd('opOff');
        buttonInputs.length = 0;
        window.concatData = '';
        window.errorState = false;
    };

    //first press - Clear
    if (equation.length == 2) {
        console.log('clear only last input and operator');
        equation.pop();
        resetVars();
        Lcd.updateLCD('0');
        debug();
        return;
    }
    //Second press - clear all
    resetVars();
    operator.length = 0;
    equation.length = 0;
    window.index = 0;
    Lcd.updateLCD(0);
    debug();
};

// Store Data
//----------------------------------------------------------//
const storeConcatData = (concatData) => {
    console.log('store conCat has been run');
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
    buttonInputs.length = 0;
    window.concatData = '';
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
            return Lcd.updateLCD(equation[0]);
        case ('-'):
            equation[0] -= equation[1];
            return Lcd.updateLCD(equation[0]);
        case ('x'):
            equation[0] *= equation[1];
            return Lcd.updateLCD(equation[0]);
        case ('÷'):
            equation[0] /= equation[1];;
            return Lcd.updateLCD(equation[0]);
    }
};

