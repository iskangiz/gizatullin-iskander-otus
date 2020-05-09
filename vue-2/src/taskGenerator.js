export default class TaskGenerator {
    constructor(settings) {
        this.settings = settings;
    }

    generateTask() {
        let task = {};
        task.numbers = this.getNumbers();
        task.result = this.calculateResult(task.numbers);
        task.isEquality = this.randomBoolean();

        if (task.result % 1 !== 0)
            task.isEquality = true;

        if (task.isEquality) {
            task.resultToShow = task.result + this.randomInteger(-10, 10);
        }

        return task;
    }

    calculateResult(numbers) {
        let result = numbers[0].value;
        for (let i = 1; i < numbers.length; i++) {
            let number = numbers[i];
            switch (number.operation) {
                case '+':
                    result += number.value;
                    break;
                case '-':
                    result -= number.value;
                    break;
                case '*':
                    result *= number.value;
                    break;
                case '/':
                    result /= number.value;
                    break;
                case '^':
                    result = Math.pow(result, number.value);
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    getOperationArr() {
        let operationArr = [];
        if (this.settings.isSumEnabled)
            operationArr.push('+');
        if (this.settings.isDiffEnabled)
            operationArr.push('-');
        if (this.settings.isMultEnabled)
            operationArr.push('*');
        if (this.settings.isDivEnabled)
            operationArr.push('/');
        if (this.settings.isExpEnabled)
            operationArr.push('^');
        if (operationArr.length === 0)
            operationArr.push('+');
        return operationArr;
    }

    getNumbers() {
        let numbersCount = this.getNumbersCount();
        let maxNumber = this.getMaxNumber();
        let operationArr = this.getOperationArr();

        let results = [];
        for (let i = 0; i < numbersCount; i++) {
            let result = {};
            result.value = this.randomInteger(1, maxNumber);
            result.operation = (i !== 0) ? operationArr[this.randomInteger(0, operationArr.length - 1)] : null;
            results.push(result);
        }
        return results;
    }

    getMaxNumber() {
        let complexity = this.settings.complexity;
        switch (complexity) {
            case 1:
                return 10;
            case 2:
                return 100;
            case 3:
                return 500;
            default:
                return 10;
        }
    }

    getNumbersCount() {
        let complexity = this.settings.complexity;
        switch (complexity) {

            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4;
            default:
                return 2;
        }
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    randomBoolean() {
        return Math.random() >= 0.5;
    }
}

