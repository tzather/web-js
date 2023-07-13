import { BaseControl } from "../../baseControl.js";

export class LoginComponent extends BaseControl {
  constructor() {
    super();
    this.constructor.html = "app/login";
  }

  formatContent() {
    return this.constructor.content;
  }

  bindEvents() {
    this.querySelector("#submit").addEventListener("click", this.login.bind(this));
  }

  login() {
    window.location.href = "app/login";
  }
}
customElements.define("wc-login", LoginComponent);
