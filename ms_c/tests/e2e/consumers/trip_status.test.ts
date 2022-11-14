import { DriverPenaltyModel } from '../../../src/model/driver-penalty';
import { DriverPenalty } from '../../../src/schema-types';
import { getCollections } from '../../../src/services/database.service';
import { waitFor } from '../../utils';
import { setupAmqpForTest } from '../../utils/amqp';
import { connectAndClearDb } from '../../utils/db';

async function countPenalties() {
    return await getCollections().penalties?.countDocuments();
}

describe('Trip status consumer', () => {
    it('consumes trip status and write it to db', async () => {
        const [conn, amqpTestConnection] = await setupAmqpForTest();
        const { client } = await connectAndClearDb();
        try {
            expect(await countPenalties()).toBeFalsy();

            const tripStatus = {
                speed: 83,
                driver_name: 'Danilo',
                car_model: 'Fico',
                driver_id: 10,
                car_id: 20,
                trip_id: '03c8d031-4093-41e2-88e0-700cf78873ac',
            };

            expect(
                amqpTestConnection.send('trip_status', tripStatus)
            ).toBeTruthy();

            const condition = async () => Number(await countPenalties()) === 1;
            await waitFor(condition);

            const penalties = await getCollections()
                .penalties?.find()
                .toArray();

            expect(penalties).not.toBe(undefined);
            if (typeof penalties === 'undefined') {
                throw 'undefined';
            }
            expect(penalties?.length).toBe(1);
            expect(penalties).toEqual([
                {
                    _id: penalties[0]._id,
                    createdAt: penalties[0].createdAt,
                    penaltyScore: 26,
                    driverId: 10,
                    driverName: 'Danilo',
                    tripId: '03c8d031-4093-41e2-88e0-700cf78873ac',
                },
            ]);
        } finally {
            await amqpTestConnection.connection.close();
            await conn.connection.close();
            client.close();
        }
    });
});
