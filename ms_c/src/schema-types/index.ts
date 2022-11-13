/* eslint-disable @typescript-eslint/no-unused-vars */
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { DriverPenalty } from '../schemas/driver-penalty';
import { TripStatus } from '../schemas/trip-status';
import { FromSchemaOptions } from './from-schema-options';

type SchemaType<S extends JSONSchema> = FromSchema<S, FromSchemaOptions>;

export type DriverPenalty = SchemaType<typeof DriverPenalty>;

export type TripStatus = SchemaType<typeof TripStatus>;
