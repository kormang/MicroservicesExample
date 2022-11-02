
import threading


class TripsManager:
    _trips = {}
    _lock = threading.Lock()

    def add(self, trip):
        with self._lock:
            self._trips[trip.id] = trip

    def remove(self, trip):
        with self._lock:
            del self._trips[trip.id]

    @property
    def trips(self):
        with self._lock:
            return self._trips.copy()


tripsManager = TripsManager()

