import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { TripStatus } from '../schemas/trip-status';

const ajv = new Ajv();
addFormats(ajv);

export const validateTripStatus = ajv.compile(TripStatus);
