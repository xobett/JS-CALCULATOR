function operate(firstNumber, operand, secondNumber){

    // switch (operand) {

    // }
}

//OUTPUT

let digitsDisplayed = 0;
const output = document.getElementById('output');
output.textContent = 0;

let currentNumber = 0;
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
                
                break;

            case 'divide':
                
                break;

            case 'clear-entry':
                //Reset current entry but keep previous operation (firstNumber)!!
                break;

            case 'times':
                
                break;

            case 'all-clear':
                firstNumber = 0;


                output.textContent = '0';
                currentNumber = 0;
                break;

            case 'minus':
                
                break;

            case 'decimal':
                
                break;

            case 'equals':
                //Call operate
                break;

            case 'plus':
                
                break;
        }
    }

}