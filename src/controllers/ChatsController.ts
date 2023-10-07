import store from '../core/Store';
import API, { ChatAPI, CreateChatType, DeleteOrAddUserFromChat } from '../api/chat';
import WS from '../core/WebSocket';
//import Router from '../core/Router';

export type ChatsType = {
    avatar: string | null;
    created_by: number;
    id: number;
    last_message: string | null;
    title: string;
    unread_count: number;
}

export class ChatsController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }
  
  getToken(id: number) {
    return this.api.getToken(id);
  }

    async getChats() {
        try {
            let chats:ChatsType[] = [];
            chats = await this.api.read() as ChatsType[];
            store.set('chats', chats);
            store.set('currentChat', 0);
            chats.map(async (chat) => {
            const token = await this.getToken(chat.id);
            await this.connect(chat.id, token);
        });
        } catch (e: any) {
            console.error(e);
        }
    }
    
    async getFiltredChats(filter: string) {
        try {
            let chats: ChatsType[] = [];
            chats = await this.api.getFilter(`?title=${filter}`) as ChatsType[];
            store.set('chats', chats);
            store.set('currentChat', 0);
            chats.map(async (chat) => {
            const token = await this.getToken(chat.id);
            await this.connect(chat.id, token);
        });
        } catch (e: any) {
            console.error(e);
        }
    }

  async createChat(data: CreateChatType) {
    try {
      await this.api.create(data);
      this.getChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async addUserFromChat(data: DeleteOrAddUserFromChat) {
    try {
      await this.api.addUser(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

    async deleteUserFromChat(data: DeleteOrAddUserFromChat) {
        try {
            await this.api.deleteUser(data);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async deleteChat(id: number) {
        try {
            await this.api.deleteChat(id);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async changeChatAvatar(data: any) {
        try {
            await this.api.changeAvatar(data);
        } catch (e: any) {
            console.error(e.message);
        }
    }
    
//websocket
  private sockets = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.id;
    const ws = new WS(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
    this.sockets.set(id,ws);
    await ws.connect();

      this.subscribe(ws, id);
      this.getOldMessages(id);
  }

  subscribe(ws: WS, id: number) {
    ws.on('message', (message) => this.onMessage(id, message));
    ws.on('close', () => this.onClose(id));
  }

  onMessage(id: number, messages: any) {
    let newMessages = [];

    if (Array.isArray(messages)) {
        newMessages = messages.reverse();
    } else {
        newMessages.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];
    newMessages = [...currentMessages, ...newMessages];
    store.set(`messages.${id}`, newMessages);
  }

    sendMessage(id: number, message: string) {
        const socket = this.sockets.get(id);
        if (!socket) {
            throw new Error('Socket error');
        }
        socket.send({
            type: 'message',
            content: message,
        });
    }

    onClose(id: number) {
        this.sockets.delete(id);
    }

    closeAll() {
        Array.from(this.sockets.values()).forEach(socket => socket.close());
    }

    getOldMessages(id: number) {
        const socket = this.sockets.get(id);
        if (!socket) {
          throw new Error('Socket error');
        }
        socket.send({type: 'get old', content: '0'});
    }
    
    checkedChat(id: number) {
        store.set('currentChat', id);
    }
}

export default new ChatsController();
