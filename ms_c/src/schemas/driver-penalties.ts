import { DriverPenalty } from './driver-penalty';

export const DriverPenalties = {
    $id: 'DriverPenalties',
    type: 'array',
    items: DriverPenalty,
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
