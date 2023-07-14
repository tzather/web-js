class D3BarLog extends HTMLElement {
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
      { x: "Vue", y: 1663, fill: "red" },
      { x: "React", y: 1593 },
      { x: "Angular", y: 62 },
      { x: "Backbone", y: 27 },
      { x: "Ember", y: 1071 },
    ];
  }
  get data2() {
    return [
      { x: "Chrome", y: 65 },
      { x: "Firefox", y: 15 },
      { x: "Edge", y: 45 },
    ];
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const svgWidth = parseInt(this.width);
    const svgHeight = parseInt(this.height);
    const margin = {
      top: svgWidth / 15,
      right: svgWidth / 50,
      bottom: svgWidth / 7,
      left: svgWidth / 10,
    };
    const gWidth = svgWidth - margin.left - margin.right;
    const gHeight = svgHeight - margin.top - margin.bottom;
    const maxY = Math.max(...this.data.map(n => n.y));

    const svg = d3
      .select(this)
      .append("svg")
      .style("width", this.width)
      .style("border", "1px solid red")
      .attr("viewBox", `0 0 ${gWidth + margin.left + margin.right} ${gHeight + margin.top + margin.bottom}`);
    const gRect = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    // chart title
    svg
      .append("text")
      .text(this.header)
      .attr("fill", "blue")
      .attr("font-size", svgHeight / 20)
      .attr("text-anchor", "middle")
      .attr("x", "50%")
      .attr("y", svgHeight / 20);

    // bars
    const x = d3
      .scaleBand()
      .domain(this.data.map(d => d.x))
      .range([0, gWidth])
      .paddingInner(0.2);
    const y = d3.scaleLog().domain([10, maxY]).range([gHeight, 0]);

    gRect
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("fill", d => d.fill ?? "blue")
      .attr("x", d => x(d.x))
      .attr("y", gHeight)
      .on("mouseover", (e, d) => tooltip.text(this.numberWithCommas(d.y)).transition().duration(200).style("opacity", 1))
      .on("mouseout", (e, d) => tooltip.style("opacity", 0))
      .on("mousemove", (e, d) => tooltip.style("left", d3.pointer(e)[0] + "px").style("top", d3.pointer(e)[1] + "px"))
      .attr("width", x.bandwidth)
      .transition()
      .duration(1000)
      .attr("height", d => gHeight - y(d.y))
      .attr("y", d => y(d.y));

    // x-axis
    const xAxis = d3.axisBottom(x).tickSize(0); // remove the tick lines
    const gxAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${gHeight + margin.top})`)
      .call(xAxis);
    gxAxis
      .selectAll("path")
      .style("stroke", "silver")
      .style("stroke-width", svgHeight / 200);
    gxAxis
      .selectAll("text")
      .attr("x", "-1")
      .attr("y", "1")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end")
      .attr("font-size", svgHeight / 30);

    // y-axis
    const yAxis = d3
      .axisLeft(y)
      // .ticks(3)
      .tickValues([10, 100, 1000, 10000])
      // .tickSize(2); // remove the tick lines
      .tickFormat(x => {
        if (maxY < 10000) return Math.round(x);
        return `${Math.round(x / 1000)}k`;
      });
    const gyAxis = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`).call(yAxis);
    gyAxis
      .selectAll("path")
      .style("stroke", "silver") // set line color
      .style("stroke-width", svgWidth / 200);
    gyAxis
      .selectAll("text")
      .attr("x", -svgWidth / 100)
      .attr("y", "0")
      .attr("text-anchor", "end")
      .attr("font-size", svgHeight / 30);
  }
}

customElements.define("d3-bar-log", D3BarLog);
