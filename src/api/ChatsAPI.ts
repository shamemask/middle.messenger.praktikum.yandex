import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";

// Установка базового URL для API
const chatsAPIInstance = new HTTPTransport();

export const ChatsAPI = {
  // Получение списка чатов
  getChats: (
    params: { offset?: number; limit?: number; title?: string } = {},
  ) => chatsAPIInstance.get(`${API_URL}/chats`, { data: params }),

  // Создание нового чата
  createChat: (data: { title: string }) =>
    chatsAPIInstance.post(`${API_URL}/chats`, { data }),

  // Удаление чата по ID
  deleteChat: (data: { chatId: number }) =>
    chatsAPIInstance.delete(`${API_URL}/chats`, { data }),

  // Получение файлов, отправленных в чате
  getChatFiles: (chatId: number) =>
    chatsAPIInstance.get(`${API_URL}/chats/${chatId}/files`),

  // Получение архивных чатов
  getArchivedChats: (
    params: { offset?: number; limit?: number; title?: string } = {},
  ) => chatsAPIInstance.get(`${API_URL}/chats/archive`, { data: params }),

  // Архивирование чата
  archiveChat: (data: { chatId: number }) =>
    chatsAPIInstance.post(`${API_URL}/chats/archive`, { data }),

  // Разархивирование чата
  unarchiveChat: (data: { chatId: number }) =>
    chatsAPIInstance.post(`${API_URL}/chats/unarchive`, { data }),

  // Получение общих чатов с пользователем
  getCommonChatWithUser: (chatId: number) =>
    chatsAPIInstance.get(`${API_URL}/chats/${chatId}/common`),

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
    chatsAPIInstance.get(`${API_URL}/chats/${chatId}/users`, { data: params }),

  // Получение количества новых сообщений в чате
  getNewMessagesCount: (chatId: number) =>
    chatsAPIInstance.get(`${API_URL}/chats/new/${chatId}`),

  // Обновление аватара чата
  updateChatAvatar: (data: FormData) =>
    chatsAPIInstance.put(`${API_URL}/chats/avatar`, { data }),

  // Добавление пользователей в чат
  addUsersToChat: (data: { users: number[]; chatId: number }) =>
    chatsAPIInstance.put(`${API_URL}/chats/users`, { data }),

  // Удаление пользователей из чата
  removeUsersFromChat: (data: { users: number[]; chatId: number }) =>
    chatsAPIInstance.delete(`${API_URL}/chats/users`, { data }),

  // Получение токена для подключения к серверу сообщений
  getChatToken: (chatId: number) =>
    chatsAPIInstance.post(`${API_URL}/chats/token/${chatId}`),
};
