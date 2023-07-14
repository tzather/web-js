export class Select extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.html;
  }

  get html() {
    return `<label>${this.label}</label>
<select>
<option></option>
<option>Yes</option>
<option>No</option>
</select>`;
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
customElements.define("wc-select", Select);
