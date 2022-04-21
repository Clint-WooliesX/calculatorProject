const operator = {
  addition: "+",
  subtraction: "-",
  multiply: "x",
  divide: "&#xF7",
  percent: "%",
  root: "&#8730",
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
  storageIndex = 0;

const buttonPress = (key) => {
  if (characterCount >= 8) {
    console.log("Max character count reached key not stored " + key);
    return;
  }
  characterCount++;
  console.log("chars = " + characterCount + " key =" + key);
};
