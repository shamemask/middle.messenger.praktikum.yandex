import { ChatsAPI } from "./ChatsAPI";
import store from "../utils/Store";
import WebSocketService from "./WebSocketService.ts";

export class ChatInitializer {
  /**
   * Метод для инициализации чатов: получение списка чатов и установка WebSocket соединения
   */
  static async initChats() {
    try {
      // Получаем список чатов
      const chatResponse = await ChatsAPI.getChats();

      if ((chatResponse as Response).status === 200) {
        const chatList = await (chatResponse as Response).json();

        // Сохраняем список чатов в Store
        store.setState({ chatList });

        // Если есть чаты, получаем токены и подключаемся по WebSocket
        if (chatList.length > 0) {
          for (const chat of chatList) {
            await ChatInitializer.initWebSocket(chat.id);
          }
        }
      }
    } catch (error) {
      console.error("Error initializing chats:", error);
    }
  }

  /**
   * Метод для инициализации WebSocket соединения для конкретного чата
   * @param chatId ID чата, для которого устанавливается соединение
   */
  static async initWebSocket(chatId: number) {
    try {
      // Получаем токен для WebSocket соединения
      const tokenResponse = await ChatsAPI.getChatToken(chatId);

      const userId = store.getState().user.id;

      if ((tokenResponse as Response).status === 200) {
        const { token } = await (tokenResponse as Response).json();

        // Устанавливаем WebSocket соединение
        WebSocketService.connect(userId, chatId, token);
      }
    } catch (error) {
      console.error(`Error initializing WebSocket for chat ${chatId}:`, error);
    }
  }
}
