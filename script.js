//#region VARS

const output = document.getElementById('output');
output.textContent = 0;

let firstNumber = 0;
let operator = ''; 
let secondNumber = 0;

let memory = 0;
let isDisplayingUnmodified = false;
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
        case 'fn': setFn(value); break;
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

function setFn(value){
    firstNumber = output.textContent;
    isDisplayingUnmodified = true;

    switch (value) {
        case 'memory-plus': return fn_memoryPlus(); 
        case 'memory-minus': return fn_memoryMinus(); 
        case 'memory-recall': return fn_memoryRecall(); 
        case 'clear-entry': return fn_clearEntry(); 
        case 'all-clear': return fn_allClear();
        case 'equals': return fn_equals();
    }
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

function setNewOperand(value){
    firstNumber = Number(output.textContent);
    isDisplayingUnmodified = true;
    operand = value;
}

function resetOutputValue() {
    output.textContent = 0;
}

//#region FN

function fn_allClear(){
    firstNumber = 0;
    operand = '';
    secondNumber = 0;
    memory = 0;

    resetOutputValue();
}

function fn_clearEntry(){
    resetOutputValue();
}

function fn_memoryPlus(){
    memory = operate('+', memory, firstNumber);
}

function fn_memoryMinus(){
    memory = operate('-', memory, firstNumber);
}

function fn_memoryRecall(){
    output.textContent = memory;
}

function fn_equals(){
    if (firstNumber == 0) return;

    output.textContent = operate(operand, firstNumber, secondNumber);
}

//#endregion

//#endregion FUNCTIONS