import "./chat-menu.scss";
import Block from "../../utils/Block";
import template from "./chat-menu.hbs?raw";
import { CompleteUserData } from "../../api/AuthAPI.ts";
import { UsersAPI } from "../../api/UsersAPI.ts";
import { ChatsAPI } from "../../api/ChatsAPI.ts";
import Button from "../button";

interface ChatMenuProps {
  chatId: number;
  events?: {
    click?: (event: Event) => void;
  };
}

class ChatMenu extends Block {
  constructor(props: ChatMenuProps) {
    const button_add_user = new Button({
      className: "add-user-button",
      text: "Добавить пользователя",
      type: "submit",
      events: {
        click: (event: Event) => this.handleFormSubmit(event, props.chatId),
      },
    });

    const button_remove_user = new Button({
      className: "remove-user-button",
      text: "Удалить пользователя",
      type: "submit",
      events: {
        click: (event: Event) => this.handleFormSubmit(event, props.chatId),
      },
    });
    super({
      button_add_user,
      button_remove_user,
      ...props,
    });
  }

  handleFormSubmit(event: Event, chatId: number) {
    event.preventDefault();
    const batton = event.target as HTMLButtonElement;
    const form = batton.closest("form") as HTMLFormElement;
    const userNameInput = form.querySelector(
      "input[name='user-name']",
    ) as HTMLInputElement;
    if (!userNameInput.value) {
      return;
    }
    const separators = [" ", ",", ";"];
    let userName: string[] = [];
    // Проверка наличия разделителя в имени пользователя
    if (
      separators.some((separator) => userNameInput.value.includes(separator))
    ) {
      separators.forEach((separator) => {
        userName.push(...userNameInput.value.split(separator));
      });
    } else {
      userName = [userNameInput.value];
    }
    if (form.classList.contains("add-user-form")) {
      // получить данные пользователя
      let userData: Promise<CompleteUserData[]>[] = [];
      userName.map((user: string) =>
        userData.push(UsersAPI.searchUserByLogin({ login: user })),
      );
      // преобразовать матрицу в массив
      Promise.all(userData).then((data: CompleteUserData[][]) => {
        let users: number[] = [];
        data.forEach((usersArray: CompleteUserData[]) => {
          usersArray.forEach((user: CompleteUserData) => {
            users.push(user.id);
          });
        });
        ChatsAPI.addUsersToChat({
          users: users,
          chatId: chatId,
        })
          .then(() => {
            console.log("User added successfully");
            alert("Пользователь был добавлен в чат");
          })
          .catch((error) => {
            console.error("Failed to add user:", error);
            alert("Пользователь не был добавлен в чат");
          });
      });
    } else if (form.classList.contains("remove-user-form")) {
      let userData: Promise<CompleteUserData[]>[] = [];
      userName.map((user: string) =>
        userData.push(UsersAPI.searchUserByLogin({ login: user })),
      );
      // преобразовать матрицу в массив
      Promise.all(userData).then((data: CompleteUserData[][]) => {
        let users: number[] = [];
        data.forEach((usersArray: CompleteUserData[]) => {
          usersArray.forEach((user: CompleteUserData) => {
            users.push(user.id);
          });
        });
        // Удаление пользователя
        ChatsAPI.removeUsersFromChat({
          users: users,
          chatId: chatId,
        })
          .then(() => {
            console.log("User removed successfully");
            alert("Пользователь был удален из чата");
          })
          .catch((error) => {
            console.error("Failed to remove user:", error);
            alert("Пользователь не был удален из чата");
          });
      });
    }
  }

  render() {
    return template;
  }
}

export default ChatMenu;
