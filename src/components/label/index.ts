import Block from '../../utils/block';
import template from './label.hbs';

interface LabelProps {
    label_class: string;
    label_data_class: string;
    label_name_text: string;
    label_value_text: string;
}

export class Label extends Block<LabelProps> {
    constructor(props: LabelProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Label;
