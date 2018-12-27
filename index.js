require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const chalk = require('chalk');
const validateAndFormatInput = require('./src/validateAndFormatInput.js');
const reverseGeocodeCsv = require('reverse-geocode-csv');

let {
  columnNames,
  inputPath,
  outputPath,
  latIdx,
  lonIdx,
  error
} = validateAndFormatInput(argv);

if (error) {
  console.log(chalk.red.bold(error.title));
  if (error.body) {
    console.log(error.body);
  }
} else {
  fs.readFile(inputPath, { encoding: 'utf-8' }, (__, inputCsv) => {
    reverseGeocodeCsv(inputCsv, { columnNames, latIdx, lonIdx }).then(outputCsv => {
      writeFile(outputCsv)
    })
  });
}

function writeFile (csv) {
  fs.writeFile(outputPath, csv, err => {
    if (err) {
      return console.log(
        chalk.red.bold('Error writing file. Please contact support')
      );
    }

    console.log(chalk.green.bold(`file saved successfully to ${outputPath}`));
  });
}
