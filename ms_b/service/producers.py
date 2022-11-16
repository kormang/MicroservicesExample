
import json
import pika
from service.dataconverters import TripStatusEncoder
from service.simulator import simulator
from service.dataobjects import TripStatus
from django.conf import settings

TRIP_STATUS_QUEUE_NAME = 'trip_status'


class Gateway:

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                settings.AMQP_HOST, heartbeat=600, blocked_connection_timeout=300,
                virtual_host=settings.AMQP_VHOST,
                credentials=pika.PlainCredentials(settings.AMQP_USER, settings.AMQP_PASS)
            )
        )

        self.channel = self.connection.channel()

        self.channel.queue_declare(queue=TRIP_STATUS_QUEUE_NAME, durable=True)

    def publish(self, queue, json_body):
        print('publish', json_body)
        properties = pika.BasicProperties(
            content_type='application/json')
        self.channel.basic_publish(
            exchange='',
            routing_key=queue,
            body=json_body,
            properties=properties)


gateway = Gateway()


def publish_to_trip_status(trip_status: TripStatus):
    body = json.dumps(trip_status, cls=TripStatusEncoder)
    return gateway.publish(TRIP_STATUS_QUEUE_NAME, body)


simulator.set_callback(publish_to_trip_status)
