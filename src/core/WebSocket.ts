import { EventBus } from './eventBus';

export default class WS extends EventBus {
    private socket: WebSocket | null = null;
    interval = 0;

    constructor(private url: string) {
        super();
    }

    send(data: any) {
        if (!this.socket) {
            throw new Error('Socket error');
        }
        this.socket.send(JSON.stringify(data))
    }

    connect(): Promise<void> {
        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket);

        return new Promise((resolve) => {
            this.on('connected', () => {
                resolve();
            });
        });
  }

    close() {
        this.socket!.close();
    }

    subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit('connected');
        });

        socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);  
            this.emit('message', data);
        });

        socket.addEventListener('error', (e) => {
            this.emit('error', e);
        });

        socket.addEventListener('close', () => {
            this.emit('close');
        });
    }
}
