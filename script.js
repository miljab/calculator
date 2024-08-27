const display = document.querySelector('.display');

const buttons = document.querySelectorAll('.button');

buttons.forEach((bttn) => {
    bttn.addEventListener("mousedown", (event) => {
        event.target.style.backgroundColor = "rgb(90, 90, 90)";
        action(event.target);
    });

    bttn.addEventListener("mouseup", (event) => {
        event.target.style.backgroundColor = "rgb(63, 63, 63)";
    });
});

let a = null;
// this switch state defines if number on display should be replaced with clicked one (true) or wrote next to existing ones (false).
let numberSwitch = false;
// this switch specifies if operations should continue or start over (it's mostly used after equals button)
let continueOperation = true;

function action(button) {
    key = button.classList[1];
    if (key == "zero") value(0);
    if (key == "one") value(1);
    if (key == "two") value(2);
    if (key == "three") value(3);
    if (key == "four") value(4);
    if (key == "five") value(5);
    if (key == "six") value(6);
    if (key == "seven") value(7);
    if (key == "eight") value(8);
    if (key == "nine") value(9);
    if (key == "AC") clear();
    if (key == "backspace") {
        if (display.textContent.length > 1 && continueOperation) display.textContent = display.textContent.slice(0, -1);
        else display.textContent = "0";
    }
    if (key == "point") {
        if (!continueOperation) {
            clear();
            continueOperation = true;
        }
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
            numberSwitch = false;
        }
    }
    if (key == "percent") {
        display.textContent = (parseFloat(display.textContent) / 100).toString();
        continueOperation = true;
    }
    if (key == "negative") {
        display.textContent = (parseFloat(display.textContent) * -1).toString();
        continueOperation = true;
    }
    if (key == "add") operate("+");
    if (key == "subtract") operate("-");
    if (key == "multiply") operate("*");
    if (key == "divide") operate("/");
    if (key == "equals") {
        if (a !== null && continueOperation) {
            operate(lastOperator);
            continueOperation = false;
            a = null;
        }
    };
}

function value(x) {
    if (!continueOperation) {
        clear();
        continueOperation = true;
    }
    if (display.textContent === "0" || numberSwitch) {
        display.textContent = x;
        numberSwitch = false;
    }
    else if (display.textContent.length < 9) display.textContent += x;

}

let lastOperator;

function operate(operation){
    numberSwitch = true;
    continueOperation = true;
    if (a === null) a = parseFloat(display.textContent);
    else {
        if (lastOperator == "/") {
            if (parseFloat(display.textContent) == 0) {
                display.textContent = "why?";
                
                setTimeout(() => {
                    clear();
                }, 2000);
                return "error";
            }
        }
        if (operation == "+") a += parseFloat(display.textContent);
        if (operation == "-") a -= parseFloat(display.textContent);
        if (operation == "*") a *= parseFloat(display.textContent);
        if (operation == "/") {
            a /= parseFloat(display.textContent);
        }
        
        if(a.toString().length > 9) {
            display.textContent = "too long";
            setTimeout(() => {
                clear();
            }, 2000);
            return "error";
        } else display.textContent = a.toString();
        
    }
    lastOperator = operation;
}

function clear(){
    display.textContent = "0";
    a = null;
}