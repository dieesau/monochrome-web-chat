import { Callback, CallbackList } from './types.ts';

export default class EventBus {
    // private listeners: { [key: string]: CallbackList };
    private listeners: Record<string, CallbackList>;

    constructor() {
        this.listeners = {};
    }

    public on<T>(event: string, callback: T) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback as Callback);
    }

    public off(event: string, callback: Callback) {
        if (!this.listeners[event]) {
            throw new Error(`No Event: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`No Event: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}