
from .producers import publish_to_trips


class TripEventEmmitter:
    def emit(self, type, data):
        publish_to_trips(type, data)
