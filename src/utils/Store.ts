import EventBus from "./EventBus.ts";

export class Store extends EventBus {
  private state: any;

  constructor() {
    super();
    this.state = {};
  }

  getState() {
    return this.state;
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.emit("updated", this.state);
  }
}

const store = new Store();
export default store;
