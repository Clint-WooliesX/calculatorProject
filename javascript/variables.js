const operator = {
    addition: "+",
    subtraction: "-",
    multiply: "x",
    division: "&#xF7",
    percent: "%",
    root: "&#8730",
    equals: "=",
    dot: ".",
    zero: "0",
    recall: "",
    memPlus: "",
    memMinus: "",
    clear: "",
    plusMinus: "",
    doNothing: "",
};

const commas = {
    thousand: ",&nbsp;&nbsp;&nbsp;",
    million: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;",
    thousandDot: ",&nbsp;&nbsp;&nbsp;&nbsp;",
    thousand1dp: ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    thousand2dp: ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    thousand3dp: ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    thousand4dp: ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
};

const maxCharacters = 8;

let
    storageIndex = 0,
    temp = ["", "", ""],
    isPositive = true,
    decimalActive = false,
    decimalCount = 0,
    subTotal = 0;
lastSubTotal = 0;