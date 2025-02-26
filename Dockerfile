FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the JAR file into the container
COPY debateia.jar app.jar

ENV SERVER_ADDRESS=0.0.0.0

# Expose the port that Spring Boot runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
