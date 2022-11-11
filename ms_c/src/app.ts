import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import driverPenaltyRoutes from './routes/driver-penalty';
import { connectToDatabase } from './services/database.service';
import { setupMessageConsumers } from './setupConsumers';

const server = Fastify().withTypeProvider<JsonSchemaToTsProvider>();

server.register(driverPenaltyRoutes);

const start = async (): Promise<void> => {
    try {
        await connectToDatabase();
        await setupMessageConsumers();
        await server.listen({ port: 3000 });
    } catch (err) {
        server.log.error(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
