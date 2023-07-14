const colLength = 50;
const rowLength = 50;

let myTable = document.getElementById("myTable");
for(let y=0; y<colLength; y++) {
    // Add rows
    let row = document.createElement("tr");
    for(let x=0; x<rowLength; x++){
        let cell = document.createElement("td");
        if(x == 0 || y==0){
            cell.innerText= `item ${y} ${x}`;
        }
        else{
            let input = document.createElement("input");
            input.setAttribute("value", `${y}, ${x}`);
            cell.appendChild(input);
        }
        row.appendChild(cell);
    }
    myTable.appendChild(row);
}
