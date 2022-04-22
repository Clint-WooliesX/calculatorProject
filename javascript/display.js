
//--------------------------//
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
