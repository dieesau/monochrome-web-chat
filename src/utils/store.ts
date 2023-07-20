import { IUser } from '~api/auth';
import EventBus from './event-bus';
import  {set}  from './set';
import Block from './block';

export interface State {
    user?: IUser;
}

enum StorageEvent {
    UpdateState = 'update',
}

class Store extends EventBus {
    private state: State = {};

    getState() {
        return this.state;
    }

    set(path: string, value: unknown) {
        set(this.state, path, value);

        console.log(this.state)

        this.emit(StorageEvent.UpdateState, this.state);
    }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
    return (Component: typeof Block) => {
        return class extends Component {
            constructor(props: any) {
                super({ ...props, ...mapStateToProps(store.getState()) });

                store.on(StorageEvent.UpdateState, () => {
                    const propsFromState = mapStateToProps(store.getState());
                    this.setProps({...propsFromState});
                });
            }
        }
    }
}

export default store;
