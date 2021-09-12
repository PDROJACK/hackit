FROM openjdk:11

LABEL COMPANY="ocbc"
LABEL MAINTAINER="singhpd75@gmail.com"
LABEL APPLICATION="hackit"

COPY target/backend-0.0.1-SNAPSHOT.jar backend.jar

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "backend.jar"]