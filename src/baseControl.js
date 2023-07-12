export class BaseControl extends HTMLElement {
  async connectedCallback() {
    this.constructor.content = this.constructor.content
      ? this.constructor.content
      : await (await fetch(`/${this.constructor.html}/index.html`)).text();
    this.innerHTML = this.formatContent();
    setTimeout(() => this.bindEvents(), 10);
  }

  bindEvents() {}
}
