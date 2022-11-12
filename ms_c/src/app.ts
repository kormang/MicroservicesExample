import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import driverPenaltyRoutes from './routes/driver-penalty';

function build() {
    const app = Fastify().withTypeProvider<JsonSchemaToTsProvider>();

    app.register(driverPenaltyRoutes);

    return app;
}

export default build;
