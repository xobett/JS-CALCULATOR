function operate(operand, firstNumber, secondNumber){

}

//OUTPUT

let digitsDisplayed = 0;
const output = document.getElementById('output');
output.textContent = 0;

let currentNumber = 0;
let secondNumber = 0;
let currentOperator = ''; 
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
        switch (value) {
            case 'memory-plus':
                
                break;

            case 'memory-minus':
                
                break;

            case 'memory-percentage':
                
                break;

            case 'square-root':
                
                break;

            case 'percentage':
                
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
                //Reset current entry but keep previous operation (firstNumber)!!
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