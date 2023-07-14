function tooltip(inp){
    inp.setAttribute("tabindex", "-1");

    inp.addEventListener("click", function(e) {
        let tooltipWidth = inp.getElementsByClassName("tooltiptext")[0].getBoundingClientRect().width;
        inp.getElementsByClassName("tooltiptext")[0].setAttribute("style", `visibility:visible;top:${inp.getBoundingClientRect().bottom+10}px;width:${inp.getBoundingClientRect().width}px;left:${inp.getBoundingClientRect().right-tooltipWidth}`);
    });

    inp.addEventListener("blur", function(e) {
        inp.getElementsByClassName("tooltiptext")[0].setAttribute("style", "");
    });
}

let inputList = document.getElementsByClassName("tooltip");
for(let i = 0; i<inputList.length;i++){
  tooltip(inputList[i]);
}
