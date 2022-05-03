import * as Main from "../javascript.js";
// import { powerSwitch, displayToggle, lightLabel, calcButton } from "../javascript.js";

//back light fx
export const powerToggle = () => {
    Main.powerSwitch.classList.toggle("slider--on");
    Main.displayToggle.classList.toggle("display--glow");
    Main.lightLabel.classList.toggle("on-off-label--glow");
    for (let i = 0; i < Main.calcButton.length; i++) {
        Main.calcButton[i].classList.toggle("push-button--glow");
    }
    if (Main.soundFX == true) Main.soundFx2();
};


//function to switch on and off various LCD indicators
export const lcd = (arg) => {
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

// Update LCD
//----------------------------------------------------------//
export const updateLCD = (argument) => {
    if (isNaN(argument)) return; //return if result is NaN
    if (argument.toString().length > Main.numDigits + 1) {
        let fifteenDp = argument.toFixed(15);
        for (i = 15; i > 0; i--) {
            console.log(i, " decimals shaved off");
            fifteenDp = parseFloat(fifteenDp).toFixed(i);
            if (fifteenDp.toString().length < Main.numDigits + 1) break;
        } return updateLCD(fifteenDp);
    }
    if (argument.toString().length > Main.numDigits + 1) {
        argument = 'error';
        errorState = true;
    }
    if (Main.useCommas == true) {
        //uses comma separators
        //Regex inserts a comma separators
        document.getElementById('LCDnumbers').innerHTML = argument.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        //no commas
        document.getElementById('LCDnumbers').innerHTML = argument;
    };
    Main.equation[index] = parseFloat(argument); // value to equation
    Main.debug();
};