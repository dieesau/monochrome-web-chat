import { HTTPTransport } from '../core/Fetch';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

    create?(data: unknown): Promise<unknown>;

    read?(_id?: string | number): Promise<unknown>;

    update?(_id: string | number, data: unknown): Promise<unknown>;

    delete?(_id: string | number): Promise<unknown>;
}