import { DriverPenaltyModel } from 'src/model/driver-penalty';

export const driverPenaltyModelToJson = (model: DriverPenaltyModel) => ({
    ...model,
    _id: model._id?.toString(),
    createdAt: model.createdAt.toISOString(),
});
