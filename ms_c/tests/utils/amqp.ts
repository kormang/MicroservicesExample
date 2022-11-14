import { AMQPConnection } from '../../src/amqp';
import { setupMessageConsumers } from '../../src/setupConsumers';

export class AMQPTestConnection extends AMQPConnection {}

export async function setupAmqpForTest() {
    const conn = await setupMessageConsumers();
    const amqpTestConnection = await AMQPTestConnection.create();

    return [conn, amqpTestConnection];
}
