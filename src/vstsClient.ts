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

export class VstsRestRequest {
    private _resource: string;
    private _httpMethod: string;
    private _version: string;

    constructor(resource: string, httpMethod: string, version: string) {
        this._resource = resource;
        this._httpMethod = httpMethod;
        this._version = version;
    }

    public get resource(): string {
        return this._resource;
    }

    public get httpMethod(): string {
        return this._httpMethod;
    }

    public get version(): string {
        return this._version;
    }

    public getRequestQuery() {
        return this._resource + "?version=" + this._version;
    }
}

export interface VstsRestExecutor {
    Execute<T>(request: VstsRestRequest): Promise<T>;
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

    public Execute<T>(request: VstsRestRequest): Promise<T> {
        let url = this.baseUrl + request.getRequestQuery();

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