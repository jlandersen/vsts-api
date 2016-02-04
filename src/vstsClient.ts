"use strict";

import * as rest from "restler";
import { ProjectClient } from "./clients/project";

export class VstsConfiguration {
    private _url: string;
    private _username: string;
    private _password: string;

    constructor(url: string, username: string, password: string) {
        this._url = url;
        this._password = password;
        this._username = username;
    }

    public get url(): string {
        return this._url;
    }

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this._password;
    }
}


export enum HttpMethod {
    GET,
    POST
}

export class VstsRestRequest {
    private _resource: string;
    private _httpMethod: HttpMethod;
    private _version: string;

    private queryParameters: { [parameter: string]: string } = {};

    constructor(resource: string, httpMethod: HttpMethod, version: string) {
        this._resource = resource;
        this._httpMethod = httpMethod;
        this._version = version;
    }

    public get resource(): string {
        return this._resource;
    }

    public get httpMethod(): HttpMethod {
        return this._httpMethod;
    }

    public get version(): string {
        return this._version;
    }

    public addQueryParameter(parameter: string, value: string): VstsRestRequest {
        this.queryParameters[parameter] = value;

        return this;
    }

    public getRequestUrl() {
        let queryString = "";

        for (let queryParameter in this.queryParameters) {
            queryString += `&${queryParameter}=${this.queryParameters[queryParameter]}`;
        }

        let result = `${this._resource}?version=${this._version}${queryString}`;

        return result;
    }
}

export interface VstsRestExecutor {
    execute<T>(request: VstsRestRequest): Promise<T>;
}

class VstsRestlerRestExecutor implements VstsRestExecutor {
    private baseUrl: string;
    private authOptions: any;

    constructor(configuration: VstsConfiguration) {
        let authOptions = {
            username: configuration.username,
            password: configuration.password
        };

        this.baseUrl = configuration.url;
        this.authOptions = authOptions;
    }

    public execute<T>(request: VstsRestRequest): Promise<T> {
        let url = this.baseUrl + request.getRequestUrl();

        let executePromise = new Promise((resolve, reject) => {
            rest.get(url, this.authOptions).on("complete", (data: any, response: any) => {
                resolve(data);
            });
        });
        return executePromise;
    }
}

export class VstsClient {
    private restExecutor: VstsRestExecutor;

    private _projectClient: ProjectClient;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;

        this._projectClient = new ProjectClient(this.restExecutor);
    }

    public static createFromConfiguration(configuration: VstsConfiguration): VstsClient {
        return new VstsClient(new VstsRestlerRestExecutor(configuration));
    }

    public get project() {
        return this._projectClient;
    }
}