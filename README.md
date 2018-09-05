![Travis (.org) master](https://img.shields.io/travis/eBuccaneer/node-rabbit-viewer.svg) 
![npm](https://img.shields.io/npm/dt/node-rabbit-viewer.svg)
![Docker Automated build](https://img.shields.io/docker/build/ebuccaneer/node-rabbit-viewer.svg)
![Docker Pulls](https://img.shields.io/docker/pulls/ebuccaneer/node-rabbit-viewer.svg)

# node-rabbit-viewer

## ATTENTION: This module is currently in alpha development phase

This is a small webapp that enables exploring RabbitMQ configuration of 
consumers and requesters, because this can get very messy sometimes. This module was written for the related npm module
[node-rabbit-connector](https://www.npmjs.com/package/node-rabbit-connector).

## Install
Using npm:
```bash
npm install --save node-rabbit-viewer
```
Using yarn:
```bash
yarn add node-rabbit-viewer
```

## Usage
```bash
// create a script in your package.json, where viewer path is the path to the viewer config json
"startRabbitViewer": "VIEWER_PATH=./path/to/rabbitmq.json node node_modules/node-rabbit-viewer/dist/index.js"
```
or
```bash
// start with docker image
docker run -d -v path/to/config/folder:/usr/rabbitViewer/config -e VIEWER_PATH=./config/rabbitmq.json -e VIEWER_PORT=8888 -p 8880:8888 ebuccaneer/node-rabbit-viewer
```

## Example
Here is an example of the rabbitmq.json viewer config.
Also an example [here](https://github.com/eBuccaneer/node-rabbit-viewer/tree/master/examples)
```json
{
  "services": {
    "someService": { // name of the service
      "requests": {
        "work": [ // array for work requests
          {
            "queue": "someName1", // name of the queue to send to (must be unique, also regarding rpc names)
            "message": { // the sent message format, either one of msg/data or both
              "msg": {  // the message property
                "description": "Some important message"
              },
              "data": { // the data section
                "someProperty": { // property name
                  "$ref": "Object", // reference to a defined model
                  "required": false
                }
              }
            }
          }
        ],
        "rpc": [  // array of rpc calls
          {
            "name": "someName2", // name of the queue to send to (must be unique, also regarding work queue names)
            "highPriority": false,
            "message": {
              "data": {
                "someProperty": {
                  "type": "string", // property type
                  "description": "Some string property",
                  "required": false
                }
              }
            }
          }
        ],
        "topic": [  // array of topic messages
          {
            "exchange": "someExchange", // exchange to send to
            "key": "some.key",  // routing key of message
            "durable": true,  // indicates if exchange will survive broker restarts
            "message": {
              // like shown before
            }
          }
        ]
      },
      "consumes": {
        "work": [ // array of work consumers
          {
            "queue": "someName1",
            "noAck": false,   // indicates if receiving of messages has to be acknowledged
            "message": {
              // like shown before
            },
            "task": "This then does some task with received message"  // small description of what is done on message reception
          }
        ],
        "rpc": [  // array of rpc call listeners
          {
            "name": "someName2",
            "highPriority": false,
            "message": {
              // like shown before
            },
            "task": "This then does some task with received message"
          }
        ],
        "topic": [  // array of topic message consumers
          {
            "exchange": "someExchange",
            "key": "some.*",
            "durable": true,
            "message": {
              // like shown before
            },
            "task": "This then does some task with received message"
          }
        ]
      },
      "excepts": {  // this is for revoking binding something of "all" section to this service
        "requests":{
          "work": [
            "logs"  // one or more names of work queues
          ],
          "rpc": [
            "someName"  // one or more rpc names
          ],
          "topic": [
            { // object with exchange and key of topic
              "exchange": "someExchange",
              "key": "some.key"
            }
          ]
        },
        "consumes":{
          // same format as with requests
        }
      }
    }
  },

  "all": {  // defining a request or consumer that is done by all specified services
    // same format as in a single service definition
  },

  "models": { // section for defining models to use in property definitions
    "Object": { // name of the model
      "type": "object",
      "description": "This object is used to pass log messages to the logger MS",
      "properties": { // properties of a model
        "msg": {
          "type": "string",
          "description": "This is an error message",
          "required": false
        }
      }
    }
  }
}
```