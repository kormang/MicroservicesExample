import { DriverPenalty, TripStatus } from '../schema-types';
import { calculatePenaltyScore } from './penalty-calc';

export function tripStatusToDriverPenalty(
    tripStatus: TripStatus
): DriverPenalty {
    const result: DriverPenalty = {
        penaltyScore: calculatePenaltyScore(tripStatus.speed),
        driverId: tripStatus.driver_id,
        driverName: tripStatus.driver_name,
        tripId: tripStatus.trip_id,
        createdAt: new Date(),
    };
    return result;
}
