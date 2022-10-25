# µ services example

## Attempt to quickly learn some things.

* PostgreSQL
    While I did work on project that used Postgres, I've only used the same knowledge I learned working with MySQL. I had never installed it, so I wanted to learn basic setup, tooling, administration, and database creation.
* Django rest framework
    Just the basic CRUD operations, no auth for now. Some new concepts, and practices, integration with RabbitMQ, and, of course, testing.



## The idea

The idea comes from interview assignment one of my friends had to solve recently. I've adopted it a little bit, to meet my learning needs.

There should be three microservices, they should communicate using RabbitMQ, and the whole project should be started using docker-compose. (But I specifically wanted to start the classical way, and then migrate to docker containers).

* Microservice A - has basic CRUD operations for entities, Car, Driver, and Trip, and also endpoints for assigning driver to a car, (I've added for ending trip too).

* Microservice B - simulates car motion by sending periodic events about its speed (and geocoordinates, but I've left the out).

* Microservice C - when ever driver exceeds certain speed limits, pentalty is written to NoSQL database, and this data is exposed through API.

