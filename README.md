# µ services example

## Attempt to quickly learn some things.

Making project with 3 different microservices, allows to learn quite a few technologies at once. Even if not very thoroughly and deeply, acquiring this knowledge can expand perspectives.

* PostgreSQL
    * Previous knowledge: While I did work on project that used Postgres, I've only used the same knowledge I learned working with MySQL. I had never installed postgres to my computer, for example.
    * Learning goal: Learn basic setup, tooling, administration,
    and database creation.

* Django rest framework
    * Previous knowledge: none
    * Learning goal: Just the basic CRUD operations, no auth for now. Some new concepts, and practices, integration with RabbitMQ, and, of course, testing.

* Fastify 4 with TypeScript
    * Previous knowledge: Experience working on project with Fastify 2 with TypeScript.
    * Learning goal: Deepen my knowledge of TypeScript's type system and try out Fastify 4, with type providers, with focus on JSON Schema and
    reusing schema for validation and type definitions too. Also tsc, ts-node,
    and jest configuration, and absolute module imports.

* RabbitMQ
    * Previous knowledge: Some experience with message queueing, using AWS SQS.
    * Learning goal: Wanted to get better understanding of AMQP and try to learn RabbitMQ and its client libraries, as well as configuration and administration.

* Docker
    * Previous knowledge: Used Docker and docker-compose, wrote few Dockerfiles,
    had understanding of how Docker works under the hood (cgroup and namespaces).
    * Learning goal: Remind myself of writing docker-compose.yaml.
    Expand understading of dockerization process, with focus on configuration,
    environment variables, and testing.


The list may be subject to expansion.

Non-goal: To make everything perfect (make just some things (close to) perfect).


## The idea

The idea comes from interview assignment one of my friends had to solve recently. I've adopted it a little bit, to meet my learning needs.

There should be three microservices, they should communicate using RabbitMQ, and the whole project should be started using docker-compose. (But I specifically wanted to start the classical way, and then migrate to docker containers).

* Microservice A - has basic CRUD operations for entities, Car, Driver, and Trip, and also endpoints for assigning driver to a car, (I've added for ending trip too).

* Microservice B - simulates car motion by sending periodic events about its speed (and geocoordinates, but I've left the out).

* Microservice C - when ever driver exceeds certain speed limits, pentalty is written to NoSQL database, and this data is exposed through API.

