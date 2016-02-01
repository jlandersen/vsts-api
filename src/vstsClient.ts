"use strict";

import rest = require("restler");
import { BuildClient } from "./clients/build";

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

export class VstsClient {
    private configuration: VstsConfiguration;
    private restExecutor: VstsRestExecutor;

    private _buildClient: BuildClient;

    constructor(configuration: VstsConfiguration) {
        this.configuration = configuration;
        this.restExecutor = new VstsRestlerRestExecutor(configuration);
        this._buildClient = new BuildClient(this.restExecutor);
    }

    public get build(): BuildClient {
        return this._buildClient;
    }
}

export class VstsRestRequest {
    public httpMethod: string;
    public resource: string;
    public version: string;

    constructor(resource: string, httpMethod: string, version: string) {
        this.resource = resource;
        this.httpMethod = httpMethod;
        this.version = version;
    }
}

export interface VstsRestExecutor {
    Execute<T>(request: VstsRestRequest): Promise<T>;
}

class VstsRestlerRestExecutor {
    private authOptions: any;
    private baseUrl: string;

    constructor(options: VstsConfiguration) {
        let authOptions = {
            username: options.username,
            password: options.password
        };

        this.baseUrl = options.url;
        this.authOptions = authOptions;
    }

    public Execute<T>(request: VstsRestRequest): Promise<T> {
        let url = this.baseUrl + request.resource;
        console.log(this.authOptions);
        console.log(url);

        return rest.get(url, this.authOptions).on("complete", (data: any, response: any) => {
            console.log(data);
        });
    }
}

