let display = document.getElementById('commandline');
let numbers = document.querySelectorAll('.numbers');
let operations = document.querySelectorAll('.operator');
let convert = document.getElementById('convert');
let trigOperations = document.querySelectorAll('.trigOperator');
let dec = document.getElementById('decimal');
let c = document.getElementById('clear');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let historyBtn = document.getElementById('history');
let list = document.getElementById('list');
let flagHistory = 0;

 let newLi = text => {
     let li = document.createElement('li');
     li.innerHTML = 'Результат: ' + text;
     list.appendChild(li);
     if(list.children.length > 3){
        list.removeChild(list.firstElementChild);
    }
};

let numberPress = (number) => {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === '0'){
            display.value = number;
        } else {
            display.value += number;
        } 
    }
}

let convertDeg = () => {
   if (convert.textContent === 'rad') {
       convert.textContent = 'deg';
   } else {
       convert.textContent = 'rad';
   }
};

let operation = (op) => {
    let localOperationMemory = display.value;
    

    if (memoryNewNumber && memoryPendingOperation !== '='){
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if(memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
            newLi(+(memoryCurrentNumber-localOperationMemory).toFixed(9) + memoryPendingOperation + localOperationMemory + ' = ' + Number(memoryCurrentNumber.toFixed(9)));
        } else if ( memoryPendingOperation === '-'){
            memoryCurrentNumber -= parseFloat(localOperationMemory);
            newLi(+(Number(memoryCurrentNumber) + Number(localOperationMemory)).toFixed(9) + memoryPendingOperation + localOperationMemory + ' = ' + Number(memoryCurrentNumber.toFixed(9)));
        } else if ( memoryPendingOperation === '*'){
            memoryCurrentNumber *= parseFloat(localOperationMemory);
            newLi(+(memoryCurrentNumber / localOperationMemory).toFixed(9) + memoryPendingOperation + localOperationMemory + ' = ' + Number(memoryCurrentNumber.toFixed(9)));
        } else if ( memoryPendingOperation === '/'){
            memoryCurrentNumber /= parseFloat(localOperationMemory);
            newLi(+(memoryCurrentNumber * localOperationMemory).toFixed(9) + memoryPendingOperation + localOperationMemory + ' = ' + Number(memoryCurrentNumber.toFixed(9)));
        } else if ( memoryPendingOperation === 'xn'){
            memoryCurrentNumber = Math.pow(memoryCurrentNumber, localOperationMemory);
            newLi( Math.pow(memoryCurrentNumber, 1/localOperationMemory) + ' ^ ' + localOperationMemory + ' = ' + Number(memoryCurrentNumber.toFixed(9)));
        } else if ( memoryPendingOperation === '%'){
            let ost = memoryCurrentNumber;
            memoryCurrentNumber = memoryCurrentNumber % localOperationMemory;
            newLi(ost + memoryPendingOperation + localOperationMemory + '' + ' = ' + memoryCurrentNumber);
        } else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = +memoryCurrentNumber.toFixed(9);
        memoryPendingOperation = op;
        if(display.value === "Infinity") {
            clear();
            display.value = 'Error';
        }
    }
}

function factorial(n) {
    if (n <= 1){ 
        return 1;
    } else { 
        return n * factorial( n - 1 ); 
    }  
} 
let help = (x,y,a,oper) => {
    if( oper === 'sin'){
        x = Math.sin(+y);
    } else if (oper === 'cos'){
        x = Math.cos(+y);
    } else if (oper === 'tg'){
        x = Math.tan(+y);
    } else if (oper === 'ctg'){
        x = 1 / Math.tan(+y);
    }
    display.value = +x.toFixed(9);
    newLi(a + ' (' + y + ') ' + ' = ' + x);
}

let help2 = (x,y,a,oper) => {
    let z = y;
    y = (y/180) * Math.PI
    if( oper === 'sin'){
        x = Math.sin(+y);
    } else if (oper === 'cos'){
        x = Math.cos(+y);
    } else if (oper === 'tg'){
        x = Math.tan(+y);
    } else if (oper === 'ctg'){
        x = 1 / Math.tan(+y);
    }
    display.value = +x.toFixed(9);
    newLi(a + ' (' + z + '&#176) ' + ' = ' + x);
}

let trigOperation = (trigOp) => {
    let localTrigOperationMemory = display.value;
    memoryPendingOperation = trigOp;
    if(memoryPendingOperation === 'sin' && convert.textContent === 'rad') {
       help(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'sin');
    } else if(memoryPendingOperation === 'cos' && convert.textContent === 'rad') {
        help(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'cos');
    } else if(memoryPendingOperation === 'tg' && convert.textContent === 'rad') {
        help(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'tg');
    } else if(memoryPendingOperation === 'ctg' && convert.textContent === 'rad') {
        help(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'ctg');
    } else if(memoryPendingOperation === 'sin' && convert.textContent === 'deg') {
        help2(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'sin');
    } else if(memoryPendingOperation === 'cos' && convert.textContent === 'deg') {
        help2(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'cos');
    } else if(memoryPendingOperation === 'tg' && convert.textContent === 'deg') {
        help2(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'tg');
    } else if(memoryPendingOperation === 'ctg' && convert.textContent === 'deg') {
        help2(memoryCurrentNumber, localTrigOperationMemory, memoryPendingOperation, 'ctg');
    }else if(memoryPendingOperation === 'n!') {
        let flag = localTrigOperationMemory;
        memoryCurrentNumber = factorial(parseFloat(localTrigOperationMemory));
        display.value = +memoryCurrentNumber.toFixed(9);
        newLi(flag + '! ' + ' = ' + display.value);
    } 
};

let decimal = () => {
    let localDecimalMemory = display.value;
    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

let clear = () => {
    display.value = 0;
    memoryCurrentNumber = 0;
}

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', (e) => {
        numberPress(e.target.textContent);
    });   
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', (e) => {
        operation(e.target.textContent);
    });    
};

for (let i = 0; i < trigOperations.length; i++) {
    let trigOperationBtn = trigOperations[i];
    trigOperationBtn.addEventListener('click', (e) => {
        trigOperation(e.target.textContent);
    });    
};

dec.addEventListener('click', decimal);
convert.addEventListener('click', convertDeg);
c.addEventListener('click', clear);

historyBtn.addEventListener('click', () => {
    if (flagHistory === 0) {
        list.style.display = 'inline-block';
        flagHistory = 1;
    } else {
        list.style.display = 'none';
        flagHistory = 0;
    }
});
