import { DriverPenaltyModel } from '../model/driver-penalty';
import { tripStatusToDriverPenalty } from '../policies';
import { TripStatus } from '../schema-types';
import { getCollections } from '../services/database.service';

export function findPenaltiesForDriver(driverId: number) {
    const { penalties } = getCollections();
    if (!penalties) {
        throw new Error('Penalties collection missing.');
    }
    return penalties.find<DriverPenaltyModel>({ driverId }).toArray();
}

export async function applyPenaltyByTripStatus(tripStatus: TripStatus) {
    const penalty = tripStatusToDriverPenalty(tripStatus);
    const model = DriverPenaltyModel.from(penalty);
    await getCollections().penalties?.insertOne(model);
}
