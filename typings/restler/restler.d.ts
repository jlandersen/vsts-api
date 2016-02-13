declare module "restler" {
    export interface RestlerOptions {
        method: string;
        username: string;
        password: string;
        accessToken?: string;
        headers?: any;
        query?: string;
        data?: string;
    }

    export function get(url: string, options: RestlerOptions): any;
    export function request(url: string, options: RestlerOptions): any;
} 