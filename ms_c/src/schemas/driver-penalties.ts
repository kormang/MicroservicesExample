export const DriverPenaltiesSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {},
        required: [],
    },
};

export const ResponseWithDriverPenalties = {
    200: {
        type: 'object',
        properties: {
            penalties: DriverPenaltiesSchema,
        },
        required: ['penalties'],
    },
};
