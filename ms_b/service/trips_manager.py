
class TripsManager:
    trips = {}

    def add(self, trip):
        self.trips[trip.id] = trip

    def remove(self, trip):
        del self.trips[trip.id]

tripsManager = TripsManager()

