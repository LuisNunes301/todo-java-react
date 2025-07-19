# build dentro do próprio Docker
FROM maven:3.9.4-eclipse-temurin-17 as builder
WORKDIR /app
COPY todoapi /app
RUN mvn clean package -DskipTests

# runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
