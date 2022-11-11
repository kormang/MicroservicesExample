import { AMQPConnection } from '../../src/ampq';
import { setupMessageConsumers } from '../../src/setupConsumers';

export class AMQPTestConnection extends AMQPConnection {}

export async function setupAmpqForTest() {
    const conn = await setupMessageConsumers();
    const amqpTestConnection = await AMQPTestConnection.create();

    return [conn, amqpTestConnection];
}
