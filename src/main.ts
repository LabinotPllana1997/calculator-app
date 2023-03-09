// This is the main TypeScript file where the logic for the calculator is written

import * as ko from 'knockout';

class ViewModel {
  userInput = ko.observable('iAmWrittenInCamel');
  result = ko.observable(0);

  calculateResult() {
    // get the user input from the userInput observable
    const input = this.userInput();

    // check if the input contains any operator
    if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('/')) {
        // split the input string into an array of numbers and operators
        const regex = /(\d+(\.\d+)?)|([+\-*\/])/g;
        const tokens = input.match(regex);

        // convert the tokens into an array of numbers and operators
        const numbers = [];
        const operators = [];
        tokens.forEach(token => {
            if (!isNaN(parseFloat(token))) {
                numbers.push(parseFloat(token));
            } else {
                operators.push(token);
            }
        });

        // calculate the result based on operator precedence
        const operatorPrecedence = {
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1
        };
        let resultStack = [];
        let operatorStack = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (!isNaN(parseFloat(token))) {
                // push numbers onto the result stack
                resultStack.push(parseFloat(token));
            } else {
                // handle operators
                while (operatorStack.length > 0 && operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]) {
                    // pop top operator from operator stack, pop two numbers from result stack,
                    // calculate result and push onto result stack
                    const operator = operatorStack.pop();
                    const num2 = resultStack.pop();
                    const num1 = resultStack.pop();
                    let result = 0;
                    switch (operator) {
                        case '+':
                            result = num1 + num2;
                            break;
                        case '-':
                            result = num1 - num2;
                            break;
                        case '*':
                            result = num1 * num2;
                            break;
                        case '/':
                            result = num1 / num2;
                            break;
                        default:
                            break;
                    }
                    resultStack.push(result);
                }
                // push current operator onto operator stack
                operatorStack.push(token);
            }
        }
        // handle any remaining operators
        while (operatorStack.length > 0) {
            // pop top operator from operator stack, pop two numbers from result stack,
            // calculate result and push onto result stack
            const operator = operatorStack.pop();
            const num2 = resultStack.pop();
            const num1 = resultStack.pop();
            let result = 0;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                default:
                    break;
            }
            resultStack.push(result);
        }
        // update the result observable with the calculated result
        this.result(resultStack.pop());
    } else {
        // if the input does not contain any operator, set the result to be the same as the input
        this.result(parseFloat(input));
    }
}

  
}

const viewModel = new ViewModel();
ko.applyBindings(viewModel);

