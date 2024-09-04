import { ChatsAPI, getChatsResponse } from "./ChatsAPI";
import store from "../utils/Store";
import WebSocketService from "./WebSocketService.ts";

export class ChatInitializer {
  /**
   * Метод для инициализации чатов: получение списка чатов и установка WebSocket соединения
   */
  static async initChats(currentChatId?: number) {
    try {
      // Получаем список чатов
      const chatResponse = await ChatsAPI.getChats();
      let chatList: getChatsResponse[] = [];
      if (chatResponse) {
        chatList = chatResponse;

        // Сохраняем список чатов в Store
        store.setState({ chatList: chatList });

        // Если есть чаты, получаем токены и подключаемся по WebSocket
        if (chatList.length > 0) {
          if (currentChatId) {
            await ChatInitializer.initWebSocket(currentChatId);
          } else await ChatInitializer.initWebSocket(chatList[0].id);
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

      if (tokenResponse) {
        const token = JSON.parse(tokenResponse);

        // Устанавливаем WebSocket соединение
        WebSocketService.connect(userId, chatId, token.token);
      }
    } catch (error) {
      console.error(`Error initializing WebSocket for chat ${chatId}:`, error);
    }
  }
}
