var jsonObj = require("./rows");
const fs = require('fs');
const path = require('path');

/** Taking Array Values from rows.json file */

let arrayValues = [];
for (let i = 1; i < jsonObj.data.length; i++) {
    arrayValues[i] = jsonObj.data[i];
}

/** Taking common key values for each array data */
const keyValues = [
    'key',
    'id',
    'averageRating',
    'createdAt',
    'attribution',
    'updatedAt',
    'attributionLink',
    'format',
    'name',
    'address',
    'item',
    'count',
    'message',
    'authCode',
    'icComplete',
    'displayType',
    'hideFromCatalog',
    'hideFromCatalog',
    'hideFromCatalog',
    'hideFromCatalog',
    'length',
    'hideFromCatalog',
    'hideFromCatalog',
    'hideFromCatalog',
    'width',
    'oid'
]

const addressKeyValues = [
    'description',
    'long',
    'lat',
    'newBackend',
    'publicationAppendEnabled'
]

/** Merging Two arrays and converting it into object */

const convertArrayToObject = (key, arrayData) => Object.assign(...key.map((value, index) => ({
    [value]: arrayData[index]
})));

/** Create Object Set from each merging Arrays */

const createObjectSet = (indexValue) => {
    let dataSet = {};
    dataSet = convertArrayToObject(keyValues, arrayValues[indexValue]);
    delete dataSet.address;
    address = convertArrayToObject(addressKeyValues, arrayValues[indexValue][9]);
    dataSet.address = address;
    return dataSet;
}
let allDataSet = [];
for (let x = 1; x < arrayValues.length; x++) {
    let allData = {};
    allData = createObjectSet(x);
    allDataSet.push(allData);
}
console.log(allDataSet);

/** createing new file and writing file with the all Data Set value */

try {
    fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(allDataSet));
    console.log("file write successfully done");
} catch (err) {
    console.log(err);
}