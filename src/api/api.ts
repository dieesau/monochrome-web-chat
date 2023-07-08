import { HTTPTransport } from "../utils/fetch";

export abstract class API {
    protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }
}
