import json
from service.dataobjects import Trip, TripStatus


def collect_object_keys(obj):
    return set(name for name in dir(obj)
               if not name.startswith('__'))


def dict_to_obj(obj, data, obj_keys=None):
    if obj_keys is None:
        obj_keys = collect_object_keys(obj)

    data_keys = set(data.keys())
    assert obj_keys == data_keys, \
        f'{obj_keys} == {data_keys}'
    for k, v in data.items():
        setattr(obj, k, v)
    return obj


def obj_to_dict(obj, obj_keys=None):
    if obj_keys is None:
        obj_keys = collect_object_keys(obj)

    return {key: getattr(obj, key) for key in obj_keys}


trip_keys = collect_object_keys(Trip)


def trip_from_dict(data):
    t = Trip()
    return dict_to_obj(t, data, trip_keys)


class TripDecoder(json.JSONDecoder):

    def decode(self, s: str):
        t = Trip()
        data = super().decode(s)
        return dict_to_obj(t, data, trip_keys)


class ObjectEncoder(json.JSONEncoder):

    cls = None

    def default(self, obj):
        assert self.cls is not None

        if isinstance(obj, self.cls):
            return obj_to_dict(obj)

        if isinstance(obj, dict):
            return {k: json.JSONEncoder.default(self, obj[k]) for k in obj.keys()}

        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)


class TripEncoder(ObjectEncoder):
    cls = Trip


class TripStatusEncoder(ObjectEncoder):
    cls = TripStatus

