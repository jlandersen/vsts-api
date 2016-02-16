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

    describe("#getUsers", () => {
        it("Should return users in room", (done) => {
            let roomId = 305;
            let mockExecutor = new TestExecutor(`/_apis/chat/rooms/${roomId}/users?api-version=1.0`, "GET", "getUsers");
            let client = new VstsClient(mockExecutor);

            return client.team.getUsers(roomId).then(result => {
                expect(result).not.toBeNull();

                let first = result[0];
                expect(first.user.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(first.user.displayName).toBe("Normal Paulk");
                expect(first.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(first.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(first.lastActivity).toBe("2014-10-27T16:36:02.28Z");
                expect(first.joinedDate).toBe("2014-10-27T16:36:02.203Z");
                expect(first.isOnline).toBe(true);

                let second = result[1];
                expect(second.user.id).toBe("3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
                expect(second.user.displayName).toBe("Christie Church");
                expect(second.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
                expect(second.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
                expect(second.lastActivity).toBe("0001-01-01T00:00:00");
                expect(second.joinedDate).toBe("0001-01-01T00:00:00");
                expect(second.isOnline).toBe(false);

                let third = result[2];
                expect(third.user.id).toBe("8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
                expect(third.user.displayName).toBe("Chuck Reinhart");
                expect(third.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
                expect(third.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
                expect(third.lastActivity).toBe("0001-01-01T00:00:00");
                expect(third.joinedDate).toBe("0001-01-01T00:00:00");
                expect(third.isOnline).toBe(false);

                let fourth = result[3];
                expect(fourth.user.id).toBe("e5a5f7f8-6507-4c34-b397-6c4818e002f4");
                expect(fourth.user.displayName).toBe("Fabrikam Fiber");
                expect(fourth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/e5a5f7f8-6507-4c34-b397-6c4818e002f4");
                expect(fourth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=e5a5f7f8-6507-4c34-b397-6c4818e002f4");
                expect(fourth.lastActivity).toBe("0001-01-01T00:00:00");
                expect(fourth.joinedDate).toBe("0001-01-01T00:00:00");
                expect(fourth.isOnline).toBe(false);

                let fifth = result[4];
                expect(fifth.user.id).toBe("19d9411e-9a34-45bb-b985-d24d9d87c0c9");
                expect(fifth.user.displayName).toBe("Johnnie McLeod");
                expect(fifth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/19d9411e-9a34-45bb-b985-d24d9d87c0c9");
                expect(fifth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=19d9411e-9a34-45bb-b985-d24d9d87c0c9");
                expect(fifth.lastActivity).toBe("0001-01-01T00:00:00");
                expect(fifth.joinedDate).toBe("0001-01-01T00:00:00");
                expect(fifth.isOnline).toBe(false);

                let sixth = result[5];
                expect(sixth.user.id).toBe("d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
                expect(sixth.user.displayName).toBe("Jamal Hartnett");
                expect(sixth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
                expect(sixth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
                expect(sixth.lastActivity).toBe("0001-01-01T00:00:00");
                expect(sixth.joinedDate).toBe("0001-01-01T00:00:00");
                expect(sixth.isOnline).toBe(false);

                done();
            });
        });
    });

    describe("#getUser", () => {
        it("Should return user in room", (done) => {
            let roomId = 305;
            let userId = "d6245f20-2af8-44f4-9451-8107cb2767db";
            let mockExecutor = new TestExecutor(`/_apis/chat/rooms/305/users/d6245f20-2af8-44f4-9451-8107cb2767db?api-version=1.0`, "GET", "getUser");
            let client = new VstsClient(mockExecutor);

            return client.team.getUser(roomId, userId).then(result => {
                expect(result).not.toBeNull();

                expect(result.user.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.user.displayName).toBe("Normal Paulk");
                expect(result.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");
                expect(result.lastActivity).toBe("2014-10-27T16:36:02.28Z");
                expect(result.joinedDate).toBe("2014-10-27T16:36:02.203Z");
                expect(result.isOnline).toBe(true);

                done();
            });
        });
    });

    describe("#joinRoom", () => {
        it("Should join room", (done) => {
            let roomId = 305;
            let userId = "d6245f20-2af8-44f4-9451-8107cb2767db";
            let mockExecutor = new TestExecutor("/_apis/chat/rooms/305/users/d6245f20-2af8-44f4-9451-8107cb2767db?api-version=1.0", "PUT", "joinRoom");
            let client = new VstsClient(mockExecutor);

            return client.team.joinRoom(roomId, userId).then(result => {
                expect(result).not.toBe(null);
                expect(result).toBe(userId);

                done();
            });
        });
    });

    describe("#leaveRoom", () => {
        it("Should leave room", (done) => {
            let roomId = 305;
            let userId = "d6245f20-2af8-44f4-9451-8107cb2767db";
            let mockExecutor = new TestExecutor("/_apis/chat/rooms/305/users/d6245f20-2af8-44f4-9451-8107cb2767db?api-version=1.0", "DELETE");
            let client = new VstsClient(mockExecutor);

            return client.team.leaveRoom(roomId, userId).then(result => {
                expect(result).toBe(true);

                done();
            });

        });
    });
});