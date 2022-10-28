
import json
import pika


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


gateway = Gateway()

def queue_receiver_callback(ch, method, properties, body):
    print(f" [x] Received {method} {properties} {body})


channel.basic_consume(queue=TRIPS_QUEUE_NAME,
                      auto_ack=True,
                      on_message_callback=queue_receiver_callback)

#gateway.channel.start_consuming()