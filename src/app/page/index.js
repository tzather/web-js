import { BaseControl } from "../../baseControl.js";

export class PageComponent extends BaseControl {
  constructor() {
    super();
    this.constructor.html = "app/page";
  }

  formatContent() {
    return this.constructor.content;
  }
}

customElements.define("wc-page", PageComponent);
