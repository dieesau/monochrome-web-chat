import { set } from '../utils/help';
import { EventBus } from '../core/eventBus';
import { Block } from './Block';

export enum StoreEvents {
  Updated = 'updated'
}

type Indexed<T = unknown> = {
    [key in string]: T;
  };

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block){
  
      return class extends Component {
  
        constructor(props: any) {
          let previousState = mapStateToProps(store.getState());
  
          super({ ...props, ...previousState });
  
          store.on(StoreEvents.Updated, () => {
            const stateProps = mapStateToProps(store.getState());
  
            previousState = stateProps;
  
            this.setProps({ ...stateProps });
          });
  
        }
  
      }
  
    }
  }
  
  export default store;
