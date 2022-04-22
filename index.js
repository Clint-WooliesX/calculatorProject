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
  thousand1dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand2dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand3dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand4dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
};

const maxCharacters = 8;

let
  storageIndex = 0,
  temp = ["", "", ""],
  isPositive = true,
  decimalActive = false,
  decimalCount = 0;


// begin program
const begin = (key) => {
  debug("key press detected, validating");
  soundFx();
  validation(key); // validate key press
};

const validation = (key) => {
  if (Object.keys(operator).includes(key)) {
    console.log("special key was pressed");
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
      case "addition": return key = "+";
      default: return console.log("something went wrong");
    }
  }
  if (temp[1].length >= maxCharacters) {
    console.log("Max character count reached key not stored " + key);
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
  //do something
  return;
};

const zeroCheck = () => {
  if (temp[1] != "") {
    console.log("this has been run");
    key = "0";
    validation(key);
  }
  return;
};

const tempStorage = (value) => {
  temp[1] = temp[1] + value;
  console.log(temp[1]);
  updateDisplay(temp[1]);
};

const updateDisplay = (value) => {
  document.getElementById("LCDnumbers").innerHTML = value;
  switch (lengthOf(temp[1])) {
    case 4: {
      document.getElementById("LCDcommas").innerHTML = commas.thousand;
      break;
    }
    case 7: {
      document.getElementById("LCDcommas").innerHTML = commas.million;
      break;
    };
      document.getElementById("LCDcommas").innerHTML = "";
  }
};


const dot = () => {
  console.log("dot has been run");
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
  let theLength = 0;
  for (char in string) {
    if(char=="."){
      return theLength
    }
    theLength++;
  }
  debug(theLength);
  return theLength
};
