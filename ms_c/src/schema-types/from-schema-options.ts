import { ObjectId } from 'mongodb';

export type FromSchemaOptions = {
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
};
