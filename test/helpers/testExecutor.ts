"use strict";

import fs = require("fs");
import {VstsRestRequest} from "../../src/vstsClient";

export class TestExecutor {
    private matchingUrl: string;
    private responseFile: string;
    private responseBody: any;

    constructor(matchingUrl: string, responseFile: string) {
        this.matchingUrl = matchingUrl;
        this.responseFile = responseFile;

        this.responseBody = JSON.parse(fs.readFileSync(`test/resources/${responseFile}.json`, "utf8"));
    }

    public Execute<T>(request: VstsRestRequest): Promise<T> {
        if (request.getRequestQuery() !== this.matchingUrl) {
            throw new Error("Invalid request");
        }

        return Promise.resolve(<T>this.responseBody);

    }
}