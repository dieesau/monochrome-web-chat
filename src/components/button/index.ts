import Block from '../../utils/block';
import template from './button.hbs';

interface ButtonProps {
    type?: string;
    label: string;
    add_class: string;
    events: {
        click: (e: Event) => void;
    };
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({type: 'button', ...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Button;
