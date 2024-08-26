document.addEventListener("DOMContentLoaded", () => {
    const resultDisplay = document.getElementById("result");
    let expression = ""; // Store the expression string

    // Number buttons
    const numberButtons = document.querySelectorAll("#number-box button");
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            expression += button.textContent; // Add the clicked number to the expression
            resultDisplay.textContent = expression;
        });
    });

    // Operator buttons
    const operatorButtons = document.querySelectorAll("#operator-box button");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            expression += ` ${button.textContent} `; // Add operator with spaces around it
            resultDisplay.textContent = expression;
        });
    });

    // Clear button
    document.getElementById("clear").addEventListener("click", () => {
        expression = ""; // Clear the expression
        resultDisplay.textContent = "Hasilnya"; // Reset the result display
    });

    // Delete button (removes last character)
    document.getElementById("delete").addEventListener("click", () => {
        expression = expression.trim().slice(0, -1); // Remove the last character
        resultDisplay.textContent = expression || "Hasilnya"; // Update or reset display
    });

    // Equal button
    document.getElementById("equal").addEventListener("click", () => {
        if (expression) {
            
            let result = evalExp(expression); // Evaluate the expression
            resultDisplay.textContent = result; // Show result
        }
    });

    // Function to evaluate the expression
    function evalExp(expression) {
        let stackValue = [];
        let stackOperators = [];
        let importance = { "+": 1, "-": 1, "x": 2, "/": 2, "%": 3 };

        // Split expression by spaces
        let tokens = expression.match(/\d+|\+|\-|\x|\/|\%/g);

        for (let token of tokens) {
            if (!isNaN(token)) {
                stackValue.push(Number(token));
            } else if (token in importance) {
                while (
                    stackOperators.length > 0 &&
                    importance[token] <= importance[stackOperators[stackOperators.length - 1]]
                ) {
                    let operator = stackOperators.pop();
                    let value2 = stackValue.pop();
                    let value1 = stackValue.pop();
                    let result = applyOperator(operator, value1, value2);
                    stackValue.push(result);
                }
                stackOperators.push(token);
            }
        }

        while (stackOperators.length > 0) {
            let operator = stackOperators.pop();
            let value2 = stackValue.pop();
            let value1 = stackValue.pop();
            let result = applyOperator(operator, value1, value2);
            stackValue.push(result);
        }

        return stackValue.pop();
    }

    // Helper function to apply the operation
    function applyOperator(operator, value1, value2) {
        if (operator === "+") return value1 + value2;
        if (operator === "-") return value1 - value2;
        if (operator === "x") return value1 * value2;
        if (operator === "/") return value1 / value2;
        if (operator === "%") return value1 % value2;
        throw "Unknown operator";
    }
});
