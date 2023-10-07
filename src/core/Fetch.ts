import { SignInDataType } from "api/auth";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type Options = {
    data?: any | SignInDataType;
    method: string;
    headers?: object;
    timeout: number;
};

type HTTPMethod = (path: string, options: Options) => Promise<unknown>

function queryStringify(data: any) {
    let str = '?';
    for (const key in data) {
        str = str + '' + key + '=' + data[key] + '&';
    }
    return str.slice(0, -1);
}

export class HTTPTransport {
    static api_url = 'https://ya-praktikum.tech/api/v2';
    endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = `${HTTPTransport.api_url}${endpoint}`;
    }

    get: HTTPMethod = (path, options = { timeout: 5000, method: METHODS.GET }) => {
        options.data = queryStringify(options.data);
        return this.request(this.endpoint + path, {...options}, options.timeout);
    };

    post: HTTPMethod = (path, options= { data: {}, timeout: 5000, method: METHODS.POST}) => {
            return this.request(this.endpoint + path, {...options}, options.timeout);
    };

    put: HTTPMethod = (path, options = {data: {}, timeout: 5000, method: METHODS.PUT}) => {
            return this.request(this.endpoint + path, {...options}, options.timeout);
    };

    delete: HTTPMethod = (path, options = {data: {}, timeout: 5000, method: METHODS.DELETE}) => { 
            return this.request(this.endpoint + path, {...options}, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.open(method, url);

            xhr.onreadystatechange = () => {
      
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status < 400) {
                  resolve(xhr.response);
                } else {
                  reject(xhr.response);
                }
              }
            };

            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            xhr.onabort = reject;
            xhr.onerror = reject;
			xhr.ontimeout = reject;
            
            if (method === METHODS.GET || !data) {
                xhr.setRequestHeader("Content-Type", 'application/json');
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send(data);
            }
            else {
                xhr.setRequestHeader("Content-Type", 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
