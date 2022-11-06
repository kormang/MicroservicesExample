import { tripStatusToDriverPenalty } from '../../../src/policies';

describe('tripStatusToDriverPenalty', () => {
    it('returns driver penalty for trip status', () => {
        const timeBefore = new Date().getTime();

        const ps = tripStatusToDriverPenalty({
            speed: 65,
            driver_id: 5,
            driver_name: 'Dname',
            trip_id: '123e4567-e89b-12d3-a456-426655440000',
            car_id: 4,
            car_model: 'Mazda',
        });
        const timeAfter = new Date().getTime();
        expect(ps.createdAt.getTime()).toBeLessThanOrEqual(timeAfter);
        expect(ps.createdAt.getTime()).toBeGreaterThanOrEqual(timeBefore);
        expect(ps.driverId).toBe(5);
        expect(ps.driverName).toBe('Dname');
        expect(ps.tripId).toBe('123e4567-e89b-12d3-a456-426655440000');
    });
});
