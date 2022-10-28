from random import randrange
import schedule
from service.trips_manager import tripsManager

class TripStatus:
    def __init__(self,
            trip_id, driver_id, driver_name, car_id, car_model, speed):
        self.trip_id = trip_id
        self.driver_id = driver_id
        self.driver_name = driver_name
        self.car_id = car_id
        self.car_model = car_model
        self.speed = speed


class Simulator:
    callback = None

    def __init__(self):
        schedule.every().minute.do(self.randomize_speed)

    def randomize_speed(self):
        for trip in tripsManager.trips.values():
            speed = randrange(200)
            trip_status = TripStatus(
                trip.id, trip.driver_id, trip.driver_name,
                trip.car_id, trip.car_model, speed)

            if self.callback is not None:
                self.callback(trip_status)


simulator = Simulator()

