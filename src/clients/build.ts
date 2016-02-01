"use strict";

import { VstsRestRequest, VstsRestExecutor } from "../vstsClient";

export class Build {
}

export interface BuildDefinition {
    id: number;
}

export class BuildClient {
    private restExecutor: VstsRestExecutor;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;
    }

    public getDefinitions(projectId: string): Promise<BuildDefinition[]> {
        let request = new VstsRestRequest(`/${projectId}/_apis/build/definitions`, "GET", "2.0");

        return this.restExecutor.Execute(request);
    }
}