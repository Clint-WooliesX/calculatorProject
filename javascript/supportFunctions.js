
//--------------------------//
const soundFx = () => {
    var audio = new Audio('/media/soundFx.m4a');
    audio.play();
};

//--------------------------//
const debug = (message) => { console.log(message); };


//--------------------------//
const lengthOf = (string) => {
    let count = 0;
    for (char in string) {
        if (string[char] == ".") {
            break;
        };
        count++;
    }
    let digits = [count, (string.length - (count))];

    if (digits[0] >= 4 && digits[0] < 7 && digits[1] == 0) {
        const result = "thousand";
        return result;
    }
    if (digits[0] == 7 && digits[1] == 0) {
        const result = "million";
        return result;
    }
    if (digits[0] == 4 && digits[1] == 1) {
        const result = "thousandDot";
        return result;
    }
    if (digits[0] == 4 && digits[1] == 2) {
        const result = "thousand1dp";
        return result;
    }
    if (digits[0] == 4 && digits[1] == 3) {
        const result = "thousand2dp";
        return result;
    }
    if (digits[0] == 4 && digits[1] == 4) {
        const result = "thousand3dp";
        return result;
    }
    if (digits[0] == 4 && digits[1] == 4) {
        const result = "thousand3dp";
        return result;
    }
    const error = "error";
    return error;
};

//--------------------------//
const stringToNumber = (array) => {
    debug('received ' + array + ' of length ' + array.length);
    const string = array[0] + array[1] + array[2];
    debug(string);
    strToNum = parseFloat(string);
    debug(strToNum);
    storeSubTotal(strToNum);
};

//--------------------------//
const tempStorage = (value) => {
    temp[1] = temp[1] + value;
    debug(temp[1]);
    updateDisplay(temp[1]);
};

//--------------------------//
const storeSubTotal = (value) => {
    subTotal = value;
};