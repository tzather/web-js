export class TextComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.html;
  }

  get html() {
    return `${this.label}<input type="text"${this.value}>`;
  }

  get label() {
    const atr = this.getAttribute("label");
    return atr ? `<label>${atr}</label>` : "";
  }

  get value() {
    const atr = this.getAttribute("value");
    return atr ? ` value="${atr}"` : "";
  }
}
customElements.define("wc-text", TextComponent);
