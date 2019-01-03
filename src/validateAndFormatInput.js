const untildify = require('untildify');
const isValidPath = require('is-valid-path');
const path = require('path');

function validateAndFormatInput(input) {
  const validColumnNames = [
    'formattedAddress',
    'latitude',
    'longitude',
    'county',
    'state',
    'streetNumber',
    'streetName',
    'city',
    'country',
    'countryCode',
    'zipcode',
    'provider'
  ];

  let columnNames = input._;
  let { inputPath, outputPath, latIdx, lonIdx } = input;

  if (!inputPath) {
    return { error: { title: 'Must provide inputPath parameter' } };
  }

  const invalidColumns = columnNames.filter(
    columnName => !validColumnNames.includes(columnName)
  );

  if (invalidColumns.length) {
    return {
      error: {
        title: `INVALID COLUMN NAME(S): ${invalidColumns.join(', ')}`,
        body: `\nValid column names are: \n${validColumnNames.join('\n')}`
      }
    };
  }

  latIdx = latIdx || 0;
  lonIdx = !lonIdx && lonIdx !== 0 ? 1 : lonIdx;

  if (latIdx === lonIdx) {
    return {
      error: {
        title: `latIdx and lonIdx be identical`
      }
    }
  }

  outputPath = outputPath || './output.csv';
  columnNames = columnNames.length ? columnNames : validColumnNames;

  if (!isValidPath(inputPath)) {
    return {
      error: {
        title: `Invalid file path: ${inputPath}`
      }
    }
  }

  inputPath = untildify(inputPath)
  
  return { columnNames, inputPath, outputPath, latIdx, lonIdx };
}

module.exports = validateAndFormatInput;
