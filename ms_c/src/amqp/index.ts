import amqplib from 'amqplib';
import { getConfig } from '../utils/config';

function getAmqpUri() {
    const user = getConfig('AMQP_USER');
    const pass = getConfig('AMQP_PASS');
    const host = getConfig('AMQP_HOST');
    const vhost = getConfig('AMQP_VHOST');
    return `amqp://${user}:${pass}@${host}${vhost}`;
}

export class AMQPConnection {
    connection: amqplib.Connection;
    channel: amqplib.Channel;

    static async create() {
        const amqpUri = getAmqpUri();
        console.log('amqpUri', amqpUri);
        const connection = await amqplib.connect(amqpUri);
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
