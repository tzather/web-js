import { BaseControl } from "../../baseControl.js";

export class DashboardComponent extends BaseControl {
  constructor() {
    super();
    this.constructor.html = "app/dashboard";
  }

  formatContent() {
    return this.constructor.content;
  }
}
customElements.define("wc-dashboard", DashboardComponent);
