import restler = require("restler");

export enum HttpMethod {
    GET,
    POST,
    PATCH,
    DELETE
}

export class VstsRestRequest {
    private _resource: string;
    private _httpMethod: HttpMethod;
    private _version: string;
    private _body: any;

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

    public set body(value: any) {
        this._body = value;
    }

    public get body(): any {
        return this._body;
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

        let result = `${this._resource}?api-version=${this._version}${queryString}`;
        return result;
    }
}

export interface VstsRestExecutor {
    execute<T>(request: VstsRestRequest): Promise<T>;
}

export class VstsRestlerRestExecutor implements VstsRestExecutor {
    private baseUrl: string;
    private authOptions: any;

    constructor(baseUrl: string, authOptions: { username: string, password: string }) {
        this.baseUrl = baseUrl;
        this.authOptions = authOptions;
    }

    public execute<T>(request: VstsRestRequest): Promise<T> {
        let url = this.baseUrl + request.getRequestUrl();
        let restlerRequest = this.createRequest(request);

        console.log(restlerRequest);
        let executePromise = new Promise((resolve, reject) => {
            restler.request(url, restlerRequest).on("complete", (data: any, response: any) => {
                if (data) {
                    resolve(JSON.parse(data));
                } else {
                    resolve();
                }
            });
        });

        return executePromise;
    }

    private createRequest(request: VstsRestRequest): restler.RestlerOptions {
        let restlerRequest: restler.RestlerOptions = {
            headers: {
                "Content-Type": "application/json"
            },
            method: HttpMethod[request.httpMethod].toLowerCase(),
            username: this.authOptions.username,
            password: this.authOptions.password,
            data: request.body ? JSON.stringify(request.body) : ""
        };

        return restlerRequest;
    }
}