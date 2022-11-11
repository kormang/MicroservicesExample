import { AMQPConnection } from '../ampq';
import { validateTripStatus } from '../schema-validators';
import { TripStatus } from '../schema-types/index';

export class TripStatusConsumer {
    constructor(
        ampqConnection: AMQPConnection,
        readonly consume: (tripStatus: TripStatus) => Promise<void>
    ) {
        ampqConnection.subscribeQueueConsumer('trip_status', this._onMessage);
    }

    _onMessage = async (msg: object) => {
        const tripStatus = msg as TripStatus;
        validateTripStatus(tripStatus);
        await this.consume(tripStatus);
    };
}
