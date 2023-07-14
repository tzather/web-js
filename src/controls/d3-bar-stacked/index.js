class D3BarStacked extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get width() {
    return +this.getAttribute("width");
  }
  get height() {
    return +this.getAttribute("height");
  }
  get header() {
    return "Hello";
  }
  get data() {
    return [
      { x: "Vue", good: 200, warning: 150, bad: 50 },
      { x: "React", good: 10, warning: 20, bad: 30 },
      { x: "Angular", good: 62, warning: 166, bad: 146 },
      { x: "Backbone", good: 27, warning: 133, bad: 163 },
      { x: "Ember", good: 71, warning: 113, bad: 133 },
    ];
  }

  get color() {
    return ["#47C684", "#FFD871", "#FB543F"];
  }

  render() {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(this)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = this.data.map(d => Object.entries(d)[0][1]);

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = Object.keys(this.data[0]).slice(1); // data.columns.slice(1);
    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(this.data);
    let maxY = d3.max(stackedData[stackedData.length - 1], d => d[1]) * 1.1;

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal().domain(subgroups).range(this.color);

    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", d => color(d.key))
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(d => d)
      .join("rect")
      .attr("x", d => x(Object.entries(d.data)[0][1]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());
  }
}

customElements.define("d3-bar-stacked", D3BarStacked);
