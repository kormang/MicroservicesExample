export const TripStatus = {
    $id: 'TripStatus',
    type: 'object',
    properties: {
        speed: { type: 'number' },
        driver_name: { type: 'string' },
        car_model: { type: 'string' },
        driver_id: { type: 'number' },
        car_id: { type: 'number' },
        trip_id: { type: 'string', format: 'uuid' },
    },
    required: [
        'speed',
        'driver_name',
        'car_model',
        'driver_id',
        'car_id',
        'trip_id',
    ],
    additionalProperties: false,
} as const;
