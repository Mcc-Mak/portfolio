const tabledata = [
    {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
    {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
    {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
    {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
    {id:7, name:"", progress:0, gender:"", rating:0, col:"", dob:"", car:0},
    {id:8, name:"", progress:0, gender:"", rating:0, col:"", dob:"", car:0},
    {id:9, name:"", progress:0, gender:"", rating:0, col:"", dob:"", car:0},
    {id:10, name:"", progress:0, gender:"", rating:0, col:"", dob:"", car:0},
];

const table = new Tabulator("#example-table", {
    data: tabledata,
    height: "650px",
    layout: "fitDataTable",
    responsiveLayout: "hide",
    tooltips: true,
    addRowPos: "top",
    history: true,
    pagination: "local",
    paginationSize: 10,
    paginationCounter: "rows",
    movableColumns: false,
    resizableRows: false,
    virtualDomBuffer: 100,
    initialSort: [
        {column: "name", dir: "desc"},
    ],
    columns:[
        {title:"Name", field:"name", editor:"input"},
        {title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true, formatterParams:{min:0, max:100, color:["green", "orange", "red"], legendColor:"#000000", legendAlign:"center"}},
        {title:"Gender", field:"gender", editor:"select", editorParams:{values:["male", "female"]}},
        {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", editor:true},
        {title:"Color", field:"col", editor:"input"},
        {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        {title:"Driver", field:"car",  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    ],
    rowFormatter: function(row) {
        const data = row.getData();
        row.getElement().style.height = "60px";
        row.getElement().style.fontSize = "20px";
        row.getElement().style.fontFamily = "cursive";
    },
});
