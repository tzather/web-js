import { CardComponent } from "./index.comp.js";

describe("text", () => {
  let comp;
  beforeEach(() => {
    comp = document.createElement("wc-card");
  });

  it("empty", () => {
    expect(comp.html).toBe(`<header></header><section></section>`);
  });

  it("set header", () => {
    comp.setAttribute("header", "my card header");
    expect(comp.html).toBe(`<header>my card header</header><section></section>`);
  });

  it("set inner html", () => {
    comp.innerHTML = "my Inner content";
    expect(comp.html).toBe(`<header></header><section>my Inner content</section>`);
  });
});
