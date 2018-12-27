### Reverse Geocode CSV -> CSV

### Important
You need to add .env file to this directory with `GOOGLE_KEY=<API_KEY>`

##### Input:
Csv file with latitude and longitude params -> *Expects a column header for each column*

Sample Input:
```
Latz,Lawns
32.3182314,-86.902298
34.2675937,-86.2088669
43.4764994,-70.7161687
33.9120429,-86.5094315
45.0314546,-68.7286452
```

##### Usage
`git clone https://github.com/lucasprograms/reverse-geocode-csv.git&&cd reverse-geocode-csv`  
`npm install`  
`npm run convert` 

###### Options
| flag | content | default |
| ---- | ------- | ----- |
| `--inputPath` | `<path/to/file/file.csv>` | **REQUIRED** |
| `--outputPath` | `<output/path/filename.csv>` | './output.csv'|
| `--latIdx` | index of latitude column | 0 |
| `--lonIdx` | index of longitude column | defualts to 1|
| none | column names for output csv | all valid column names |

##### Example

`npm run convert --inputPath=~/Downloads/gwiLatLon.csv --outputPath=~/Documents/addresses/gwiAddresses.csv streetName streetNumber`



##### Output

csv file located at the provided output path (*e.g.,* `~/Documents/my/cool/stuff/providedName.csv`)
