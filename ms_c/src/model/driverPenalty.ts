import { DriverPenalty } from '../schemaTypes';
import { ObjectId } from 'mongodb';

export class DriverPenaltyModel {
    constructor(
        public readonly penaltyScore: number,
        public readonly driverId: number,
        public readonly driverName: string,
        public readonly tripId: string,
        public readonly createdAt: Date,
        public readonly _id?: ObjectId
    ) {}

    static from(penalty: DriverPenalty) {
        return new DriverPenaltyModel(
            penalty.penaltyScore,
            penalty.driverId,
            penalty.driverName,
            penalty.tripId,
            penalty.createdAt
        );
    }
}
