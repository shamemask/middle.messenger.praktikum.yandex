type Options = {
  method?: string;
  headers?: Record<string, string>;
  timeout?: number;
  data?: any;
  body?: any;
};

const Headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(
      url,
      { headers: Headers, ...options, method: METHODS.POST },
      options.timeout,
    );

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request(
    url: string,
    options: Options = {},
    timeout = 5000,
  ): Promise<unknown> {
    const { method = "GET", headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.withCredentials = true;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.response));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Network Error"));
      };

      xhr.timeout = timeout;
      xhr.ontimeout = function () {
        reject(new Error("Request timed out"));
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
