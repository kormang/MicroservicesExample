import build from '../../../src/app';
import { DriverPenaltyModel } from '../../../src/model/driver-penalty';
import { ObjectId } from 'mongodb';
import { getCollections } from '../../../src/services/database.service';
import { connectAndClearDb } from '../../utils/db';

describe('GET /driver-penalties/', () => {
    it('returns penalties for specified driver', async () => {
        const app = build();

        const { client } = await connectAndClearDb();

        // TODO: How about using fixtures?
        const date1 = new Date();
        const id1 = new ObjectId();
        const date2 = new Date();
        const id2 = new ObjectId();
        const date3 = new Date();
        const id3 = new ObjectId();

        await getCollections().penalties?.insertMany([
            new DriverPenaltyModel(
                12,
                7,
                'Dname1',
                '03c8d031-4093-41e2-88e0-700cf78873aa',
                date1,
                id1
            ),
            new DriverPenaltyModel(
                23,
                24,
                'Dname2',
                '03c8d031-4093-41e2-88e0-700cf78873ab',
                date2,
                id2
            ),
            new DriverPenaltyModel(
                23,
                7,
                'Dname3',
                '03c8d031-4093-41e2-88e0-700cf78873ac',
                date3,
                id3
            ),
        ]);

        const response = await app.inject({
            method: 'GET',
            url: '/driver-penalties/?driver_id=7',
        });

        expect(JSON.parse(response.body).penalties).toEqual([
            {
                _id: id1.toString(),
                createdAt: date1.toISOString(),
                penaltyScore: 12,
                driverId: 7,
                driverName: 'Dname1',
                tripId: '03c8d031-4093-41e2-88e0-700cf78873aa',
            },
            {
                _id: id3.toString(),
                createdAt: date3.toISOString(),
                penaltyScore: 23,
                driverId: 7,
                driverName: 'Dname3',
                tripId: '03c8d031-4093-41e2-88e0-700cf78873ac',
            },
        ]);

        client.close();
    });
});
