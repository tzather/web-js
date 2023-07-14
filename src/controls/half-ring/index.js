class Donut extends HTMLElement {
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  static get observedAttributes() {
    return ["percentage"];
  }

  get text() {
    return this.getAttribute("text") ?? this.percentage;
  }
  get stroke() {
    return +(this.getAttribute("stroke") ?? 3);
  }
  get width() {
    return +this.getAttribute("width");
  }
  get color() {
    return this.getAttribute("color");
  }
  get percentage() {
    return +(this.getAttribute("percentage") ?? 0);
  }

  render() {
    let radius = 50 - this.stroke;
    let circumference = 2 * Math.PI * radius;
    let percentageAdjusted = (this.percentage * circumference) / 200;
    this.innerHTML = `
<svg width="${this.width}" viewbox="0 0 100 50">
<g transform="rotate(-180 50 50)">
  <circle cx="50" cy="50" r="${radius}" fill="none" stroke="silver" stroke-width="${this.stroke}"></circle>
  <circle class="old_data" cx="50" cy="50" r="${radius}" fill="none" stroke="${this.color}"
  stroke-width="${this.stroke}" stroke-dasharray="${percentageAdjusted} ${circumference}">
    <animate attributeName="stroke-dashoffset" from="${percentageAdjusted}" to="0" dur="1s"/>
  </circle>
</g>
  <text text-anchor="middle" alignment-baseline="text-after-edge" x="50" y="50" class="small">${this.text}</text>
</svg>`;
  }
}

customElements.define("wc-half-ring", Donut);
