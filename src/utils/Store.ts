import EventBus from "./EventBus.ts";

export class Store extends EventBus {
  private state: any;

  constructor() {
    super();

    // Load state from localStorage if it exists, otherwise initialize to an empty object
    const savedState = localStorage.getItem("appState");
    this.state = savedState ? JSON.parse(savedState) : {};
  }

  getState() {
    return this.state;
  }

  setState(newState: any) {
    // Merge the new state with the current state
    this.state = { ...this.state, ...newState };

    // Emit an event to notify that the state has been updated
    this.emit("updated", this.state);

    // Save the new state to localStorage
    localStorage.setItem("appState", JSON.stringify(this.state));
  }
}

const store = new Store();
export default store;
