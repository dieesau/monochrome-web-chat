import { Block } from '../../core/Block';
import template from './search.hbs';

export type SearchProps = {
    events: {
        click: (evt: PointerEvent) => void;
        submit: (evt: SubmitEvent) => void;
    }
};

export class Search extends Block {
  constructor(props: SearchProps) {
    super(props)
  }

    render() {
    return this.compile(template, { ...this.props});
  }
}
