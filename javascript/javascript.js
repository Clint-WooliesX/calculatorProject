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


let buttonInputs = [], concatData; equation = [], operationList = []; index = 0;

const debug = () => {
    document.getElementById('concatD').innerHTML = concatData;
    document.getElementById('arrayValue').innerHTML = equation;
};

const buttonInput = (input) => {
    debug();
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
                index = 1;
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
            case 'division': {
                lcd('/');
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
    if (button === '0' && parseFloat(concatData)== 0) return;
    if (button === '.' && buttonInputs.length == 0) button = '0.';
    if (buttonInputs.length <= 7) buttonInputs.push(button);

    concatData = buttonInputs.join("");
    if (isNaN(concatData) != true) updateLCD(concatData);

    debug();
};

// Update LCD
//----------------------------------------------------------//
const updateLCD = (argument) => {
    document.getElementById('LCDnumbers').innerHTML = argument;
    if(argument!=0)equation[index] = parseFloat(argument);
    debug();
};

// clear - Clear all
//----------------------------------------------------------//
const cce = () => {
if(equation.length==2){
    console.log('clear only last input');
    equation.pop()
    buttonInputs = [];
    concatData = '';
    updateLCD(concatData)
    debug()
    return
}

    buttonInputs = [];
    concatData = '';
    equation = [];
    index = 0;
    updateLCD(concatData);
};


// Store Data
//----------------------------------------------------------//
const storeConcatData = (concatData) => {
    if (equation.length >= 2) equation.pop();
    equation.push(parseFloat(concatData));
    debug();
};

// Store Operation
//----------------------------------------------------------//
const storeOperation = (input) => {
    operationList.push(input);
    buttonInputs = [];
    concatData = '';
    if (operationList.length >= 2) solveEquation(input);
    equation.pop();
    debug();
};

const solveEquation = () => {
    const operation = operationList.shift();
    switch (operation) {
        case ('addition'):
            equation[0] += equation[1];
            return updateLCD(equation[0]);
        case ('subtraction'):
            equation[0] -= equation[1];
            return updateLCD(equation[0]);
        case ('multiply'):
            equation[0] *= equation[1];;
            return updateLCD(equation[0]);
        case ('division'):
            equation[0] /= equation[1];;
            return updateLCD(equation[0]);
    }
};
