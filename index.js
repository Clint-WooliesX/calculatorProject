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

let characterCount = 0,
  decimalCount = 0,
  storageIndex = 0,
  tempString = "",
  decimalActive = false;

const begin = (key) => {
  soundFx();
  validation(key);
};


const validation = (key) => {
  if (key === "zero") zeroCheck();
  if (key === "dot") dot();
  if (Object.keys(operator).includes(key)) {
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
  tempStorage(key);
};

const tempStorage = (value) => {
  characterCount++;
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

const soundFx = () => {
  var audio = new Audio('soundfx.m4a');
  audio.play();
};

const dot = () => {
  console.log("dot has been run");
  if (decimalActive === false) {
    decimalActive = true;
    if (tempString === "") {
      characterCount = 1;
      return validation("0.");
    }
    return validation(".");
  }
  ;
  return;
};

const zeroCheck = () =>{
  if(tempString != ""){
    console.log("this has been run")
    key="0"
    validation(key)
  }
  return
}