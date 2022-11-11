import * as mongoDB from 'mongodb';
import { getConfig } from '../utils/config';

const collections: { penalties?: mongoDB.Collection } = {};

async function createPenaltiesCollection(db: mongoDB.Db) {
    const collName = 'penalties';
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
                        bsonType: 'string',
                    },
                },
            },
        },
    });
}

export async function connectToDatabase() {
    const connStr = getConfig('MONGO_CONN_STR');
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connStr);

    await client.connect();

    const dbName = connStr.split('/').pop();
    const db: mongoDB.Db = client.db(dbName);

    await createPenaltiesCollection(db);

    console.log(`Successfully connected to database: ${db.databaseName}`);

    return db;
}

export function getCollections() {
    return collections;
}
