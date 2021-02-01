/** Create Validator for checking the input Values */

const parameterValidator = (queryString) => {
    switch (queryString) {
        case 'count':
        case 'item':
        case 'length':
        case 'width':
            return true;
        case 'help':
            break;
        case 'exit':
            return 'exit';
        default:
            return false;
    }
}

const numberRangeValidator = (range) => {
    /** Only take the input of integer or decimal number */
    let numbers = /^\d+$/;
    let decimal = /^[+]?[0-9]+\.[0-9]+$/;
    if (range.match(numbers) || range.match(decimal))
        return true;
}

/** Exports two functions into main.js */

module.exports = { parameterValidator, numberRangeValidator }