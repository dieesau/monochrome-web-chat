import { Block } from '../../core/Block';
import template from './button.hbs';

type ButtonProps = {
    buttonClass: string;
    type: string;
    buttonText: string;
    events?: {
      click: (evt: PointerEvent) => void;
    };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props)
  }

    render() {
    return this.compile(template, { ...this.props});
  }
}
