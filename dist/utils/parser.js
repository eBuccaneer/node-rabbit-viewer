"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Parser {
    constructor() {
        /**
         * Parses all the data
         * @return {any} The parsed data needed for views
         */
        this.parse = (filePath) => {
            return this.parseData(this.parseFile(filePath));
        };
        /**
         * Parse the documentation file
         * @return {any} The parsed documentation file
         */
        this.parseFile = (filePath) => {
            try {
                let fileToParse = fs.readFileSync(filePath);
                return JSON.parse(fileToParse.toString());
            }
            catch (err) {
                console.error("Definition file", filePath, "not found or not valid JSON.");
                process.exit(1);
            }
        };
        /**
         * Parse the data from the documentation file
         * @param data The parsed documentation file
         * @return {any} The data needed to show views
         */
        this.parseData = (data) => {
            try {
                let ret = {
                    allRequests: {
                        topic: [],
                        work: [],
                        rpc: []
                    },
                    allConsumes: {
                        topic: [],
                        work: [],
                        rpc: []
                    },
                    services: {},
                    models: {}
                };
                // parse data of service section
                for (let service in data.services) {
                    ret.services[service] = {
                        requests: {
                            topic: [],
                            work: [],
                            rpc: []
                        },
                        consumes: {
                            topic: [],
                            work: [],
                            rpc: []
                        }
                    };
                    if (data.services[service].requests) {
                        if (data.services[service].requests.topic) {
                            for (let i = 0; i < data.services[service].requests.topic.length; i++) {
                                ret.allRequests.topic.push(data.services[service].requests.topic[i]);
                            }
                            // assign requests to ret
                            ret.services[service].requests.topic = data.services[service].requests.topic;
                        }
                        if (data.services[service].requests.work) {
                            for (let i = 0; i < data.services[service].requests.work.length; i++) {
                                ret.allRequests.work.push(data.services[service].requests.work[i]);
                            }
                            // assign requests to ret
                            ret.services[service].requests.work = data.services[service].requests.work;
                        }
                        if (data.services[service].requests.rpc) {
                            for (let i = 0; i < data.services[service].requests.rpc.length; i++) {
                                ret.allRequests.rpc.push(data.services[service].requests.rpc[i]);
                            }
                            // assign requests to ret
                            ret.services[service].requests.rpc = data.services[service].requests.rpc;
                        }
                    }
                    if (data.services[service].consumes) {
                        if (data.services[service].consumes.topic) {
                            for (let i = 0; i < data.services[service].consumes.topic.length; i++) {
                                ret.allConsumes.topic.push(data.services[service].consumes.topic[i]);
                            }
                            // assign consumers to ret
                            ret.services[service].consumes.topic = data.services[service].consumes.topic;
                        }
                        if (data.services[service].consumes.work) {
                            for (let i = 0; i < data.services[service].consumes.work.length; i++) {
                                ret.allConsumes.work.push(data.services[service].consumes.work[i]);
                            }
                            // assign consumers to ret
                            ret.services[service].consumes.work = data.services[service].consumes.work;
                        }
                        if (data.services[service].consumes.rpc) {
                            for (let i = 0; i < data.services[service].consumes.rpc.length; i++) {
                                ret.allConsumes.rpc.push(data.services[service].consumes.rpc[i]);
                            }
                            // assign consumers to ret
                            ret.services[service].consumes.rpc = data.services[service].consumes.rpc;
                        }
                    }
                }
                // parse data of all section
                if (data.all) {
                    if (data.all.requests) {
                        if (data.all.requests.topic) {
                            for (let i = 0; i < data.all.requests.topic.length; i++) {
                                ret.allRequests.topic.push(data.all.requests.topic[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.requests
                                    && data.services[service].excepts.requests.topic) {
                                    for (let i = 0; i < data.all.requests.topic.length; i++) {
                                        let found = false;
                                        for (let j = 0; j < data.services[service].excepts.requests.topic.length; j++) {
                                            if (data.all.requests.topic[i].exchange === data.services[service].excepts.requests.topic[j].exchange
                                                && data.all.requests.topic[i].key === data.services[service].excepts.requests.topic[j].key) {
                                                found = true;
                                            }
                                        }
                                        if (!found) {
                                            ret.services[service].requests.topic.push(data.all.requests.topic[i]);
                                        }
                                        else {
                                            found = false;
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].requests.topic = ret.services[service].requests.topic.concat(data.all.requests.topic);
                                }
                            }
                        }
                        if (data.all.requests.work) {
                            for (let i = 0; i < data.all.requests.work.length; i++) {
                                ret.allRequests.work.push(data.all.requests.work[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.requests
                                    && data.services[service].excepts.requests.work) {
                                    for (let i = 0; i < data.all.requests.work.length; i++) {
                                        if (!data.services[service].excepts.requests.work.includes(data.all.requests.work[i].queue)) {
                                            ret.services[service].requests.work.push(data.all.requests.work[i]);
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].requests.work = ret.services[service].requests.work.concat(data.all.requests.work);
                                }
                            }
                        }
                        if (data.all.requests.rpc) {
                            for (let i = 0; i < data.all.requests.rpc.length; i++) {
                                ret.allRequests.rpc.push(data.all.requests.rpc[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.requests
                                    && data.services[service].excepts.requests.rpc) {
                                    for (let i = 0; i < data.all.requests.rpc.length; i++) {
                                        if (!data.services[service].excepts.requests.rpc.includes(data.all.requests.rpc[i].name)) {
                                            ret.services[service].requests.rpc.push(data.all.requests.rpc[i]);
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].requests.rpc = ret.services[service].requests.rpc.concat(data.all.requests.rpc);
                                }
                            }
                        }
                    }
                    if (data.all.consumes) {
                        if (data.all.consumes.topic) {
                            for (let i = 0; i < data.all.consumes.topic.length; i++) {
                                ret.allConsumes.topic.push(data.all.consumes.topic[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.consumes
                                    && data.services[service].excepts.consumes.topic) {
                                    for (let i = 0; i < data.all.consumes.topic.length; i++) {
                                        let found = false;
                                        for (let j = 0; j < data.services[service].excepts.consumes.topic.length; j++) {
                                            if (data.all.consumes.topic[i].exchange === data.services[service].excepts.consumes.topic[j].exchange
                                                && data.all.consumes.topic[i].key === data.services[service].excepts.consumes.topic[j].key) {
                                                found = true;
                                            }
                                        }
                                        if (!found) {
                                            ret.services[service].consumes.topic.push(data.all.consumes.topic[i]);
                                        }
                                        else {
                                            found = false;
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].consumes.topic = ret.services[service].consumes.topic.concat(data.all.consumes.topic);
                                }
                            }
                        }
                        if (data.all.consumes.work) {
                            for (let i = 0; i < data.all.consumes.work.length; i++) {
                                ret.allConsumes.work.push(data.all.consumes.work[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.consumes
                                    && data.services[service].excepts.consumes.work) {
                                    for (let i = 0; i < data.all.consumes.work.length; i++) {
                                        if (!data.services[service].excepts.consumes.work.includes(data.all.consumes.work[i].queue)) {
                                            ret.services[service].consumes.work.push(data.all.consumes.work[i]);
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].consumes.work = ret.services[service].consumes.work.concat(data.all.consumes.work);
                                }
                            }
                        }
                        if (data.all.consumes.rpc) {
                            for (let i = 0; i < data.all.consumes.rpc.length; i++) {
                                ret.allConsumes.rpc.push(data.all.consumes.rpc[i]);
                            }
                            // check if in excepts array for every service, if not push to ret
                            for (let service in data.services) {
                                if (data.services[service].excepts && data.services[service].excepts.consumes
                                    && data.services[service].excepts.consumes.rpc) {
                                    for (let i = 0; i < data.all.consumes.rpc.length; i++) {
                                        if (!data.services[service].excepts.consumes.rpc.includes(data.all.consumes.rpc[i].name)) {
                                            ret.services[service].consumes.rpc.push(data.all.consumes.rpc[i]);
                                        }
                                    }
                                }
                                else {
                                    ret.services[service].consumes.rpc = ret.services[service].consumes.rpc.concat(data.all.consumes.rpc);
                                }
                            }
                        }
                    }
                }
                // eliminate duplicates
                ret.allRequests.topic = [...new Set(ret.allRequests.topic)];
                ret.allRequests.work = [...new Set(ret.allRequests.work)];
                ret.allRequests.rpc = [...new Set(ret.allRequests.rpc)];
                ret.allConsumes.topic = [...new Set(ret.allConsumes.topic)];
                ret.allConsumes.work = [...new Set(ret.allConsumes.work)];
                ret.allConsumes.rpc = [...new Set(ret.allConsumes.rpc)];
                // assign models of models section to return data
                ret.models = data.models;
                return ret;
            }
            catch (err) {
                console.error("Definition file has wrong format.");
                console.error(err);
                process.exit(1);
            }
        };
    }
}
exports.Parser = Parser;
exports.default = new Parser();
