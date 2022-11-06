/* eslint-disable @typescript-eslint/no-unused-vars */
import { FromSchema } from 'json-schema-to-ts';
import { DriverPenalty } from '../schemas/driver-penalty';
import { TripStatus } from '../schemas/trip-status';

export type DriverPenalty = FromSchema<
    typeof DriverPenalty,
    {
        deserialize: [
            {
                pattern: {
                    type: 'string';
                    format: 'date-time';
                };
                output: Date;
            }
        ];
    }
>;

export type TripStatus = FromSchema<typeof TripStatus>;
