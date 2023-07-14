export class CheckboxComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.html;
  }

  get html() {
    return `<input type="checkbox"${this.value}/><label>${this.label}</label>`;
  }

  get label() {
    const atr = this.getAttribute("label");
    return atr ? `<label>${atr}</label>` : "";
  }

  get value() {
    const atr = this.getAttribute("value");
    return atr > 0 ? " checked" : "";
  }
}
customElements.define("wc-checkbox", CheckboxComponent);
