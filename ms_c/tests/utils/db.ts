import { connectToDatabase } from '../../src/services/database.service';

export async function connectAndClearDb() {
    const { client, db } = await connectToDatabase();

    (await db.collections()).forEach(function (collection) {
        if (collection.collectionName.indexOf('system.') == -1)
            collection.drop();
        else collection.deleteMany({});
    });

    return { client, db };
}
