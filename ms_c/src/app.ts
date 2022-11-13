import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import driverPenaltyRoutes from './routes/driver-penalty';
import { FromSchemaOptions } from './schema-types/from-schema-options';

function build() {
    const app =
        Fastify().withTypeProvider<JsonSchemaToTsProvider<FromSchemaOptions>>();

    app.register(driverPenaltyRoutes);

    return app;
}

export default build;
