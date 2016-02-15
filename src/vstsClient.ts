"use strict";

import { VstsRestExecutor, VstsRestlerRestExecutor } from "./vstsRestExecutor";
import { ProjectClient } from "./clients/project";
import { TeamClient } from "./clients/team";

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
    private restExecutor: VstsRestExecutor;

    private _projectClient: ProjectClient;
    private _teamClient: TeamClient;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;

        this._projectClient = new ProjectClient(this.restExecutor);
        this._teamClient = new TeamClient(this.restExecutor);
    }

    public static createFromConfiguration(configuration: VstsConfiguration): VstsClient {
        let authOptions = {
            username: configuration.username,
            password: configuration.password
        };

        return new VstsClient(new VstsRestlerRestExecutor(configuration.url, authOptions));
    }

    public get project() {
        return this._projectClient;
    }

    public get team() {
        return this._teamClient;
    }
}