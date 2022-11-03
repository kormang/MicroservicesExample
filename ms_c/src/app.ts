import Fastify, { FastifyInstance } from 'fastify';
import driverPenaltyRoutes from './routes/driver-penalty';

const server: FastifyInstance = Fastify({});

server.register(driverPenaltyRoutes);

const start = async (): Promise<void> => {
    try {
        await server.listen({ port: 3000 });
    } catch (err) {
        server.log.error(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
