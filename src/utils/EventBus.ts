type Listeners = Record<string, Function[]>;

class EventBus {
  private listeners: Listeners = {};

  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: any[]) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`No such event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No such event: ${event}`);
    }

    this.listeners[event].forEach(listener => listener(...args));
  }
}

export default EventBus;
