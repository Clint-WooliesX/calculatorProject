# JavaScript Calculator Project

![Calculator images](/media/CalcPics.png "Calculator project")


## MVP
* Functioning calculator coded using java script
* Take a photo of a real calculator and reproduce it using HTML and SCSS
* At a minimum the calculator must have numeric:
    - Numeric keypad including decimal
    - Standard operators /, *, +, -
    - A clear button

## Photo choice
I chose the photo of my calculator based on the following criteria
* It met the MVP guide lines
* It provided some additional buttons to challenge me
    - I will include functioning -/+, square root and % buttons
    - I will include a memory recall + and - functionality
* I chose the shape and style of calculator as it will require layers for the details and a parameter I have not yet used, "clip-path" to create chamfered corners.
* To challenge myself I have decided to attempt to render the calculator as closely as possible and include animated buttons.
* The display will also indicate when a value is stored in memory and use a mono-space font mimicking a real LCD screen.

## JavaScript outline.
I intend to use multiple functions, 1 or more will be called for each button and its intended use. DOM manipulation will be used to output to the virtual display in real time.

### Numeric buttons 
I plan to use 1 function that is able to take arguments as to what button called it and what digit it should store. I will employ the following approach and modify as needed should it not work as expected
* Entered digits will be appended to a string.
* When an operator/special key is pressed the string will be passed to a float and stored in an array with its operator.
   ~~- index0 = float~~
   ~~- index1 = operator~~
   - ended up using 2 arrays
   - one array to store equation values
   - one array to store operators ( this needs to be changed to a variable as only 1 operator is ever stored)
* ~~the above array will be nested inside another array~~
    - ~~Array-A~~
    - ~~Index 0 //First float and operator~~
    - ~~Array-B~~
    - ~~Index 0 //Float~~
    - ~~index 1 //operator~~
    - ~~Index 1 //Second float and operator~~
        - ~~Index 0 //Float~~
        - ~~index 1 //operator~~
        - ...
        - ...
        - ~~Index X //final float and denoted by use of the = button.~~
* ~~The reason for this approach is to all the clear and clear all button to function as expected~~ Found another approach based on what was currently stored in the arrays and variables
    - 1 press will allow only the last entered value to be cleared from memory while keeping subtotal.
    - 2 presses of the clear key will clear memory.
* A variable will be used to store and recall values committed to memory using th M-, M+ and MRC keys.

## Special keys will call functions as needed to take required input calculate and output result
- more on this to come as this will be added to the project only after basic arithmetic has been successfully implemented.

## Output to virtual display
I will use DOM manipulation to out put running subtotal/totals to the screen along with other UI data such as:
- last pressed operator
- "M" for value stored in memory

## Data validation
- I will limit maximum number of digits that can be entered
- I will limit maximum result of equation digits to fit display
- values calculated that exceed the screen space for output will return an error
- decimals will be rounded to fit the whole number first + 1 decimal place and further decimal places if possible.

## Log file
if time permits I will include an log output to text file for the purposes of recording what is happening  under the hood, and for debugging purposes.


