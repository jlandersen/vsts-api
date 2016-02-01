"use strict";

import {VstsClient, VstsConfiguration} from "../src/index";
import {TestExecutor} from "./helpers/testexecutor";

describe("Project Fixture", () => {
    describe("#getProjects()", () => {
        it("Should return multiple projects", (done) => {
            let mockExecutor = new TestExecutor("/_apis/projects?version=1.0", "getProjects");
            let client = new VstsClient(mockExecutor);

            return client.project.getProjects().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(3);

                done();
            });
        });

        it("Should return single project when only one exists", (done) => {
            done();
        });

        it("Should return no projects if none exists", (done) => {
            done();
        });
    });
});