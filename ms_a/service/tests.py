import json
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework.test import APITestCase
from django.urls import reverse
from unittest.mock import patch


class CarViewSetTests(APITestCase):
    def test_no_items(self):
        response = self.client.get('/cars/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_create_and_retrieve(self):
        response = self.client.post('/cars/', {'model': 'Yugo'})
        self.assertEqual(response.status_code, 201)
        new_id = json.loads(response.content)['id']

        response = self.client.get('/cars/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),
            [{'id': new_id, 'model': 'Yugo', 'driver': None}])

        response = self.client.get(f'/cars/{new_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),
            {'id': new_id, 'model': 'Yugo', 'driver': None})

    def test_get_non_existant(self):
        response = self.client.get(f'/cars/1/')
        self.assertEqual(response.status_code, 404)


class DriverViewSetTests(APITestCase):
    def test_no_items(self):
        response = self.client.get('/drivers/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_create_and_retrieve(self):
        response = self.client.post('/drivers/', {'name': 'Andjela'})
        self.assertEqual(response.status_code, 201)
        new_id = json.loads(response.content)['id']

        response = self.client.get('/drivers/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),
            [{'id': new_id, 'name': 'Andjela'}])

        response = self.client.get(f'/drivers/{new_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content),
            {'id': new_id, 'name': 'Andjela'})

    def test_get_non_existant(self):
        response = self.client.get(f'/drivers/1/')
        self.assertEqual(response.status_code, 404)

class TripCustomViewTests(APITestCase):
    fixtures = ['for_trip.yaml']

    def test_no_items(self):
        response = self.client.get('/trips/', {'driver_id': 2991})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])
        response = self.client.get('/trips/?car_id=1999')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_get_items(self):
        response = self.client.get('/trips/?driver_id=2002')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['id'],
            '0eec6b77-d06d-4ccc-bf74-5100cb92db74')
        response = self.client.get('/trips/?car_id=1001')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['id'],
            '0eec6b77-d06d-4ccc-bf74-5100cb92db74')
        response = self.client.get('/trips/?car_id=1001&driver_id=2002')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['id'],
            '0eec6b77-d06d-4ccc-bf74-5100cb92db74')

    @patch('service.events.TripEventEmmitter.emit')
    def test_create_and_retrieve(self, mock):
        response = self.client.post('/trips/',
            {'car_id': 1002, 'driver_id': 2001})
        self.assertEqual(response.status_code, 201)
        new_trip = json.loads(response.content)
        new_id = new_trip['id']
        self.assertEqual(new_trip['driver'], 2001)
        self.assertEqual(new_trip['car'], 1002)
        self.assertEqual(new_trip['end_time'], None)
        self.assertLess(
            parse_datetime(new_trip['start_time']),
            timezone.now())
        mock.assert_called_once_with('started', new_trip)

        response = self.client.get('/trips/')
        self.assertEqual(response.status_code, 200)
        result_data = json.loads(response.content)
        self.assertEqual(len(result_data), 2)
        idx = 0 if result_data[0]['id'] == new_id else 1
        self.assertEqual(result_data[idx]['driver'], 2001)
        self.assertEqual(result_data[idx]['car'], 1002)
        self.assertEqual(result_data[idx]['end_time'], None)

        response = self.client.get(f'/trips/{new_id}/')
        self.assertEqual(response.status_code, 200)
        result_data = json.loads(response.content)
        self.assertEqual(result_data['driver'], 2001)
        self.assertEqual(result_data['car'], 1002)


    @patch('service.events.TripEventEmmitter.emit')
    def test_end_trip(self, mock):
        id = '0eec6b77-d06d-4ccc-bf74-5100cb92db74'
        response = self.client.get(f'/trips/{id}/')
        trip = json.loads(response.content)
        self.assertIsNone(trip['end_time'])

        wrong_id = '0eec6b77-d06d-4ccc-bf74-5100cb92db75'
        response = self.client.put(f'/trips/end_trip/{wrong_id}/')
        self.assertEqual(response.status_code, 404)

        response = self.client.put(f'/trips/end_trip/{id}/')
        self.assertEqual(response.status_code, 200)
        mock.assert_called_once_with('ended', json.loads(response.content))

        response = self.client.get(f'/trips/{id}/')
        trip = json.loads(response.content)
        self.assertIsNotNone(trip['end_time'])
        self.assertLess(
            parse_datetime(trip['end_time']),
            timezone.now())

        response = self.client.put(f'/trips/end_trip/{id}/')
        self.assertEqual(response.status_code, 400)


class DriverAssignmentViewTests(APITestCase):
    fixtures = ['for_trip.yaml']

    def test_assing_driver(self):
        response = self.client.put(reverse('assign_driver'),
            {'car_id': 1002, 'driver_id': 2001})
        self.assertEqual(response.status_code, 200)

        response = self.client.get('/cars/1002/')
        car = json.loads(response.content)
        self.assertEqual(car['driver'], 2001)
