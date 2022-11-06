import { eventEmmiter } from '../../../src/consumers/trip_status';

describe('Trip status consumer', () => {
    it('consumes trip status and emits event', () => {
        const callback = jest.fn();
        eventEmmiter.addListener('trip_status', callback);
        expect(callback).not.toBeCalled();
        const tripStatus = {
            speed: 83,
            driver_name: 'Danilo',
            car_model: 'Fico',
            driver_id: 10,
            car_id: 20,
            trip_id: '03c8d031-4093-41e2-88e0-700cf78873ac',
        };
    });
});
