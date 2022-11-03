export const getDriverPenaltySchema = {
    querystring: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                penalties: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {},
                        required: [],
                    },
                },
            },
            required: ['penalties'],
        },
    },
};
