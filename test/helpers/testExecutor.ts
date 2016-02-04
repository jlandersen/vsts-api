"use strict";

import fs = require("fs");
import {VstsRestRequest, VstsRestExecutor} from "../../src/vstsClient";

export class TestExecutor implements VstsRestExecutor {
    private matchingUrl: string;
    private responseFile: string;
    private responseBody: any;

    constructor(matchingUrl: string, responseFile: string) {
        this.matchingUrl = matchingUrl;
        this.responseFile = responseFile;

        this.responseBody = JSON.parse(fs.readFileSync(`test/resources/${responseFile}.json`, "utf8"));
    }

    public execute<T>(request: VstsRestRequest): Promise<T> {
        if (request.getRequestUrl() !== this.matchingUrl) {
            throw new Error("Invalid request - expected " + this.matchingUrl + " - got " + request.getRequestUrl());
        }

        return Promise.resolve(<T>this.responseBody);

    }
}