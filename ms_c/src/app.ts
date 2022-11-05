import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import driverPenaltyRoutes from './routes/driver-penalty';
import mongoPlugin from './database/mongo';

const server = Fastify().withTypeProvider<JsonSchemaToTsProvider>();

server.register(mongoPlugin);
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
