import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";

// Установка базового URL для API
const chatsAPIInstance = new HTTPTransport();

export const ChatsAPI = {
  // Получение списка чатов
  getChats: (
    params: { offset?: number; limit?: number; title?: string } = {},
  ) =>
    chatsAPIInstance
      .get(`${API_URL}/chats`, {
        data: params,
      })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getChats:", error);
        throw error;
      }) as Promise<string>,

  // Создание нового чата
  createChat: (data: { title: string }) =>
    chatsAPIInstance
      .post(`${API_URL}/chats`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении createChat:", error);
        throw error;
      }),

  // Удаление чата по ID
  deleteChat: (data: { chatId: number }) =>
    chatsAPIInstance
      .delete(`${API_URL}/chats`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении deleteChat:", error);
        throw error;
      }),

  // Получение файлов, отправленных в чате
  getChatFiles: (chatId: number) =>
    chatsAPIInstance
      .get(`${API_URL}/chats/${chatId}/files`)
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getChatFiles:", error);
        throw error;
      }),

  // Получение архивных чатов
  getArchivedChats: (
    params: { offset?: number; limit?: number; title?: string } = {},
  ) =>
    chatsAPIInstance
      .get(`${API_URL}/chats/archive`, { data: params })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getArchivedChats:", error);
        throw error;
      }),

  // Архивирование чата
  archiveChat: (data: { chatId: number }) =>
    chatsAPIInstance
      .post(`${API_URL}/chats/archive`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении archiveChat:", error);
        throw error;
      }),

  // Разархивирование чата
  unarchiveChat: (data: { chatId: number }) =>
    chatsAPIInstance
      .post(`${API_URL}/chats/unarchive`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении unarchiveChat:", error);
        throw error;
      }),

  // Получение общих чатов с пользователем
  getCommonChatWithUser: (chatId: number) =>
    chatsAPIInstance
      .get(`${API_URL}/chats/${chatId}/common`)
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getCommonChatWithUser:", error);
        throw error;
      }),

  // Получение пользователей чата
  getChatUsers: (
    chatId: number,
    params: {
      offset?: number;
      limit?: number;
      name?: string;
      email?: string;
    } = {},
  ) =>
    chatsAPIInstance
      .get(`${API_URL}/chats/${chatId}/users`, { data: params })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getChatUsers:", error);
        throw error;
      }),

  // Получение количества новых сообщений в чате
  getNewMessagesCount: (chatId: number) =>
    chatsAPIInstance
      .get(`${API_URL}/chats/new/${chatId}`)
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getNewMessagesCount:", error);
        throw error;
      }),

  // Обновление аватара чата
  updateChatAvatar: (data: FormData) =>
    chatsAPIInstance
      .put(`${API_URL}/chats/avatar`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении updateChatAvatar:", error);
        throw error;
      }),

  // Добавление пользователей в чат
  addUsersToChat: (data: { users: number[]; chatId: number }) =>
    chatsAPIInstance
      .put(`${API_URL}/chats/users`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении addUsersToChat:", error);
        throw error;
      }),

  // Удаление пользователей из чата
  removeUsersFromChat: (data: { users: number[]; chatId: number }) =>
    chatsAPIInstance
      .delete(`${API_URL}/chats/users`, { data })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении removeUsersFromChat:", error);
        throw error;
      }),

  // Получение токена для подключения к серверу сообщений
  getChatToken: (chatId: string) =>
    chatsAPIInstance
      .post(`${API_URL}/chats/token/${chatId}`)
      .catch((error: Error) => {
        console.error("Ошибка при выполнении getChatToken:", error);
        throw error;
      }) as Promise<string>,
};
