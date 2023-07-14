class Slider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(name, oldValue, newValue) {
        this.render();
    }

    async render() {
        this.shadowRoot.innerHTML = await (await fetch('/controls/slider.html')).text();

        let dataArray = [
            { color: 'red', percantage: "0" },
            { color: 'yellow', percantage: "20" },
            { color: 'green', percantage: "70" },
            { color: 'blur', percantage: "0100" },
        ];

        let slider = this.shadowRoot.querySelector('.slider');
        dataArray.forEach(item => {
            var sliderItem = document.createElement('div');
            sliderItem.setAttribute("class", "slider-item tooltip");
            sliderItem.setAttribute("style", `background-color:${item.color};left:${item.percantage}%;`);
            sliderItem.innerHTML = '<span class="tooltiptext ">Samual Middle Smith<br /> $45.23</span>';
            slider.appendChild(sliderItem);
        });
    }
}

customElements.define('wc-slider', Slider);
