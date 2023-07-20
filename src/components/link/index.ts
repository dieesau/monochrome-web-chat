import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import template from './link.hbs';


interface LinkProps extends PropsWithRouter {
    to: string;
    link_class: string;
    text: string;
    events?: {
        click: (event: MouseEvent) => void;
    };
}

class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.navigate();
                }
            },
        });
    }

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export const Link = withRouter(BaseLink);
