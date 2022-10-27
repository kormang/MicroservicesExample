import json
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        'localhost', heartbeat=600, blocked_connection_timeout=300
    )
)

channel = connection.channel()

TRIPS_QUEUE_NAME = 'trips'

channel.queue_declare(queue=TRIPS_QUEUE_NAME)


def publish(queue, type, body):
    properties = pika.BasicProperties(
        type=type,
        content_type='application/json')
    channel.basic_publish(
        exchange='',
        routing_key=queue,
        body=json.dumps(body),
        properties=properties)

def publish_to_trips(type, body):
    return publish(TRIPS_QUEUE_NAME, type, body)

