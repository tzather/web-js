import { TextComponent } from "./index.comp.js";

describe("text", () => {
  let comp;
  beforeEach(() => {
    comp = document.createElement("wc-text");
  });

  it("empty", () => {
    expect(comp.html).toBe(`<input type="text">`);
  });

  it("with label", () => {
    comp.setAttribute("label", "First Name");
    expect(comp.html).toBe(`<label>First Name</label><input type="text">`);
  });

  it("with value", () => {
    comp.setAttribute("value", "Ahmed");
    expect(comp.html).toBe(`<input type="text" value="Ahmed">`);
  });
});
