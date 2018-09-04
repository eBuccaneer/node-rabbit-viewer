import fs = require("fs");

export class Parser {

    /**
     * Parses all the data
     * @return {any} The parsed data needed for views
     */
    public parse = (filePath: string): any => {
        return this.parseData(this.parseFile(filePath));
    };

    /**
     * Parse the documentation file
     * @return {any} The parsed documentation file
     */
    private parseFile = (filePath: string): any => {
        try {
            const fileToParse = fs.readFileSync(filePath);
            return JSON.parse(fileToParse.toString());
        } catch (err) {
            console.error("Definition file", filePath, "not found or not valid JSON.");
            process.exit(1);
        }
    };

    /**
     * Parse the data from the documentation file
     * @param data The parsed documentation file
     * @return {any} The data needed to show views
     */
    private parseData = (data: any): any => {
        try {
            const ret = {
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
                services: {

                },
                models: {

                }
            };

            // parse data of service section
            for (const service in data.services) {
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
                        for (const tR of data.services[service].requests.topic) {
                            ret.allRequests.topic.push(tR);
                        }

                        // assign requests to ret
                        ret.services[service].requests.topic = data.services[service].requests.topic;
                    }
                    if (data.services[service].requests.work) {
                        for (const wR of data.services[service].requests.work) {
                            ret.allRequests.work.push(wR);
                        }

                        // assign requests to ret
                        ret.services[service].requests.work = data.services[service].requests.work;
                    }
                    if (data.services[service].requests.rpc) {
                        for (const rR of data.services[service].requests.rpc) {
                            ret.allRequests.rpc.push(rR);
                        }

                        // assign requests to ret
                        ret.services[service].requests.rpc = data.services[service].requests.rpc;
                    }
                }

                if (data.services[service].consumes) {
                    if (data.services[service].consumes.topic) {
                        for (const tC of data.services[service].consumes.topic) {
                            ret.allConsumes.topic.push(tC);
                        }

                        // assign consumers to ret
                        ret.services[service].consumes.topic = data.services[service].consumes.topic;
                    }
                    if (data.services[service].consumes.work) {
                        for (const wC of data.services[service].consumes.work) {
                            ret.allConsumes.work.push(wC);
                        }

                        // assign consumers to ret
                        ret.services[service].consumes.work = data.services[service].consumes.work;
                    }
                    if (data.services[service].consumes.rpc) {
                        for (const rC of data.services[service].consumes.rpc) {
                            ret.allConsumes.rpc.push(rC);
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
                        for (const tR of data.all.requests.topic) {
                            ret.allRequests.topic.push(tR);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.requests
                                && data.services[service].excepts.requests.topic) {
                                for (const tR of data.all.requests.topic) {
                                    let found = false;
                                    for (const tRE of data.services[service].excepts.requests.topic) {
                                        if (tR.exchange
                                                === tRE.exchange
                                            && tR.key === tRE.key) {
                                            found = true;
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        ret.services[service].requests.topic.push(tR);
                                    } else {
                                        found = false;
                                    }
                                }
                            } else {
                                ret.services[service].requests.topic = ret.services[service].requests.topic.concat(data.all.requests.topic);
                            }
                        }
                    }
                    if (data.all.requests.work) {
                        for (const wR of data.all.requests.work) {
                            ret.allRequests.work.push(wR);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.requests
                                && data.services[service].excepts.requests.work) {
                                for (const wR of data.all.requests.work) {
                                    if (!data.services[service].excepts.requests.work.includes(wR.queue)) {
                                        ret.services[service].requests.work.push(wR);
                                    }
                                }
                            } else {
                                ret.services[service].requests.work = ret.services[service].requests.work.concat(data.all.requests.work);
                            }
                        }
                    }
                    if (data.all.requests.rpc) {
                        for (const rR of data.all.requests.rpc) {
                            ret.allRequests.rpc.push(rR);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.requests
                                && data.services[service].excepts.requests.rpc) {
                                for (const rR of data.all.requests.rpc) {
                                    if (!data.services[service].excepts.requests.rpc.includes(rR.name)) {
                                        ret.services[service].requests.rpc.push(rR);
                                    }
                                }
                            } else {
                                ret.services[service].requests.rpc = ret.services[service].requests.rpc.concat(data.all.requests.rpc);
                            }
                        }
                    }
                }

                if (data.all.consumes) {
                    if (data.all.consumes.topic) {
                        for (const tC of data.all.consumes.topic) {
                            ret.allConsumes.topic.push(tC);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.consumes
                                && data.services[service].excepts.consumes.topic) {
                                for (const tC of data.all.consumes.topic) {
                                    let found = false;
                                    for (const tCE of data.services[service].excepts.consumes.topic) {
                                        if (tC.exchange
                                                === tCE.exchange
                                            && tC.key === tCE.key) {
                                            found = true;
                                        }
                                    }
                                    if (!found) {
                                        ret.services[service].consumes.topic.push(tC);
                                    } else {
                                        found = false;
                                    }
                                }
                            } else {
                                ret.services[service].consumes.topic = ret.services[service].consumes.topic.concat(data.all.consumes.topic);
                            }
                        }
                    }
                    if (data.all.consumes.work) {
                        for (const wC of data.all.consumes.work) {
                            ret.allConsumes.work.push(wC);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.consumes
                                && data.services[service].excepts.consumes.work) {
                                for (const wC of data.all.consumes.work) {
                                    if (!data.services[service].excepts.consumes.work.includes(wC.queue)) {
                                        ret.services[service].consumes.work.push(wC);
                                    }
                                }
                            } else {
                                ret.services[service].consumes.work = ret.services[service].consumes.work.concat(data.all.consumes.work);
                            }
                        }
                    }
                    if (data.all.consumes.rpc) {
                        for (const rC of data.all.consumes.rpc) {
                            ret.allConsumes.rpc.push(rC);
                        }

                        // check if in excepts array for every service, if not push to ret
                        for (const service in data.services) {
                            if (data.services[service].excepts && data.services[service].excepts.consumes
                                && data.services[service].excepts.consumes.rpc) {
                                for (const rC of data.all.consumes.rpc) {
                                    if (!data.services[service].excepts.consumes.rpc.includes(rC.name)) {
                                        ret.services[service].consumes.rpc.push(rC);
                                    }
                                }
                            } else {
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
        } catch (err) {
            console.error("Definition file has wrong format.");
            console.error(err);
            process.exit(1);
        }
    };
}

export default new Parser();