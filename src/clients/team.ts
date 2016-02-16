"use strict";

import { VstsRestExecutor, VstsRestRequest, HttpMethod } from "../vstsRestExecutor";
import { Sequence } from "./common";

export class Room {
    id: number;
    name: string;
    description: string;
    lastActivity: Date;
    createdDate: Date;
    hasAdminPermissions: boolean;
    hasReadWritePermissions: boolean;
    createdBy: {
        id: string;
        displayName: string;
        url: string;
        imageUrl: string;
    };
}

export class RoomUser {
    roomId: number;
    user: {
        id: string;
        displayName: string;
        url: string;
        imageUrl: string;
    };
    lastActivity: Date;
    joinedDate: Date;
    isOnline: boolean;
}

export class TeamClient {
    private restExecutor: VstsRestExecutor;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;
    }

    public getRooms(): Promise<Room[]> {
        let request = new VstsRestRequest("/_apis/chat/rooms", HttpMethod.GET, "1.0");

        return this.restExecutor.execute<Sequence<Room>>(request).then(result => {
            return result.value;
        });
    }

    public getRoom(id: number): Promise<Room> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${id}`, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<Room>(request);
    }

    public createRoom(name: string, description: string): Promise<Room> {
        let request = new VstsRestRequest("/_apis/chat/rooms", HttpMethod.POST, "1.0");
        request.body = { name: name, description: description };

        return this.restExecutor.execute<Room>(request);
    }

    public updateRoom(id: number, name: string, description: string): Promise<Room> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${id}`, HttpMethod.PATCH, "1.0");
        request.body = { name: name, description: description };

        return this.restExecutor.execute(request);
    }

    public deleteRoom(id: number): Promise<boolean> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${id}`, HttpMethod.DELETE, "1.0");

        return this.restExecutor.execute(request).then(result => {
            return true;
        });
    }

    public getUsers(roomId: number): Promise<RoomUser[]> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${roomId}/users`, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<Sequence<RoomUser>>(request).then(result => {
            return result.value;
        });
    }

    public getUser(roomId: number, userId: string): Promise<RoomUser> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${roomId}/users/${userId}`, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<RoomUser>(request);
    }

    public joinRoom(roomId: number, userId: string): Promise<string> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${roomId}/users/${userId}`, HttpMethod.PUT, "1.0");

        return this.restExecutor.execute<any>(request).then(result => {
            return result.userId;
        });
    }

    public leaveRoom(roomId: number, userId: string): Promise<boolean> {
        let request = new VstsRestRequest(`/_apis/chat/rooms/${roomId}/users/${userId}`, HttpMethod.DELETE, "1.0");

        return this.restExecutor.execute<any>(request).then(result => {
            return true;
        });
    }
}