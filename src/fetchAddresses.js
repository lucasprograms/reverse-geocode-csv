const NodeGeocoder = require('node-geocoder');
const geocoderOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_KEY
};

function fetchAddresses({ parsedCsvData, latIdx, lonIdx }) {
  return Promise.all(
    parsedCsvData.map((parsedCsvDatum, idx) => {
      if (idx !== 0) {
        return new Promise((resolve) =>
          NodeGeocoder(geocoderOptions)
            .reverse({ lat: parsedCsvDatum[latIdx], lon: parsedCsvDatum[lonIdx] })
            .then(res => resolve(res))
        );
      } else {
        return Promise.resolve({});
      }
    })
  );
}

module.exports = fetchAddresses;