function formatGeoData({ geoData, columnNames }) {
  return geoData.map(geoDatum =>
    columnNames.map(columnName => {
      if (columnName === 'state') {
        return geoDatum['administrativeLevels']['level1short'];
      } else if (columnName === 'county') {
        return geoDatum['administrativeLevels']['level2short'];
      }
      return geoDatum[columnName];
    })
  );
}

module.exports = formatGeoData;