const path = require('path');
const untildify = require('untildify');

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
  outputPath = outputPath || './output.csv';
  columnNames = columnNames.length ? columnNames : validColumnNames;

  const isTildified = path => path[0] === '~';

  inputPath = isTildified(inputPath)
    ? untildify(inputPath)
    : path.resolve(__dirname, inputPath);

  return { columnNames, inputPath, outputPath, latIdx, lonIdx };
}

module.exports = validateAndFormatInput;
