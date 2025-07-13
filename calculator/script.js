function add(num1, num2) {
    return (num1 + num2);

}

function sub(num1, num2) {
    return (num1 - num2);

}

function multiply(num1, num2) {
    return (num1 * num2);

}

function divide(num1, num2) {
    return (num1 / num2);

}

function operate(num1, num2) {

}

let num1 = 1;
let num2 = 2;
let operator = operate(num1, num2);
let arrOfNums = [];
let globalNumberCollector = "";

const displayContainer = document.querySelector("#display");
const displayContent = document.createElement("div");
displayContent.classList.add("displayContent");

displayContainer.appendChild(displayContent);

let justEvaluated = false;

function updateDisplay(value) {
    if (justEvaluated) {
        clearDisplay();
        justEvaluated = false;

    }
     if (value === "." && globalNumberCollector.includes(".")) {
                return;
            }
    if (!isNaN(value) || value === ".") {
        if (value === "." && globalNumberCollector === "") {
            globalNumberCollector = "0";
            displayContent.textContent += "0";
            styleDisplay();
        }

        globalNumberCollector += value;
        displayContent.textContent += value
        styleDisplay()
        console.log(arrOfNums);
    } else {
        if (globalNumberCollector !== "") {
            arrOfNums.push(globalNumberCollector);
            globalNumberCollector="";
        }

        const last = arrOfNums.at(-1);
        if (["+", "-", "*", "/"].includes(last)) {
            return;
        }

        arrOfNums.push(value);
        displayContent.textContent += value
        styleDisplay()
    }

    toggleOperators()
}

function styleDisplay() {
    displayContent.style.color = "red";
    displayContent.style.fontFamily = "Cochin, Georgia, Times, 'Times New Roman', serif";
    displayContent.style.fontSize = "40px";

}

function clearDisplay() {
    displayContent.textContent = "";
    arrOfNums.length = 0;
}

function backOne() {
    displayContent.textContent = displayContent.textContent.slice(0, -1);
    arrOfNums.pop();

}


// function fixArray(arr) {
//     let fixed = [];
//     let numberCollector = "";
//     for (const element of arr) {
//         if (element === "+" || element === "-" || element === "*" || element === "/") {
//             if (numberCollector.length > 0) {
//                 fixed.push(numberCollector);
//                 numberCollector = "";
//             }

//             fixed.push(element);
//         } else {
//             numberCollector += element;
//             console.log(numberCollector)
//         }
//     }

//     if (numberCollector.length > 0) {
//         fixed.push(numberCollector);
//     }

//     console.log(fixed)

//     return fixed;

// }

function runEquals() {
    if (globalNumberCollector !== "") {
        arrOfNums.push(globalNumberCollector);
        globalNumberCollector = "";

    }

    equals(arrOfNums);
}

function equals(arr) {


    if (arr.length === 0) return 0;
    let total = parseFloat(arr[0]);

    for (let i = 1; i < arr.length; i += 2) {  
        const operator = arr[i];
        const nextNum = parseFloat(arr[i + 1]);

        if (operator === "+") {
            total += nextNum;

        } else if (operator === "-") {
            total -= nextNum;

        } else if (operator === "*") {
            total *= nextNum;

        } else if (operator === "/") {
            if (nextNum === 0) {
                alert("Error: Division by zero");
                return 0;
            }
            total /= nextNum;
        }
    }

    clearDisplay();
    displayContent.textContent = total;
    styleDisplay();
    globalNumberCollector = "";
    toggleOperators();
    return total;


}

const equalsBtn = document.getElementById("equalsBtn");
equalsBtn.addEventListener("click", () => {
    justEvaluated = true;
} )

function toggleOperators() {

   const lastFromCollector = globalNumberCollector.length > 0 ? globalNumberCollector.at(-1) : null;
   const lastFromArr = arrOfNums.length > 0 ? arrOfNums.at(-1) : null;
   const last = lastFromCollector !== null ? lastFromCollector : lastFromArr;
   const disable = (arrOfNums.length === 0 && globalNumberCollector.length === 0) || ["+", "-", "*", "/"].includes(last);
   document.querySelectorAll(".operator").forEach(btn => { btn.disabled = disable });
   console.log("Last input:", last, "Disable operators:", disable);
}

if (arrOfNums.length === 0) {
    document.querySelectorAll(".operator").forEach(btn => { btn.disabled = true });
} else { 
    document.querySelectorAll(".operator").forEach(btn => { btn.disabled = true });
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if ("0123456789+-*/.".includes(key)) {
        updateDisplay(key);

    } else if (key === "Enter") {
        runEquals();

    } else if (key === "BackSpace") {
        backOne();
    } else if (key === "Escape") {
        clearDisplay();
    }
    
});