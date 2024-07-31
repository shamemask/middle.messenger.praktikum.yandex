class HTTPTransport {
  get(url: string, options: any = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url: string, options: any = {}) {
    return this.request(url, { ...options, method: 'POST' });
  }

  put(url: string, options: any = {}) {
    return this.request(url, { ...options, method: 'PUT' });
  }

  delete(url: string, options: any = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  private request(url: string, options: any) {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);

      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default new HTTPTransport();
