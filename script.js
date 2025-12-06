
const output = document.getElementById('output');
output.textContent = 0;

let firstNumber = 0;
let operator = ''; 
let secondNumber = 0;

let memory = 0;
let isDisplayingUnmodified = true;

const numericKeys = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '*', '-', '/', 'Enter', 'Backspace'];
const buttons = document.getElementsByClassName("button");
const clickEvent = new Event('click');

document.addEventListener("keyup", (e) => {
    if(numericKeys.includes(e.key)){
        parseKeyToButton(e.key);
    }
});

for (let index = 0; index < buttons.length; index++) {
    const btn = buttons[index];
    btn.addEventListener('click', setBtnAction);
}

//#region FUNCTIONS

function setBtnAction(e) {
    const type = e.target.getAttribute('data-type');
    let value = e.target.id;

    switch (type){
        case 'digit': updateOutput(value); break;
        case 'operand': setOperand(value); break;
        case 'fn': setFn(value); break;
    }
}

function parseKeyToButton(key){
    let button = Array.from(buttons).find((btn) => btn.id == key);
    if (!button){
        switch(key){
            case '.': button = buttons['decimal']; break;
            case '+': button = buttons['plus']; break;
            case '*': button = buttons['times']; break;
            case '-': button = buttons['minus']; break;
            case '/': button = buttons['divide']; break;
            case 'Backspace': button = buttons['backspace']; break;
            case 'Enter': button = buttons['equals']; break;
        }
    }

    button.dispatchEvent(clickEvent);
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
        case 'backspace': return fn_backspace();
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
    }

    isDisplayingUnmodified = true;
    operator = value;
}

function updateOutput(value){
    if (!isDisplayingUnmodified){
        if (output.textContent.length >= 10) return;
        if (output.textContent.length == 9 && value == '00') return;
        if (output.textContent == 0 && value == '00') return;
    }

    if (output.textContent == 0 || isDisplayingUnmodified){
        output.textContent = value;

        isDisplayingUnmodified = !isDisplayingUnmodified;
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

function isDecimal(num){
    return !Number.isInteger(num);
}

function handleBigOutput(num){
    let stringedNum = num.toString();
    if (stringedNum.length > 10){
        stringedNum = stringedNum.substring(0,10);
        return stringedNum;
    }
    return stringedNum;
}

function handleDecimal(num){
    num = num.toFixed(2);

    const [int, dec] = num.toString().split('.');

    if(int.length <= 6){
        return num;
    }

    const digitsToRemove = int.length - 6;
    const factor = 10 ** digitsToRemove;

    const intPart = Math.floor(Number(int) / factor) * factor;


    return Number(`${intPart}.${dec}`);
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

    let result = Number(operate(operator, firstNumber, secondNumber));
    resetValues();
    
    if (!result) return;
    if (isDecimal(result)){
        result = handleDecimal(result);
    }
    else{
        result = handleBigOutput(result);
    }

    output.textContent = result;
}

function fn_squareRoot(){
    let sqrt = Math.sqrt(Number(output.textContent));

    if(isDecimal(sqrt)){
        sqrt = handleDecimal(sqrt);
    }

    output.textContent = sqrt;
}

function fn_decimal(){
    if (output.textContent.includes('.')) return;

    output.textContent += '.';
    isDisplayingUnmodified = false;
}

function fn_backspace(){
    if (output.textContent.length <= 1){
        output.textContent = 0;
        return;
    }

    let backspacedValue = output.textContent.split("").slice(0,-1).join("");
    output.textContent = backspacedValue;

    isDisplayingUnmodified = false;
}

//#endregion

//#endregion FUNCTIONS