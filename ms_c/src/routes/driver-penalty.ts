import { FastifyInstance } from 'fastify';
import { getDriverPenaltySchema } from '../schemas/driver-penalty';

export default async function routes(fastify: FastifyInstance) {
    fastify.get(
        '/driver-penalty/',
        { schema: getDriverPenaltySchema },
        async (request, reply) => {
            return { penalties: [] };
        }
    );
}
