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
}