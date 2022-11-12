/* eslint-disable @typescript-eslint/no-unused-vars */
import { FromSchema } from 'json-schema-to-ts';
import { ObjectId } from 'mongodb';
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
            },
            {
                pattern: {
                    type: 'string';
                    format: 'object-id';
                };
                output: ObjectId;
            }
        ];
    }
>;

export type TripStatus = FromSchema<typeof TripStatus>;
