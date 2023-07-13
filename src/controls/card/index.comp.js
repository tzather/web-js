export class CardComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.html;
  }

  get html() {
    return `<header>{header}</header><section>{section}</section>`.replace("{header}", this.header).replace("{section}", this.section);
  }

  get header() {
    return this.getAttribute("header") ?? "";
  }

  get section() {
    return this.innerHTML;
  }
}
customElements.define("wc-card", CardComponent);
