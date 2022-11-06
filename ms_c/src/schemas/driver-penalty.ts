export const DriverPenalty = {
    $id: 'DriverPenalty',
    type: 'object',
    properties: {
        penaltyScore: { type: 'number' },
        driverId: { type: 'number' },
        driverName: { type: 'string' },
        tripId: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time', tsType: 'Date' },
    },
    required: ['penaltyScore', 'driverId', 'driverName', 'tripId', 'createdAt'],
    additionalProperties: false,
} as const;
