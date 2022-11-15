import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import driverPenaltyRoutes from './routes/driverPenalty';
import { FromSchemaOptions } from './schemaTypes/fromSchemaOptions';

function build() {
    const app =
        Fastify().withTypeProvider<JsonSchemaToTsProvider<FromSchemaOptions>>();

    app.register(driverPenaltyRoutes);

    return app;
}

export default build;
