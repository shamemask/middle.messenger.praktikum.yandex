import EventBus from "./EventBus";
import Handlebars from "handlebars";

export type BlockProps = Record<string, any>;

export class Block<TProps extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);
  protected props: TProps;
  private children: Record<string, Block>;
  private lists: Record<string, Block[]>;
  private eventBus: () => EventBus;

  constructor(propsWithChildren: TProps = {} as TProps) {
    const eventBus = new EventBus();
    const {props, children, lists} = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({...props});
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents(): void {
    const {events = {}} = this.props;
    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _removeEvents(): void {
    const {events = {}} = this.props as { events: Record<string, EventListenerOrEventListenerObject> };

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(oldProps: TProps): void {
    this.componentDidMount(oldProps);
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps: TProps): void {
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return true;
  }

  _getChildrenPropsAndProps(propsAndChildren: TProps): { props: TProps; children: Record<string, Block>; lists: Record<string, Block[]> } {
    const children: Record<string, Block> = {};
    const props: TProps = {} as TProps;
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(item => item instanceof Block)) {
        lists[key] = value;
      } else {
        (props as any)[key] = value;
      }
    });

    return {children, props, lists};
  }

  addAttributes(): void {
    const {attr = {}} = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
    });
  }

  setProps = (nextProps: TProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  _render(): void {
    const propsAndStubs = {...this.props};
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template(propsAndStubs);
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.getContent());
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template') as HTMLTemplateElement;
      child.forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement as HTMLElement;
    this._addEvents();
    this.addAttributes();
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: TProps): TProps {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = {...target};
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = "block";
  }

  hide(): void {
    this.getContent().style.display = "none";
  }
}
