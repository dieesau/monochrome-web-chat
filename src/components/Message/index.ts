import { MessageType } from 'pages/Chat';
import { Block } from '../../core/Block';
import template from './message.hbs';
import { MyID } from 'components/MessagePanel';

export class Message extends Block {
  constructor(props: MessageType & MyID) {
    super(props);
    }
    
    init() {
        if (this.props.myId === this.props.user_id) {
            this.props.isMyMsg = true;
        }
            if (!this.props.time) {
                return;
            }
            const todayDate = new Date().toLocaleDateString();
            const messageDate = new Date(this.props.time).toLocaleDateString();
            if (todayDate === messageDate) {
                this.props.time = new Date(this.props.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            } else {
                this.props.time = messageDate;
            }
        }

    
  render() {
    return this.compile(template, { ...this.props});
  }
}