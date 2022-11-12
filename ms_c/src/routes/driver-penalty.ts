import { ResponseWithDriverPenalties } from '../schemas/driver-penalties';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { findPenaltiesForDriver } from '../controllers/driver-penalties';
import { DriverPenaltyModel } from '../model/driver-penalty';
import { driverPenaltyModelToJson } from '../adapters/driver-penalty';

export default async function routes(fastify: FastifyInstance) {
    const f = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    f.get(
        '/driver-penalties/',
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
            const penalties: Array<DriverPenaltyModel> =
                await findPenaltiesForDriver(request.query.driver_id);
            return {
                penalties: penalties.map(driverPenaltyModelToJson),
            };
        }
    );
}
