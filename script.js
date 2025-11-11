const { memo } = require("react");

function operate(operand, firstNumber, secondNumber){

    switch(operand) {
        case '+': return firstNumber + secondNumber;
        case '-': return firstNumber - secondNumber;
        case '/': return firstNumber / secondNumber;
        case '*': return firstNumber * secondNumber;
        case '%': return firstNumber * (secondNumber / 100); 
    }
}

//OUTPUT

let digitsDisplayed = 0;
const output = document.getElementById('output');
output.textContent = 0;

let currentNumber = 0;
let secondNumber = 0;
let currentOperator = ''; 

let memory = 0;
//OUTPUT

//BUTTONS

const buttons = document.getElementsByClassName("button");
for (let index = 0; index < buttons.length; index++) {
    const btn = buttons[index];
    btn.addEventListener('click', setAction);
}

//BUTTONS

function setAction(e){
    const type = e.target.getAttribute('data-type'); 
    let value = e.target.getAttribute('data-value');

    if (type == 'digit'){
            if (digitsDisplayed >= 10) return;
            if (value == '00' && digitsDisplayed == 9) return;

            if (output.textContent == '0') {
                output.textContent = value;   
            }
            else {
                output.textContent += value;
            }

            currentNumber = output.textContent;

            digitsDisplayed += value == '00' ? 2 : 1;

            console.log(currentNumber);
    }
    else if (type == 'operand'){
        firstNumber = Number(output.textContent);
        switch (value) {
            case 'memory-plus':
                
                break;

            case 'memory-minus':
                
                break;

            case 'memory-recall':
                currentNumber = memory;
                output.textContent = currentNumber;
                break;

            case 'square-root':
                
                break;

            case 'percentage':
                operand = '%';
                break;

            case 'backspace':
                if (output.textContent.length <= 1) return;

                let backspacedValue = output.textContent.split("").slice(0,-1).join("");
                currentNumber = backspacedValue;
                output.textContent = currentNumber;
                break;

            case 'divide':
                operand = '/'
                break;

            case 'clear-entry':
                currentNumber = 0;
                output.textContent = '0';
                break;

            case 'times':
                operand = '*'
                break;

            case 'all-clear':
                firstNumber = 0;
                operand = '';

                currentNumber = 0;
                output.textContent = '0';
                break;

            case 'minus':

                if (output.textContent == 0){
                    firstNumber
                    output.textContent = '-';
                    return;
                }

                operand = '-';
                break;

            case 'decimal':
                
                break;

            case 'equals':

                currentNumber = operate(operand, firstNumber, secondNumber);
                output.textContent = currentNumber;
                break;

            case 'plus':
                operand = '+'
                break;
        }
    }

}