"use strict";

import { VstsRestExecutor, VstsRestRequest } from "../vstsClient";
import { Sequence } from "./common";

export interface Project {
    id: number;
    url: string;
    name: string;
    description: string;
    state: string;
}

export class ProjectClient {
    private restExecutor: VstsRestExecutor;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;
    }
    getProjects() {
        let request = new VstsRestRequest("/_apis/projects", "GET", "1.0");
        return this.restExecutor.Execute<Sequence<Project>>(request).then(result => {
            return result.value;
        });
    }
}