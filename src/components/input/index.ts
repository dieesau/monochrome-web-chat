import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    add_class?: string;
    events?: {
        blur?: () => void;
        focus?: () => void;
    };
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Input;
