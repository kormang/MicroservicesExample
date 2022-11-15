/* eslint-disable @typescript-eslint/no-unused-vars */
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { DriverPenalty } from '../schemas/driverPenalty';
import { TripStatus } from '../schemas/tripStatus';
import { FromSchemaOptions } from './fromSchemaOptions';

type SchemaType<S extends JSONSchema> = FromSchema<S, FromSchemaOptions>;

export type DriverPenalty = SchemaType<typeof DriverPenalty>;

export type TripStatus = SchemaType<typeof TripStatus>;
