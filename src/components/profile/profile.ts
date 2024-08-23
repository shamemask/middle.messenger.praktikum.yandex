import Block from "../../utils/Block";
import template from "./profile.hbs?raw";
import "./profile.scss";
import { Link } from "../index.ts";

interface ProfileProps {
  content: Block;
}

class Profile extends Block {
  constructor(props: ProfileProps) {
    const link_profile = new Link({
      className: "profile__link",
      url: "/settings",
      text: "Профиль >",
      page: "/settings",
    });
    super({ ...props, link_profile });
  }

  render() {
    return template;
  }
}

export default Profile;
