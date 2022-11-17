import * as mongoDB from 'mongodb';
import { getConfig } from '../utils/config';

const collections: { penalties?: mongoDB.Collection } = {};

async function createPenaltiesCollection(db: mongoDB.Db) {
    const collName = 'penalties';

    // By default collections are really created on first insert.
    // But to simplify tests, create collection immediatelly.
    const allCollNames = (await db.collections()).map((c) => c.collectionName);
    if (!allCollNames.includes(collName)) {
        await db.createCollection(collName);
    }

    const penaltiesCollection: mongoDB.Collection = db.collection(collName);

    collections.penalties = penaltiesCollection;

    await db.command({
        collMod: collName,
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'penaltyScore',
                    'driverName',
                    'driverId',
                    'tripId',
                    'createdAt',
                ],
                additionalProperties: false,
                properties: {
                    _id: {},
                    penaltyScore: {
                        bsonType: 'number',
                    },
                    driverName: {
                        bsonType: 'string',
                    },
                    driverId: {
                        bsonType: 'number',
                    },
                    tripId: {
                        bsonType: 'string',
                    },
                    createdAt: {
                        bsonType: 'date',
                    },
                },
            },
        },
    });
}

let _dbName = '';
export function getDbName() {
    if (!_dbName) {
        _dbName = getConfig('MONGO_DBNAME');
        if (!_dbName) {
            // Fallback to random name (for tests).
            // TODO: Implement this so that db is deleted when tests finish,
            // for example using global afterAll.
            _dbName = 'test_msedb_' + Math.ceil(Math.random() * 10000000);
        }
    }
    return _dbName;
}

function getConnectionString() {
    const user = getConfig('MONGO_USER');
    const pass = getConfig('MONGO_PASS');
    const host = getConfig('MONGO_HOST');
    const dbName = getDbName();
    return `mongodb://${user}:${pass}@${host}:27017/${dbName}?&authSource=admin`;
}

export async function connectToDatabase() {
    const connStr = getConnectionString();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connStr);

    await client.connect();

    return client;
}

export async function connectAndInitDatabase() {
    const client = await connectToDatabase();

    const dbName = getDbName();
    const db: mongoDB.Db = client.db(dbName);

    await createPenaltiesCollection(db);

    console.log(`Successfully connected to database: ${db.databaseName}`);

    return { client, db };
}

export function getCollections() {
    return collections;
}
