// [Relative] Best practice
/**
        [Editor(cell)]          http://tabulator.info/docs/5.1/edit#edit-builtin
        [Filter(headerColumn)]  http://tabulator.info/docs/5.1/filter#func-builtin
**/

const request = async () => {

    const token = $('meta[name="_csrf"]').attr('content');
    const header = $('meta[name="_csrf_header"]').attr('content');
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });

    async function globalConstants(URL) {
        let response = await $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: URL,
        });
        return response;
    }
    const isEnableMapAll = await globalConstants(url = "/api/user/getBackendMap?attr=isEnable");
    const roleMapAll = await globalConstants(url = "/api/user/getBackendMap?attr=role");

    const COLOR_CODE = {
        "DEFAULT": "",
        "CHECK": "#ffff00",
        "UPDATE": "#42bff5",
    };

    function changeColorById(ids, deltaData, colorCode) {
        let cells = $('[tabulator-field="id"]');
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.parentElement.style.backgroundColor = COLOR_CODE.DEFAULT;
            if (ids.includes(cell.innerText)) {
                cell.parentElement.style.backgroundColor = colorCode;
            }
        }
    }

    const url = {
        "data": '/api/report/query-data?usage=auditLog',
    };

    //initialize table
    let table = new Tabulator("#example-table", {
        ajaxURL: url.data, //ajax URL
        progressiveLoadScrollMargin: 300, //trigger next ajax load when scroll bar is 300px or less from the bottom of the table.
        height: "650px",
        layout: "fitDataTable",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 50,         //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        selectable: false,
        movableColumns: false,      //allow column order to be changed
        resizableRows: false,       //allow row order to be changed
        initialSort: [             //set the initial sort order of the data
            {column:"operatedDatetime", dir:"desc"},
        ],
        columns: [
            {
                title: "#ID", field: "id", visible: false,
            },
            {
                title: "Action", field: "actName", hozAlign: "center", headerHozAlign: "center", width: 180,
            },
            {
                title: "Category", field: "catName", hozAlign: "center", headerHozAlign: "center", width: 180,
            },
            {
                "title": "Operation",
                columns: [
                    {
                        title: "Operation time", field: "operatedDatetime", formatter: "datetime", hozAlign: "center", width: 250, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm:ss",
                            outputFormat: "yyyy-MM-dd HH:mm:ss",
                            invalidPlaceholder: "(invalid date)",
                        },
                    },
                    {
                        title: "Operated by", field: "operatedBy", hozAlign: "center", width: 200, headerHozAlign: "center",
                    },
                ],
                headerHozAlign: "center",
            },
        ],
        rowFormatter: function (row) {
            row.getElement().style.height = "60px";
            row.getElement().style.fontSize = "20px";
            row.getElement().style.fontFamily = "cursive";
            row.getElement().style.marginTop = "5px";
            row.getElement().style.marginBottom = "5px";
        },
    });

    $('#clear-all').on('click', function () {
        table.setData(url.data);
        table.clearFilter(true);
    });

    $('#refresh').on('click', function () {
        table.setData(url.data);
    });

}

request();
