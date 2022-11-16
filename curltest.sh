#! /bin/bash

echo "=============== CREATE CAR AND DRIVER ================="
curl -i -X POST http://localhost:8000/cars/ -H "Content-Type: application/json" -H "Accept: application/json" --data '{"name":"Mercedes"}'
curl -i -X POST http://localhost:8000/drivers/ -H "Content-Type: application/json" -H "Accept: application/json" --data '{"name":"Rastko"}'

echo "=============== GET CAR AND DRIVER ================="
curl -i -X GET http://localhost:8000/cars/ -H "Content-Type: application/json" -H "Accept: application/json"
curl -i -X GET http://localhost:8000/drivers/ -H "Content-Type: application/json" -H "Accept: application/json"

echo "=============== CREATE TRIP AND ASSIGN DRIVER TO CAR ================="
curl -i -X POST http://localhost:8000/trips/ -H "Content-Type: application/json" -H "Accept: application/json" --data '{"driver_id":1, "car_id": 1}'
curl -i -X PUT http://localhost:8000/trips/assign_driver/ -H "Content-Type: application/json" -H "Accept: application/json" --data '{"driver_id":1, "car_id": 1}'

sleep 10

echo "=============== GET TRIPS TRACKED BY SERVICE B ================="
curl -i -X GET http://localhost:8001/trips/ -H "Content-Type: application/json" -H "Accept: application/json"

sleep 60

echo "=============== END TRIP (TODO: ID is random, needs to be inserted) ================="
curl -i -X PUT http://localhost:8000/trips/end_trip/7147cc2d-bb81-4857-8ba2-965e9de00c7f/ -H "Content-Type: application/json" -H "Accept: application/json"


echo "=============== GET PENALTIES FOR DRIVER ================="
curl -i -X GET http://localhost:3000/driver-penalties/?driver_id=1 -H "Content-Type: application/json" -H "Accept: application/json"


# To send message directly use:
curl -u $AMQP_USER:$AMQP_PASS -i -H "content-type:application/json" -X POST http://localhost:15672/api/exchanges/%2F//publish  -d'{"properties":{"content-type": "application/json"},"routing_key":"trip_status","payload":"{\"speed\": 83, \"driver_name\": \"Rastko\", \"car_model\": \"Audi\", \"driver_id\": 1, \"car_id\": 1, \"trip_id\": \"03c8d031-4093-41e2-88e0-700cf78873ac\"}","payload_encoding":"string"}'
curl -u $AMQP_USER:$AMQP_PASS -i -H "content-type:application/json" -X POST http://localhost:15672/api/exchanges/%2F//publish  -d'{"properties":{"content-type": "application/json"},"routing_key":"trips","payload":"{\"driver_name\": \"Rastko\", \"car_model\": \"Audi\", \"driver_id\": 1, \"car_id\": 1, \"id\": \"03c8d031-4093-41e2-88e0-700cf78873ac\", \"start_time\": \"2022-11-17 00:00:00\", \"end_time\": null}","payload_encoding":"string"}'
