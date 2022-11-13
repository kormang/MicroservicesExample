import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FromSchemaOptions } from './from-schema-options';

export type TypeProvider = JsonSchemaToTsProvider<FromSchemaOptions>;
