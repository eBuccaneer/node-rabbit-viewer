FROM node:alpine

WORKDIR /usr/rabbitViewer
COPY . .

RUN yarn install
RUN yarn build

ARG VIEWER_PATH=./rabbitmq.json
ARG VIEWER_PORT=8880

ENV VIEWER_PATH="${VIEWER_PATH}"
ENV VIEWER_PORT="${VIEWER_PORT}"

EXPOSE "${VIEWER_PORT}"

CMD [ "yarn", "prod" ]