import { AMQPConnection } from './amqp';
import { TripStatusConsumer } from './consumers/tripStatus';
import { applyPenaltyByTripStatus } from './controllers/driverPenalties';

export async function setupMessageConsumers() {
    const conn = await AMQPConnection.create();

    new TripStatusConsumer(conn, applyPenaltyByTripStatus);

    return conn;
}
