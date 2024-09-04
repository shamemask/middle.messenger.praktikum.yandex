import store from "../utils/Store.ts";

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Record<string, ((data: any) => void)[]> = {};

  connect(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );
    console.log(
      `Connecting to WebSocket server... ${userId}, ${chatId}, ${token}`,
    );

    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      // Пингуем сервер каждые 30 секунд, чтобы соединение не разрывалось
      setInterval(() => this.sendPing(), 30000);
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;

      if (Array.isArray(data)) {
        store.setState({
          chats: data,
        });
      } else if (type === "message") {
        store.setState({
          messages: [...store.getState().messages, payload],
        });
      } else if (type === "ping") {
        store.setState({
          ping: payload,
        });
      } else if (type === "pong") {
        store.setState({
          ping: null,
        });
      } else if (type === "user connected") {
        store.setState({
          userConnected: payload,
        });
      } else if (type === "user disconnected") {
        store.setState({
          userConnected: payload,
        });
      } else if (type === "error") {
        store.setState({
          error: payload,
        });
      } else if (type === "notification") {
        store.setState({
          notification: payload,
        });
      } else if (type === "message read") {
        store.setState({
          messageRead: payload,
        });
      } else if (type === "message deleted") {
        store.setState({
          messageDeleted: payload,
        });
      } else if (type === "message edited") {
        store.setState({
          messageEdited: payload,
        });
      } else if (type === "message pinned") {
        store.setState({
          messagePinned: payload,
        });
      } else if (type === "message unpinned") {
        store.setState({
          messageUnpinned: payload,
        });
      } else if (type === "chat deleted") {
        store.setState({
          chatDeleted: payload,
        });
      } else if (type === "chat created") {
        store.setState({
          chatCreated: payload,
        });
      } else if (type === "chat updated") {
        store.setState({
          chatUpdated: payload,
        });
      } else if (type === "chat renamed") {
        store.setState({
          chatRenamed: payload,
        });
      } else if (type === "chat avatar updated") {
        store.setState({
          chatAvatarUpdated: payload,
        });
      }

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

  close() {
    if (this.socket) {
      this.socket.close();
    }
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
