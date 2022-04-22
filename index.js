const operator = {
  addition: "+",
  subtraction: "-",
  multiply: "x",
  division: "&#xF7",
  percent: "%",
  root: "&#8730",
  equals: "=",
  dot: ".",
  recall: "",
  memPlus: "",
  memMinus: "",
  clear: "",
  plusMinus: "",
  doNothing: "",
};


specialKeys = [];
const operatorKeys = (array) => {
  let i = 0;
  for (let value of Object.keys(operator)) {
    specialKeys[i] = value;
    i++;
  }
  console.log(specialKeys);
};

operatorKeys(operator);

const commas = {
  thousand: ",&nbsp;&nbsp;&nbsp;",
  million: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;",
  thousand1dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand2dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand3dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  thousand4dp: ",&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
};

const maxCharacters = 8;

let characterCount = 0,
  decimalCount = 0,
  storageIndex = 0,
  tempString = "",
  decimalActive = false;

const begin = (key) => {
  play();
  buttonPress(key);
};
const buttonPress = (key) => {

  if (key === "zero") key = 0;
  if (key === "dot") dot();
  if (specialKeys.includes(key)) {
    console.log("special key was pressed");
    if (key === "clear") {
      clear();
      return;
    }
    return;
  }
  if (characterCount >= 8) {
    console.log("Max character count reached key not stored " + key);
    return;
  }

  characterCount++;
  console.log("chars = " + characterCount + " key =" + key);
  tempStorage(key);
  ;
};

const tempStorage = (value) => {
  tempString = tempString + value;
  console.log(tempString);
  updateDisplay(tempString);
};

const updateDisplay = (value) => {
  document.getElementById("LCDnumbers").innerHTML = value;
};

const clear = () => {
  tempString = "0";
  characterCount = 0;
  decimalActive = false;
  updateDisplay(tempString);
  tempString = "";
};

const play = () => {
  var audio = new Audio('soundfx.m4a');
  audio.play();
};
const dot = () => {
  console.log("dot has been run");
  if (decimalActive === false) {
    decimalActive = true;
    if (tempString === "") {
      characterCount = 1;
      return buttonPress("0.");
    }
    return buttonPress(".");
  }
  ;
  return;
};