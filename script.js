
const output = document.getElementById('output');
output.textContent = 0;

let firstNumber = 0;
let operator = ''; 
let secondNumber = 0;

let memory = 0;
let isDisplayingUnmodified = false;

const buttons = document.getElementsByClassName("button");

for (let index = 0; index < buttons.length; index++) {
    const btn = buttons[index];
    btn.addEventListener('click', setBtnAction);
}

//#region FUNCTIONS

function setBtnAction(e) {
    const type = e.target.getAttribute('data-type');
    let value = e.target.getAttribute('data-value');

    switch (type){
        case 'digit': updateOutput(value); break;
        case 'operand': setOperand(value); break;
        case 'fn': setFn(value); break;
    }
}

//#region MAIN FUNCTIONS

function operate(operand, firstNumber, secondNumber){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if(firstNumber == 0 && secondNumber == 0 && operand == 'divide'){
        output.textContent = 'Gotcha!';
        return;
    }

    switch(operand) {
    case 'plus': return firstNumber + secondNumber;
    case 'minus': return firstNumber - secondNumber;
    case 'divide': return firstNumber / secondNumber;
    case 'times': return firstNumber * secondNumber;
    case 'percentage': return firstNumber * (secondNumber / 100);
    }
}

function setFn(value){
    isDisplayingUnmodified = true;

    switch (value) {
        case 'square-root': return fn_squareRoot();
        case 'decimal': return fn_decimal();
        case 'memory-plus': return fn_memoryPlus(); 
        case 'memory-minus': return fn_memoryMinus(); 
        case 'memory-recall': return fn_memoryRecall(); 
        case 'clear-entry': return fn_clearEntry(); 
        case 'all-clear': return fn_allClear();
        case 'equals': return fn_equals();
    }
}

function setOperand(value){
    const currentNumber = Number(output.textContent);

    if (value == 'minus' && currentNumber == 0){
        output.textContent = '-';
        return;
    }

    if (firstNumber == currentNumber && currentNumber != 0){
        operator = value
        return;
    }

    //If a operation was done previously, calculates it
    if (firstNumber != 0){
        firstNumber = operate(operator, firstNumber, currentNumber);
    }
    else{
        firstNumber = currentNumber;
        console.log(firstNumber);
    }

    isDisplayingUnmodified = true;
    operator = value;
}

function updateOutput(value){
    if (output.textContent.length >= 10) return;
    if (output.textContent.length == 9 && value == '00') return;
    if (output.textContent == 0 && value == '00') return;

    if (output.textContent == 0 || isDisplayingUnmodified){
        output.textContent = value;

        if (isDisplayingUnmodified) isDisplayingUnmodified = !isDisplayingUnmodified;
    }
    else{
        output.textContent += value;
    }
}

function resetValues() {
    firstNumber = 0;
    operator = '';
    memory = 0;
}

//#endregion MAIN FUNCTIONS

//#region FN

function fn_allClear(){
    resetValues();
    
    output.textContent = 0;
}

function fn_clearEntry(){
    output.textContent = 0;
}

function fn_memoryPlus(){
    const addedValue = Number(output.textContent);
    memory = operate('plus', memory, addedValue);
}

function fn_memoryMinus(){
    const substractedValue = Number(output.textContent);
    memory = operate('minus', memory, substractedValue);
}

function fn_memoryRecall(){
    output.textContent = memory;
}

function fn_equals(){
    if (operator == '') return;

    secondNumber = Number(output.textContent);

    const result = operate(operator, firstNumber, secondNumber);
    resetValues();

    if (!result) return;
    output.textContent = result;
}

function fn_squareRoot(){
    const sqrt = Math.sqrt(Number(output.textContent));
    output.textContent = sqrt;
}

function fn_decimal(){
    if (output.textContent.includes('.')) return;

    output.textContent += '.';
    isDisplayingUnmodified = false;
}

//#endregion

//#endregion FUNCTIONS