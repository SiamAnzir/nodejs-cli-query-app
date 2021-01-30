const readJsonData = require("./data");
const chalk = require('chalk');

const validator = require("./validator");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/** After running the terminal displayText will be shown  */

const displayText = `
    Command Line Interface Query App.
  
    commands can be:
      
      Type exit or Press Ctrl+C for exiting the command Line;

      Search Value can be count/width/length/item;

      Range Value must be integer or float;

      **Type help for displaying this full text again** 

    `
console.log(chalk.green(displayText));

/** Command Line Query Operation  */

const getCommandFromCli = () => {
    rl.question('What do you want to do?? Type search/help/exit: ', (answer) => {
        getOperationCommand(answer);
        rl.question('What do you want to Search? Type count/item/length/width:  ', (search) => {
            checkParameterValidator(validator.parameterValidator(search));
            rl.question('its Value? Type integer or float number: ', (value) => {
                checkNumberRangeValidator(validator.numberRangeValidator(value));
                getSearchResult(search, value);
                getCommandFromCli();
            });
        });
    });
}

/** Checking Parameter Validator for Search Option */

const checkParameterValidator = (parameterValue) => {
    if (parameterValue == true) {
        console.log(chalk.yellow('Command Accepted'));
    } else if (parameterValue == false) {
        console.log(chalk.red('Wrong Input\n**Type help to know how to use it**'));
        getCommandFromCli();
    } else if (parameterValue == 'exit') {
        console.log(chalk.yellow('Closing the Terminal....'));
        process.exit(0);
    } else {
        console.log(chalk.green(displayText));
        getCommandFromCli();
    }
}

/** Checking Range Validator for Value Option */

const checkNumberRangeValidator = (numberRangeValue) => {
    if (numberRangeValue == true) {
        console.log(chalk.yellow('Command Accepted'));
    } else {
        console.log(chalk.red('Wrong Input , Please search by integer or float number'));
    }
}

/** Operation of first Question from readline method */

const getOperationCommand = (answerValue) => {
    switch (answerValue) {
        case 'search':
            console.log(chalk.yellow('Command Accepted'));
            console.log(chalk.blue('***Type help to know how to use it**'));
            break;
        case 'help':
            console.log(chalk.green(displayText));
            getCommandFromCli();
            break;
        case 'exit':
            console.log(chalk.yellow('Closing the Terminal....'));
            process.exit(0);
        default:
            console.log(chalk.red('Wrong Input\n**Type help to know how to use it**'));
            getCommandFromCli()
    }
}

/** Operation of second and third Question from readline method */

const getSearchResult = (searchValue, rangeValue) => {
    console.log(`Search Result:`);
    let searchResult = readJsonData.filter(object => object[searchValue] <= parseInt(rangeValue));
    console.log(searchResult.length);
    if (searchResult == 0) {
        console.log(chalk.red("Nothing found"));
    } else {
        let finalResult;
        for (let i = 0; i < searchResult.length; i++) {
            finalResult = "Name: " + searchResult[i]["name"] + "  KeyId:" + searchResult[i]["key"] + `  ${searchValue} : ` + searchResult[i][searchValue];
            console.log(chalk.blue(finalResult));
        }
    }
}

getCommandFromCli();