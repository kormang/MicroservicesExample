import amqplib from 'amqplib';
import { getConfig } from '../utils/config';

export class AMQPConnection {
    connection: amqplib.Connection;
    channel: amqplib.Channel;

    static async create() {
        const ampqUri = getConfig('AMPQ_URI');
        const connection = await amqplib.connect(ampqUri);
        const channel = await connection.createChannel();
        return new AMQPConnection(connection, channel);
    }

    constructor(connection: amqplib.Connection, channel: amqplib.Channel) {
        this.connection = connection;
        this.channel = channel;
    }

    subscribeQueueConsumer = async (
        queueName: string,
        onMessage: (msg: object) => Promise<void>
    ): Promise<void> => {
        const channel = this.channel;
        await channel.assertQueue(queueName);

        // Listener
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const msgString = msg.content.toString();
                    await onMessage(JSON.parse(msgString));
                } catch (ex) {
                    console.error(ex);
                } finally {
                    // Should we ack here?
                    channel.ack(msg);
                }
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    };

    send = (queueName: string, msg: object): boolean => {
        return this.channel.sendToQueue(
            queueName,
            Buffer.from(JSON.stringify(msg))
        );
    };
}
