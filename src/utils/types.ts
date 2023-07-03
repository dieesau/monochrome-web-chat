export type Callback = (...args: unknown[]) => unknown;
export type CallbackList = Callback[];
export enum BLOCK_EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update',
}

export enum STORE_EVENTS {
    UPDATE = 'update',
}

export type Props = Record<string, unknown>;

export type ChatItem = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: UserResponse;
        time: string;
        content: string;
    };
};

export type UserResponse = {
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
};

export type ChatMessage = {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string;
    content: string;
    file?: Resource;
};

export type Resource = {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
};