import { connectAndInitDatabase } from '../../src/services/database.service';

export async function connectAndClearDb() {
    const { client, db } = await connectAndInitDatabase();

    Promise.all(
        (await db.collections()).map(async function (collection) {
            if (collection.collectionName.indexOf('system.') === -1) {
                await collection.deleteMany({});
            }
        })
    );

    return { client, db };
}
