const soundFx = () => {
  var audio = new Audio('soundFx.m4a');
  audio.play();
};

const debug = (message) => { console.log(message); };

debug("Calculator App Started");
debug("Waiting for key press...");

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
  subTotal=0;


// begin program
const begin = (key) => {
  debug("key press detected, validating");
  soundFx();
  validation(key); // validate key press
};

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


const clear = () => {
  temp[1] = "0";
  decimalActive = false;
  updateDisplay(temp[1]);
  temp[1] = "";
  document.getElementById("LCDcommas").innerHTML = "";
};

const recall = () => {
  //do something
  return;
};

const memMinus = () => {
  //do something
  return;
};

const memPlus = () => {
  //do something
  return;
};

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

const root = () => {
  //do something
  return;
};

const percent = () => {
  //do something
  return;
};

const equals = () => {
  stringToNumber(temp);
  return;
};

const zeroCheck = () => {
  if (temp[1] != "") {
    debug("this has been run");
    key = "0";
    validation(key);
  }
  return;
};

const tempStorage = (value) => {
  temp[1] = temp[1] + value;
  debug(temp[1]);
  updateDisplay(temp[1]);
};

const updateDisplay = (value) => {
  document.getElementById("LCDnumbers").innerHTML = value;
  switch (lengthOf(temp[1])) {
    case "thousand": {
      document.getElementById("LCDcommas").innerHTML = commas.thousand;
      break;
    }
    case "million": {
      document.getElementById("LCDcommas").innerHTML = commas.million;
      break;
    };
    case "thousandDot": {
      document.getElementById("LCDcommas").innerHTML = commas.thousandDot;
      break;
    };
    case "thousand1dp": {
      document.getElementById("LCDcommas").innerHTML = commas.thousand1dp;
      break;
    };
    case "thousand2dp": {
      document.getElementById("LCDcommas").innerHTML = commas.thousand2dp;
      break;
    };
    case "thousand3dp": {
      document.getElementById("LCDcommas").innerHTML = commas.thousand3dp;
      break;
    };
    case "thousand4dp": {
      document.getElementById("LCDcommas").innerHTML = commas.thousand3dp;
      break;
    };

  }
};


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

const lengthOf = (string) => {
  let count = 0;
  for (char in string) {
    if (string[char] == ".") {
      break;
    };
    count++;
  }
  let digits = [count, (string.length - (count))];

  if (digits[0] == 4 && digits[1] == 0) {
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

const stringToNumber = (array) => {
debug('received '+array+' of length '+array.length)
  const string =array[0] + array[1] + array[2];
  debug(string);
  strToNum = parseFloat(string);
  debug(strToNum);
  storeSubTotal(strToNum)
};

const storeSubTotal = (value)=>{
  subTotal=value;
}