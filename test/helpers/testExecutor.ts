"use strict";

import fs = require("fs");
import {VstsRestRequest, VstsRestExecutor, HttpMethod} from "../../src/vstsRestExecutor";

export class TestExecutor implements VstsRestExecutor {
    private matchingUrl: string;
    private matchingHttpMethod: string;
    private matchingBody: any;
    private responseFile: string;
    private responseBody: any;


    constructor(matchingUrl: string, matchingHttpMethod: string, responseFile: string = null, matchingBody: any = null) {
        this.matchingUrl = matchingUrl;
        this.responseFile = responseFile;
        this.matchingHttpMethod = matchingHttpMethod;
        this.matchingBody = matchingBody;

        if (responseFile) {
            this.responseBody = JSON.parse(fs.readFileSync(`test/resources/${responseFile}.json`, "utf8"));
        } else {
            this.responseBody = "";
        }
    }

    public execute<T>(request: VstsRestRequest): Promise<T> {
        if (request.getRequestUrl() !== this.matchingUrl) {
            throw new Error("Invalid request - expected " + this.matchingUrl + " - got " + request.getRequestUrl());
        }

        if (HttpMethod[request.httpMethod] !== this.matchingHttpMethod) {
            throw new Error("Invalid request - expected method " + this.matchingHttpMethod + " - got " + request.httpMethod);
        }

        // If the request has body content, check properties exists as expected
        if (this.matchingBody) {
            if (!request.body) {
                throw new Error("Expected body");
            }

            let actualProperties = Object.keys(request.body).sort();
            let expected = Object.keys(this.matchingBody).sort();

            expect(actualProperties).toEqual(expected);
            for (let property of actualProperties) {
                expect(request.body[property]).toBe(this.matchingBody[property]);
            }
        }

        return Promise.resolve(<T>this.responseBody);
    }
}