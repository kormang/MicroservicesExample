from random import randrange
from threading import Thread
import threading
import schedule
import time
from service.trips_manager import tripsManager
from service.dataconverters import TripStatus

class Simulator:
    _callback = None
    _cb_lock = threading.Lock()

    def __init__(self):
        schedule.every(30).seconds.do(self.randomize_speed)
        Thread(target=self.run, daemon=True).start()


    def run(self):
        while True:
            schedule.run_pending()
            time.sleep(1)


    def randomize_speed(self):
        trips = tripsManager.trips
        for trip in trips.values():
            speed = randrange(200)
            trip_status = TripStatus(
                trip.id, trip.driver_id, trip.driver_name,
                trip.car_id, trip.car_model, speed)

            self.call_callback(trip_status)

    def call_callback(self, trip_status):
        with self._cb_lock:
            if self._callback is not None:
                self._callback(trip_status)

    def set_callback(self, callback):
        with self._cb_lock:
            self._callback = callback


simulator = Simulator()

