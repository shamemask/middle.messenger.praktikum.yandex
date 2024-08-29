class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Record<string, ((data: any) => void)[]> = {};

  connect(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );

    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      // Пингуем сервер каждые 30 секунд, чтобы соединение не разрывалось
      setInterval(() => this.sendPing(), 30000);
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;

      if (this.listeners[type]) {
        this.listeners[type].forEach((callback) => callback(payload));
      }
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    this.socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
  }

  send(type: string, payload: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }

  sendPing() {
    this.send("ping", {});
  }

  addListener(type: string, callback: (data: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeListener(type: string, callback: (data: any) => void) {
    this.listeners[type] = this.listeners[type].filter((cb) => cb !== callback);
  }
}

export default new WebSocketService();
