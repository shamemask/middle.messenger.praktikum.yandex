import { expect } from "chai";
import { HTTPTransport } from "../HTTPTransport"; // Путь к классу

(global as any).XMLHttpRequest = class {
  open = () => {};
  setRequestHeader = () => {};
  withCredentials = true;
  timeout = 0;
  status = 200;
  response = JSON.stringify({ success: true });

  onload = () => {};
  onerror = () => {};
  ontimeout = () => {};

  send = () => {
    this.onload();
  };
};

describe("HTTPTransport", () => {
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport();
  });

  it("should send a GET request", async () => {
    const response = await http.get("/test");
    expect(response).to.equal(JSON.stringify({ success: true }));
  });

  it("should send a POST request with data", async () => {
    const options = {
      data: JSON.stringify({ name: "John" }),
    };
    const response = await http.post("/test", options);
    expect(response).to.equal(JSON.stringify({ success: true }));
  });

  it("should handle request timeouts", async () => {
    (global as any).XMLHttpRequest.prototype.send = function () {
      this.ontimeout();
    };

    try {
      await http.get("/test", { timeout: 100 });
    } catch (error: any) {
      expect(error.message).to.equal("Request timed out");
    }
  });

  it("should handle network errors", async () => {
    (global as any).XMLHttpRequest.prototype.send = function () {
      this.onerror();
    };

    try {
      await http.get("/test");
    } catch (error: any) {
      expect(error.message).to.equal("Network Error");
    }
  });
});
