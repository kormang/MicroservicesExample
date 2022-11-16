import { ResponseWithDriverPenalties } from 'src/schemas/driverPenalties';
import { findPenaltiesForDriver } from 'src/controllers/driverPenalties';
import { DriverPenaltyModel } from 'src/model/driverPenalty';
import { TypeProvider } from 'src/schemaTypes/typeProvider';

export default async function routes(fastify: FastifyInstance) {
    const f = fastify.withTypeProvider<TypeProvider>();

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
            return { penalties };
        }
    );
}
