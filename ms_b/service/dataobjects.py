
class Trip:
    id = 0
    start_time = None
    end_time = None
    car_id = 0
    car_model = ''
    driver_id = 0
    driver_name = ''

class TripStatus:
    def __init__(self,
            trip_id, driver_id, driver_name, car_id, car_model, speed):
        self.trip_id = trip_id
        self.driver_id = driver_id
        self.driver_name = driver_name
        self.car_id = car_id
        self.car_model = car_model
        self.speed = speed
