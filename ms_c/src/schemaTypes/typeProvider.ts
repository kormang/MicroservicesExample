import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FromSchemaOptions } from './fromSchemaOptions';

export type TypeProvider = JsonSchemaToTsProvider<FromSchemaOptions>;
