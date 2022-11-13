import { ResponseWithDriverPenalties } from '../schemas/driver-penalties';
import { findPenaltiesForDriver } from '../controllers/driver-penalties';
import { DriverPenaltyModel } from '../model/driver-penalty';
import { TypeProvider } from 'src/schema-types/type-provider';

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
