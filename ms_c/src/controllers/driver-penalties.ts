export function findPenaltiesForDriver(mongo: Mongo, driverId: number) {
    const penaltiesCollection = mongo.db?.collection('driver_penalties');
    const penalties = penaltiesCollection?.find({ driverId });
    return penalties;
}
