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


let buttonInputs = [], concatData; equation = [];

const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;

};

const buttonInput = (input) => {
    //Input from HTML
    let button = document.getElementById(input).innerHTML;

    //validation
    if (fButtons.includes(input)) {
        switch (input) {
            case 'cce': return cce();
            case 'addition': return storeConcatData(concatData);
        }
    };
    if (button === '0') return;
    if (button === '.') button = '0.';
    if (buttonInputs.length <= 7) buttonInputs.push(button);

    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);

    debug();
};

const updateLCD = (argument) => {
    document.getElementById('LCDnumbers').innerHTML = argument;
    debug();
};

const cce = () => {
    buttonInputs = [];
    concatData = '0';
    debug();
    if (equation.length > 0) {
        updateLCD(equation[0]);
        equation.pop();
    }
    updateLCD(concatData);
    debug();
};

const storeConcatData = (concatData) => {
    console.log('storeConcatData has been run');
    // if (isNaN(concatData) != true) concatData='0';
    debug();
    if (equation.length >= 2) equation.shift();
    debug();
    equation.push(parseFloat(concatData));
    buttonInputs = [];
    concatData = '0';
    debug();
};