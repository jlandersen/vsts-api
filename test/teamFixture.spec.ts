"use strict";

import {VstsClient, VstsConfiguration} from "../src/index";
import {TestExecutor} from "./helpers/testExecutor";

describe("Team Room Fixture", () => {
    describe("#getRooms()", () => {
        it("Should return multiple team rooms", (done) => {
            let mockExecutor = new TestExecutor("/_apis/chat/rooms?api-version=1.0", "GET", "getRooms");
            let client = new VstsClient(mockExecutor);

            return client.team.getRooms().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(4);

                let first = result[0];
                expect(first.id).toBe(305);
                expect(first.name).toBe("Fabrikam-Fiber-Git Team Room");
                expect(first.description).toBe("");
                expect(first.hasAdminPermissions).toBe(true);
                expect(first.hasReadWritePermissions).toBe(false);
                expect(first.lastActivity).toBe("2014-10-07T22:17:31.723Z");
                expect(first.createdDate).toBe("2014-01-24T19:19:00.21Z");
                expect(first.createdBy.id).toBe("47d25e84-de54-49ce-8f3d-351c77422775");
                expect(first.createdBy.displayName).toBe("[DefaultCollection]\\Project Collection Service Accounts");
                expect(first.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/47d25e84-de54-49ce-8f3d-351c77422775");
                expect(first.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=47d25e84-de54-49ce-8f3d-351c77422775");

                let second = result[1];
                expect(second.id).toBe(306);
                expect(second.name).toBe("Fabrikam-Fiber-TFVC Team Room");
                expect(second.description).toBe("");
                expect(second.hasAdminPermissions).toBe(true);
                expect(second.hasReadWritePermissions).toBe(false);
                expect(second.lastActivity).toBe("2014-01-24T19:20:37.41Z");
                expect(second.createdDate).toBe("2014-01-24T19:20:37.41Z");
                expect(second.createdBy.id).toBe("47d25e84-de54-49ce-8f3d-351c77422775");
                expect(second.createdBy.displayName).toBe("[DefaultCollection]\\Project Collection Service Accounts");
                expect(second.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/47d25e84-de54-49ce-8f3d-351c77422775");
                expect(second.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=47d25e84-de54-49ce-8f3d-351c77422775");

                let third = result[2];
                expect(third.id).toBe(307);
                expect(third.name).toBe("Quality assurance Room");
                expect(third.description).toBe("");
                expect(third.hasAdminPermissions).toBe(true);
                expect(third.hasReadWritePermissions).toBe(false);
                expect(third.lastActivity).toBe("2014-01-27T23:03:55.663Z");
                expect(third.createdDate).toBe("2014-01-27T23:03:55.663Z");
                expect(third.createdBy.id).toBe("47d25e84-de54-49ce-8f3d-351c77422775");
                expect(third.createdBy.displayName).toBe("[DefaultCollection]\\Project Collection Service Accounts");
                expect(third.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/47d25e84-de54-49ce-8f3d-351c77422775");
                expect(third.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=47d25e84-de54-49ce-8f3d-351c77422775");

                let fourth = result[3];
                expect(fourth.id).toBe(2686);
                expect(fourth.name).toBe("TestGit Team Room");
                expect(fourth.description).toBe("");
                expect(fourth.hasAdminPermissions).toBe(true);
                expect(fourth.hasReadWritePermissions).toBe(false);
                expect(fourth.lastActivity).toBe("2014-05-15T14:00:36.443Z");
                expect(fourth.createdDate).toBe("2014-05-15T14:00:36.443Z");
                expect(fourth.createdBy.id).toBe("47d25e84-de54-49ce-8f3d-351c77422775");
                expect(fourth.createdBy.displayName).toBe("[DefaultCollection]\\Project Collection Service Accounts");
                expect(fourth.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/47d25e84-de54-49ce-8f3d-351c77422775");
                expect(fourth.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=47d25e84-de54-49ce-8f3d-351c77422775");

                done();
            });
        });
    });

    describe("#getRoom", () => {
        it("Should return room", (done) => {
            let teamId = 5012;
            let mockExecutor = new TestExecutor(`/_apis/chat/rooms/${teamId}?api-version=1.0`, "GET", "getRoom");
            let client = new VstsClient(mockExecutor);

            return client.team.getRoom(teamId).then(result => {
                expect(result).not.toBeNull();
                expect(result.id).toBe(12797);
                expect(result.name).toBe("renamedRoom");
                expect(result.description).toBe("updated room description");
                expect(result.lastActivity).toBe("2014-10-27T16:32:36.553Z");
                expect(result.createdDate).toBe("2014-10-27T16:32:36.553Z");
                expect(result.hasAdminPermissions).toBe(true);
                expect(result.hasReadWritePermissions).toBe(true);
                expect(result.createdBy.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.displayName).toBe("Normal Paulk");
                expect(result.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");

                done();
            });
        });
    });

    describe("#createRoom", () => {
        it("Should create room", (done) => {
            let name = "newCreatedRoom";
            let description = "used for API doc generation";
            let expectedRequestBody = {
                name: name,
                description: description
            };
            let mockExecutor = new TestExecutor("/_apis/chat/rooms?api-version=1.0", "POST", "createRoom", expectedRequestBody);
            let client = new VstsClient(mockExecutor);

            return client.team.createRoom(name, description).then(result => {
                expect(result).not.toBeNull();
                expect(result.name).toBe(name);
                expect(result.description).toBe(description);
                expect(result.lastActivity).toBe("2014-10-27T16:32:36.553Z");
                expect(result.createdDate).toBe("2014-10-27T16:32:36.553Z");
                expect(result.hasAdminPermissions).toBe(true);
                expect(result.hasReadWritePermissions).toBe(true);
                expect(result.createdBy.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.displayName).toBe("Normal Paulk");
                expect(result.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");

                done();
            });
        });
    });

    describe("#updateRoom", () => {
        it("Should update room", (done) => {
            let roomId = 12797;
            let name = "renamedRoom";
            let description = "updated room description";
            let expectedRequestBody = {
                name: name,
                description: description
            };
            let mockExecutor = new TestExecutor(`/_apis/chat/rooms/${roomId}?api-version=1.0`, "PATCH", "updateRoom", expectedRequestBody);
            let client = new VstsClient(mockExecutor);

            return client.team.updateRoom(roomId, name, description).then(result => {
                expect(result).not.toBe(null);
                expect(result.id).toBe(roomId);
                expect(result.name).toBe(name);
                expect(result.description).toBe(description);
                expect(result.lastActivity).toBe("2014-10-27T16:32:36.553Z");
                expect(result.createdDate).toBe("2014-10-27T16:32:36.553Z");
                expect(result.hasAdminPermissions).toBe(true);
                expect(result.hasReadWritePermissions).toBe(true);
                expect(result.createdBy.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.displayName).toBe("Normal Paulk");
                expect(result.createdBy.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.createdBy.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");

                done();
            });
        });
    });

    describe("#deleteRoom", () => {
        it("Should delete room", (done) => {
            let roomId = 512;
            let mockExecutor = new TestExecutor(`/_apis/chat/rooms/${roomId}?api-version=1.0`, "DELETE");
            let client = new VstsClient(mockExecutor);

            return client.team.deleteRoom(roomId).then(result => {
                expect(result).toBe(true);

                done();
            });
        });
    });
});