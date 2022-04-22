
//--------------------------//
const clear = () => {
    temp[1] = "0";
    decimalActive = false;
    updateDisplay(temp[1]);
    temp[1] = "";
    document.getElementById("LCDcommas").innerHTML = "";
};

//--------------------------//
const plusMinus = () => {
    debug("plusMinus function called");
    if (isPositive) {
        debug("isPositive test was true");
        temp[0] = "-";
        isPositive = false;
        document.getElementById("LCDnegative").style = "display: flex;";
        return;
    }
    debug("isPositive test was false");
    temp[0] = "";
    isPositive = true;
    document.getElementById("LCDnegative").style.display = "none";
};