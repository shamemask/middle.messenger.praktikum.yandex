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
      const { type, content } = data;

      if (Array.isArray(data)) {
        store.setState({
          chats: data,
        });
      } else if (type === "message") {
        let messages = store.getState().messages;
        if (!messages) {
          messages = [];
        }
        let currentMessage = messages.find(
          (chat: { chatId: number }) => chat.chatId === chatId,
        );
        if (currentMessage) {
          currentMessage.messages.push(content);
        } else {
          messages.push({
            chatId: chatId,
            messages: [content],
          });
        }

        store.setState({
          messages: messages,
        });
      } else if (type === "ping") {
        store.setState({
          ping: content,
        });
      } else if (type === "pong") {
        store.setState({
          ping: null,
        });
      } else if (type === "user connected") {
        store.setState({
          userConnected: content,
        });
      } else if (type === "user disconnected") {
        store.setState({
          userConnected: content,
        });
      } else if (type === "error") {
        store.setState({
          error: content,
        });
      } else if (type === "notification") {
        store.setState({
          notification: content,
        });
      } else if (type === "message read") {
        store.setState({
          messageRead: content,
        });
      } else if (type === "message deleted") {
        store.setState({
          messageDeleted: content,
        });
      } else if (type === "message edited") {
        store.setState({
          messageEdited: content,
        });
      } else if (type === "message pinned") {
        store.setState({
          messagePinned: content,
        });
      } else if (type === "message unpinned") {
        store.setState({
          messageUnpinned: content,
        });
      } else if (type === "chat deleted") {
        store.setState({
          chatDeleted: content,
        });
      } else if (type === "chat created") {
        store.setState({
          chatCreated: content,
        });
      } else if (type === "chat updated") {
        store.setState({
          chatUpdated: content,
        });
      } else if (type === "chat renamed") {
        store.setState({
          chatRenamed: content,
        });
      } else if (type === "chat avatar updated") {
        store.setState({
          chatAvatarUpdated: content,
        });
      }

      if (this.listeners[type]) {
        this.listeners[type].forEach((callback) => callback(content));
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

  send(type: string, content: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ content: content, type: type }));
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
