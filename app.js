class Calculator {
    constructor(previousOperandDiv, currentOperandDiv) {
    this.previousOperandDiv = previousOperandDiv;
    this.currentOperandDiv = currentOperandDiv;
    this.clear();
    };

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    addNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    addOperator(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand != '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                calculation = prev + current;
                break
            case '-':
                calcultaion = prev - current;
                break
            case 'x':
                calculation = prev * current;
                break
            case '÷':
                calculation = prev / current;
                break
            default :
            return;
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        };
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        };
    }

    updateDisplay() {
        this.currentOperandDiv.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandDiv.innerText = this.previousOperand
        if (this.operation != null) {
            this.previousOperandDiv.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandDiv.innerText = '';
        }
    };
}

const previousOperandDiv = document.querySelector('[data-previous-operand');
const currentOperandDiv = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandDiv, currentOperandDiv);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.innerText);
        calculator.updateDisplay();
    });
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
