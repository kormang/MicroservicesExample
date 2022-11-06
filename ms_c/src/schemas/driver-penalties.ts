import { DriverPenalty } from './driver-penalty';

export const DriverPenalties = {
    type: 'array',
    items: {
        type: { $ref: DriverPenalty },
    },
} as const;

export const ResponseWithDriverPenalties = {
    200: {
        type: 'object',
        properties: {
            penalties: DriverPenalties,
        },
        required: ['penalties'],
    },
} as const;
