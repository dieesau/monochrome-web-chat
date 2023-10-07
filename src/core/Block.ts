import { EventBus } from "./eventBus";
import { v4 as makeUUID } from 'uuid';

export class Block<P extends Record<string, any> = any>{
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: 'flow:component-will-unmount',
    };
  
    _element: null | HTMLElement = null;
    _meta: { props: object };
    _id = '';
  
    props:  P;
    eventBus: () => EventBus;
    children: Record<string, Block | Block[]>;

    constructor(propsAndChildren: P) {
        const { children, props } = this._getChildren(propsAndChildren);
        const eventBus = new EventBus();
        this._meta = { props };
        this.children = children;
        this._id = makeUUID();
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    
    _getChildren(propsAndChildren: P): { props: P, children: Record<string, Block | Block[]> } {
        const children: Record<string, Block | Block[]> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
                children[key as string] = value;
              } else if (value instanceof Block) {
                children[key as string] = value;
              } else {
                props[key] = value;
              }
            });
        
            return {props: props as P, children};
          }
  
    _addEvents() {
        const { events = {} } = this.props as P &  {
            events: Record<string, () => void>;
        };
        Object.keys(events).forEach((eventName) => {
            if (eventName === 'blur' || eventName === 'focus') {
                this._element?.children[1].addEventListener(eventName, events[eventName]);
            } else {
                this._element?.addEventListener(eventName, events[eventName]);
            }
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as P & {
            events: Record<string, () => void>;
        };
        Object.keys(events).forEach((eventName) => {
                this._element?.removeEventListener(eventName, events[eventName]);
        });
    }
    
    _checkInDom() {
        const elementInDOM = document.body.contains(this._element);
    
        if (elementInDOM) {
          setTimeout(() => this._checkInDom(), 1000);
          return;
        }
    
        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
      }

  _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }
  
  _createResources() {
      const tagName = 'div';
      this._element = this._createDocumentElement(tagName);
  }
  
  _init() {
      this._createResources();
      this.init();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    
    init() {}
  
    _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    componentDidMount() {
  }
  
  dispatchComponentDidMount() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
      
      Object.values(this.children).forEach((child) =>
      {
        if (Array.isArray(child)) {
            child.forEach(ch => ch.dispatchComponentDidMount());
          } else {
            child.dispatchComponentDidMount();
          }
      }
    );
  }
  
  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  public componentWillUnmount() {}
    
  _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if(response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  //@ts-ignore
  componentDidUpdate(oldProps: object, newProps: object) {
    return true;
  }
  
  setProps = (nextProps: any ) => {
    if (!nextProps) {
      return;
    }
  
    Object.assign(this.props, nextProps);
  };
  
  get element() {
    return this._element;
  }
  
  _render() {
    const block = this.render();
    const newElement = block.firstElementChild as HTMLElement;
    this._removeEvents();
    this._element!.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
  
  getContent() {
    return this.element!;
  }
  
  _makePropsProxy(props: P) {
    const self = this;
    const proxy = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
            return typeof value === "function" ? value.bind(target) : value;
      },
        set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop as keyof P] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
  });
    return proxy;
    }
    
    compile(template: (props: any) => string, props: any) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map(
                  (child) => `<div data-id="${child._id}"></div>`
                );
              } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
              }
            });

        const html = template(propsAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;

        const replaceStubToComponent = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component._id}"]`);
            if (!stub) {
              return;
            }
            component.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(component.getContent()!);
          };
      
          Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
              component.forEach((component) => replaceStubToComponent(component));
            } else {
              replaceStubToComponent(component);
            }
          });
      
          return temp.content    
    }
  
    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
  }
  
    show() {
        this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }

    public destroy() {
        this._element!.remove();
      }
  }
