FROM gradle:6.9.4-jdk8 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:8-jre-slim

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/stocks.jar

ENV SERVER=127.0.0.1
ENV PORT=8800
ENV TOKEN=some-token
ENV ENCRYPTION=false
ENV TOPICS=/AWERQ,/WERZF,/QWZAF,/TEYDF,/TYUII,/XCVSD,/POUVB,/TYEWD,/WYWUI

ENTRYPOINT exec java -jar /app/stocks.jar $SERVER $PORT $TOKEN $ENCRYPTION $TOPICS