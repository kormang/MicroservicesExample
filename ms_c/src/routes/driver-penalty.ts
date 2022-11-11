import { ResponseWithDriverPenalties } from '../schemas/driver-penalties';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { findPenaltiesForDriver } from '../controllers/driver-penalties';

export default async function routes(fastify: FastifyInstance) {
    const f = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    f.get(
        '/driver-penalty/',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        driver_id: { type: 'number' },
                    },
                    required: ['driver_id'],
                } as const,
                response: ResponseWithDriverPenalties,
            },
        },
        async (request) => {
            const penalties = findPenaltiesForDriver(request.query.driver_id);
            return { penalties };
        }
    );
}
