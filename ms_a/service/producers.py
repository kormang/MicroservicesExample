
import json
import pika

import sys

TESTING = sys.argv[1:2] == ['test']

if TESTING:
    def publish_to_trips(type, body):
        pass
else:
    TRIPS_QUEUE_NAME = 'trips'

    class Gateway:
        def __init__(self):
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    'localhost', heartbeat=600, blocked_connection_timeout=300
                )
            )

            self.channel = self.connection.channel()


            self.channel.queue_declare(queue=TRIPS_QUEUE_NAME)

        def publish(self, queue, type, body):
            properties = pika.BasicProperties(
                type=type,
                content_type='application/json')
            self.channel.basic_publish(
                exchange='',
                routing_key=queue,
                body=json.dumps(body),
                properties=properties)

    gateway = Gateway()


    def publish_to_trips(type, body):
        return gateway.publish(TRIPS_QUEUE_NAME, type, body)

