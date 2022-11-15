import { AMQPConnection } from '../amqp';
import { validateTripStatus } from '../schemaValidators';
import { TripStatus } from '../schemaTypes/index';

export class TripStatusConsumer {
    constructor(
        amqpConnection: AMQPConnection,
        readonly consume: (tripStatus: TripStatus) => Promise<void>
    ) {
        amqpConnection.subscribeQueueConsumer('trip_status', this._onMessage);
    }

    _onMessage = async (msg: object) => {
        const tripStatus = msg as TripStatus;
        validateTripStatus(tripStatus);
        await this.consume(tripStatus);
    };
}
