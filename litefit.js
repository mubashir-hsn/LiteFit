/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'Litefit-ecomerce';
const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use(database);

// db.products.updateMany(
//     {
//         $or: [
//             { category: 'dress' },
//             { category: 'pentshirt' },
//             { category: 'pentcoat' },
//             { category: 'kurta' },
//             { category: 'hoodie' },
//         ]
//     },
//     {
//         $set: {
//             sizes: ['s', 'm', 'lg', 'xl', 'xxl']
//         }
//     }
// )

db.products.updateMany(
    {
        category: 'footwear' // Change if needed
    },
    {
        $set: {
            sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
        }
    }
)


// Create a new collection.

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
