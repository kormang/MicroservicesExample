
import json
from threading import Thread
import pika
from service.dataconverters import TripDecoder, trip_from_dict
from service.trips_manager import tripsManager
from django.conf import settings


TRIPS_QUEUE_NAME = 'trips'


class Gateway:
    def __init__(self, queue_receiver_callback):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                settings.AMQP_HOST, heartbeat=600, blocked_connection_timeout=300,
                virtual_host=settings.AMQP_VHOST,
                credentials=pika.PlainCredentials(settings.AMQP_USER, settings.AMQP_PASS)
            )
        )

        self.channel = self.connection.channel()

        self.channel.queue_declare(queue=TRIPS_QUEUE_NAME)

        self.channel.basic_consume(queue=TRIPS_QUEUE_NAME,
                    auto_ack=True,
                    on_message_callback=queue_receiver_callback)


    def start_consuming(self):
        self.channel.start_consuming()

def queue_receiver_callback(ch, method, properties, body):
    print(f"Received {method} {properties} {body}")
    trip = json.loads(body, cls=TripDecoder)

    if properties.type == 'started':
        tripsManager.add(trip)
    elif properties.type == 'ended':
        tripsManager.remove(trip)


gateway = Gateway(queue_receiver_callback)


Thread(target=gateway.start_consuming, daemon=True).start()
