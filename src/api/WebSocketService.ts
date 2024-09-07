import store from "../utils/Store.ts";

export interface MessageModel {
  content: string;
  time: string;
  user_id: number;
  id: number;
  type: string;
}

class WebSocketService {
  private socket: WebSocket | null = null;
  public getOldMessages: boolean = false;

  connect(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );
    console.log(
      `Connecting to WebSocket server... ${userId}, ${chatId}, ${token}`,
    );

    this.socket.onerror = () => {
      console.error("Ошибка web socket");
    };

    this.socket.onopen = () => {
      console.log("Соединение успешно установлено");
      this.checkConnect();

      this.socket?.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }),
      );
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение успешно закрыто!");
      } else {
        console.error("Соединение сброшено!");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    };

    this.socket.onmessage = (event) => {
      let data = null;
      try {
        data = JSON.parse(event.data);
      } catch {
        throw new Error("Ошибка десериализации объекта");
      }

      if (data instanceof Array) {
        store.setState({
          chats: data,
        });
        this.getOldMessages = true;
      }

      if (data.type == "pong") {
        return;
      }

      if (data.type == "message") {
        const { content } = data;
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
      }
    };
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

  checkConnect() {
    setTimeout(() => {
      this.socket?.send(
        JSON.stringify({
          type: "ping",
        }),
      );
      this.checkConnect();
    }, 5000);
  }
}

export default new WebSocketService();
