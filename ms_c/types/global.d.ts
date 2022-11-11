import {
    FastifyBaseLogger,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    FastifyInstance as FI,
} from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

declare global {
    type FastifyInstance = FI<
        RawServerDefault,
        RawRequestDefaultExpression<RawServerDefault>,
        RawReplyDefaultExpression<RawServerDefault>,
        FastifyBaseLogger,
        JsonSchemaToTsProvider
    >;
}
