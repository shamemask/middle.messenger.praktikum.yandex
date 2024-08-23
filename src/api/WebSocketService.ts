class WebSocketService {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  sendMessage(message: string) {
    this.socket.send(JSON.stringify({ content: message, type: "message" }));
  }

  onMessage(callback: (message: any) => void) {
    this.socket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }

  close() {
    this.socket.close();
  }
}

export default WebSocketService;
