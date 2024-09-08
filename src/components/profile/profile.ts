import Block from "../../utils/Block";
import template from "./profile.hbs?raw";
import "./profile.scss";
import { Link } from "../index.ts";

class Profile extends Block {
  constructor() {
    const link_profile = new Link({
      className: "profile__link",
      url: "/settings",
      text: "Профиль >",
      page: "/settings",
    });
    super({ link_profile });
  }

  render() {
    return template;
  }
}

export default Profile;
