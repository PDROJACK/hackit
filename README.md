### Hackit Movie Booking Application
Hackit app for movie booking app

Webapp hosted on: http://20.198.111.24

List of things in scope of my submission:

1. Backend Spring Boot Rest API for
    - Showing movies
    - Seat selection and checking availability
    - Confirming the booking
    - other CRUD operations
2. Frontend React-Redux Application
    - Movies page to show movies
    - Showing seats and movie details
    - Seat selection and movie booking 
    - Redux state and store management

3. Dockerization of both services
    - Frontend served using NGINX docker
    - Backend served using openjdk:11

#### Technology Stack

1. Spring Boot
2. MongoDB Atlas
3. ReactJs
4. Redux
5. Docker and Docker Compose
6. Azure Cloud

### Seat Booking Workflow
1. A movie is mapped to one theatre with one seat configuration
2. Seats can be in state: A = Available, R = Reserved, B = Booked
3. Booked and Reserved Seats are painted grey
4. When a user selects a seat, we first check with backend if the seat is picked by another user. Then we allot the seat to the user.
5. On clicking Book seats it will reserve the seats

### Known Problems
1. Sometimes seats will not update automatically, since I am using http requests. To make real-time changes I'll have to use WebSockets. So refresh if something doesnt update.

2. Design is not good
