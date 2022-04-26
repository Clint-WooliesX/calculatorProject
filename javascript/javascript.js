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


let buttonInputs = [], concatData; equation = [], operationList = [];

const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;
};

const buttonInput = (input) => {
    debug()
    console.log('waiting for input');
    
    //Input from HTML
    let button = document.getElementById(input).innerHTML;

    //validation
    if (fButtons.includes(input)) {
        switch (input) {
            case 'cce': return cce();
            case 'addition': {
                lcd('+');
                storeConcatData(concatData);
                return storeOperation(input);
            }
            case 'subtraction': {
                lcd('-');
                storeConcatData(concatData);
                return storeOperation(input);
            }
            case 'multiply': {
                lcd('*');
                storeConcatData(concatData);
                return storeOperation(input);
            }
            case 'equals': {
                lcd('opOff');
                storeConcatData(concatData);
                return storeOperation(input);
            }
        };
    }
    if (button === '0' && buttonInputs.length==0) return;
    if (button === '.' && buttonInputs.length==0) button = '0.';
    if (buttonInputs.length <= 7) buttonInputs.push(button);

    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);

    debug();
};

// Update LCD
//----------------------------------------------------------//
const updateLCD = (argument) => {
    document.getElementById('LCDnumbers').innerHTML = argument;
    debug();
};

// clear - Clear all
//----------------------------------------------------------//
const cce = () => {
    buttonInputs = [];
    concatData = '0';
    debug();
    if (equation.length >= 2) {
        console.log('cleared');
        
        updateLCD(equation[0]);
        equation.pop();
        lcd('opOff')
        operationList=[]
    }
equation.pop()
    updateLCD(concatData);
    debug();
};


// Store Data
//----------------------------------------------------------//
const storeConcatData = (concatData) => {
    console.log('storeConcatData has been run');
    // if (isNaN(concatData) != true) concatData='0';
    debug();
    if (equation.length >= 2) equation.pop();
    debug();
    equation.push(parseFloat(concatData));
    buttonInputs = [];
    concatData = '0';
    debug();
};

// Operation
//----------------------------------------------------------//
const storeOperation = (input) => {
    operationList.push(input);
    if (operationList.length >= 2) solveEquation(input);
    debug()
};

const solveEquation = () => {
    console.log('solve equation');
    const operation = operationList.shift();
    switch (operation) {
        case ('addition'):
            equation[0] += equation[1];
            equation.pop();
            debug()
            return updateLCD(equation[0]);
        case ('subtraction'):
            equation[0] -= equation[1];
            equation.pop();
            debug()
            return updateLCD(equation[0]);
        case ('multiply'):
            equation[0] *= equation[1];
            equation.pop();
            debug();
            return updateLCD(equation[0]);
            
    }
};
