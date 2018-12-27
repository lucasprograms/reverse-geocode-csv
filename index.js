require('dotenv').config()

const argv = require('minimist')(process.argv.slice(2));
const parseCSV = require('csv-parse');
const generateCSV = require('csv-stringify');
const fs = require('fs');
const chalk = require('chalk');
const fetchAddresses = require('./src/fetchAddresses.js');
const validateAndFormatInput = require('./src/validateAndFormatInput.js');
const formatGeoData = require('./src/formatGeoData.js');

const { columnNames, inputPath, outputPath, latIdx, lonIdx, error } = validateAndFormatInput(argv)

if (error) {
  console.log(chalk.red.bold(error.title))
  if (error.body) {
    console.log(error.body);
  }
} else {
  fs.readFile(inputPath, { encoding: 'utf-8' }, (__, csv) => {
    parseCSV(csv, {}, (__, parsedCsvOutput) => {
      fetchAddresses({ parsedCsvData: parsedCsvOutput, latIdx, lonIdx }).then(res => {
        const formattedGeoData = [
          columnNames,
          ...formatGeoData({ geoData: res.slice(1).flat(), columnNames })
        ];
        writeCSV(formattedGeoData);
      });
    });
  });
}

function writeCSV(formattedGeoData) {
  generateCSV(formattedGeoData, (__, csv) => {
    fs.writeFile(outputPath, csv, err => {
      if (err) {
        return console.log(
          chalk.red.bold('Error writing file. Please contact support')
        );
      }

      console.log(chalk.green.bold(`file saved successfully to ${outputPath}`));
    });
  });
}

