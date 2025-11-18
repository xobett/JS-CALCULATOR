//#region VARS

const output = document.getElementById('output');
output.textContent = 0;

let firstNumber = 0;
let operator = ''; 
let secondNumber = 0;

let memory = 0;
//#endregion VARS

const buttons = document.getElementsByClassName("button");
for (let index = 0; index < buttons.length; index++) {
    const btn = buttons[index];
    btn.addEventListener('click', setAction);
}

function setAction(e) {
    const type = e.target.getAttribute('data-type');
    let value = e.target.getAttribute('data-value');

    switch (type){
        case 'digit': updateOutput(value); break;
        case 'operand': setNewOperand(value); break;
    }
}


//#region FUNCTIONS

function operate(operand, firstNumber, secondNumber){

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    switch(operand) {
    case '+': return firstNumber + secondNumber;
    case '-': return firstNumber - secondNumber;
    case '/': return firstNumber / secondNumber;
    case '*': return firstNumber * secondNumber;
    case '%': return firstNumber * (secondNumber / 100); 
    }
}

function updateOutput(value){
    output.textContent += value;
}

function setNewOperand(value){
    firstNumber = Number(output.textContent);
    operand = value;
}


function resetOutputValue(value) {
    output.textContent = value;
}

//#endregion FUNCTIONS