
//--------------------------//
const validation = (key) => {
    if (Object.keys(operator).includes(key)) {
        debug("special key was pressed");
        switch (key) {
            case "clear": return clear();
            case "recall": return recall();
            case "memMinus": return memMinus();
            case "memPlus": return memPlus();
            case "plusMinus": return plusMinus();
            case "root": return root();
            case "percent": return percent();
            case "equals": return equals();
            case "zero": return zeroCheck();
            case "dot": return dot();
            case "division": return key = "/";
            case "multiply": return key = "*";
            case "subtraction": return key = "-";
            case "addition": return additionKey();
            default: return debug("something went wrong");
        }
    }
    if (temp[1].length >= maxCharacters) {
        debug("Max character count reached key not stored " + key);
        return;
    }
    tempStorage(key);
};

//--------------------------//
const zeroCheck = () => {
    if (temp[1] != "") {
        key = "0";
        validation(key);
    }
    return;
};

//--------------------------//
const dot = () => {
    debug("dot has been run");
    if (decimalActive === false) {
        decimalActive = true;
        if (temp[1] === "") {
            // characterCount = 1;
            return validation("0.");
        }
        return validation(".");
    }
    ;
    return;
};