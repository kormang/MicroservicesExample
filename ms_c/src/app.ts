import Fastify, { FastifyInstance } from 'fastify';
import { getDriverPenaltySchema } from './schemas/driver-penalty';

const server: FastifyInstance = Fastify({});

server.get(
    '/driver-penalty/',
    { schema: getDriverPenaltySchema },
    async (request, reply) => {
        return { penalties: [] };
    }
);

const start = async (): Promise<void> => {
    try {
        await server.listen({ port: 3000 });
    } catch (err) {
        server.log.error(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
