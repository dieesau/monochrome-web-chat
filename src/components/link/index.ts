import { Block } from '../../core/Block';
import template from './link.hbs';

type LinkProps = {
    linkClass: string;
    linkText: string;
    href: string;
    events?: {
      click: (evt: PointerEvent) => void;
    };
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props)
  }

    render() {
    return this.compile(template, { ...this.props});
  }
}
