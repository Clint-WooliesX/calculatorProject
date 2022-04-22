debug("Calculator App Started");
debug("Waiting for key press...");



// begin program
//--------------------------//
const begin = (key) => {
  debug("key press detected, validating");
  soundFx();
  validation(key); // validate key press
};



