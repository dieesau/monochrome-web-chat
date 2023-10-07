import { Block } from '../../core/Block';
import template from "./sideButton.hbs";
import { Image } from '../Image';
import arrowButton from "../../assets/arrowButton.png";
import Router from '../../core/Router';

export class SideButton extends Block {

  constructor(props: object | undefined) {
    super(props)
  }

    init() {
        this.children.image = new Image({ src: arrowButton, alt: "arrow button", class: "image", events: {
          'click': () => {
            Router.go('/messenger');
          }
        }});
    }
    
    render() {
    return this.compile(template, { ...this.props});
  }
}
