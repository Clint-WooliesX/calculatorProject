import * as Main from "../javascript.js";
import * as Lcd from './lcd.js';

//get all buttons with class '.push-button'. Assign eventListener click and return ID of clicked button
export const calcButton = document.querySelectorAll('.push-button');
for (let i = 0; i < calcButton.length; i++) {
    calcButton[i].addEventListener('mouseup', function () {
        Main.buttonInput(this.innerText);
    });
}

//event listener for power back light switch
export const powerSwitch = document.getElementById('power');
export const displayToggle = document.getElementById('display');
export const lightLabel = document.getElementById('powerLabel');
powerSwitch.addEventListener('mousedown', function () { Lcd.powerToggle(); });