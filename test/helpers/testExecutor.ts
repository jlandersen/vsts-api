"use strict";

import fs = require("fs");
import {VstsRestRequest, VstsRestExecutor, HttpMethod} from "../../src/vstsRestExecutor";

export class TestExecutor implements VstsRestExecutor {
    private matchingUrl: string;
    private matchingHttpMethod: string;
    private responseFile: string;
    private responseBody: any;

    constructor(matchingUrl: string, matchingHttpMethod: string, responseFile: string) {
        this.matchingUrl = matchingUrl;
        this.responseFile = responseFile;
        this.matchingHttpMethod = matchingHttpMethod;

        this.responseBody = JSON.parse(fs.readFileSync(`test/resources/${responseFile}.json`, "utf8"));
    }

    public execute<T>(request: VstsRestRequest): Promise<T> {
        if (request.getRequestUrl() !== this.matchingUrl) {
            throw new Error("Invalid request - expected " + this.matchingUrl + " - got " + request.getRequestUrl());
        }

        if (HttpMethod[request.httpMethod] !== this.matchingHttpMethod) {
            throw new Error("Invalid request - expected method " + this.matchingHttpMethod + " - got " + request.httpMethod);
        }

        return Promise.resolve(<T>this.responseBody);
    }
}