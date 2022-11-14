import { AMQPConnection } from './amqp';
import { TripStatusConsumer } from './consumers/trip_status';
import { applyPenaltyByTripStatus } from './controllers/driver-penalties';

export async function setupMessageConsumers() {
    const conn = await AMQPConnection.create();

    new TripStatusConsumer(conn, applyPenaltyByTripStatus);

    return conn;
}
