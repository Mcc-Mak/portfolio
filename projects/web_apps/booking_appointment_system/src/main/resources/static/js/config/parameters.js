/**
        [Editor(cell)]          http://tabulator.info/docs/5.1/edit#edit-builtin
        [Filter(headerColumn)]  http://tabulator.info/docs/5.1/filter#func-builtin
*/

const request = async () => {

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

    async function checkDelta(data) {
        // call API
        let response = await $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            url: "/api/config/checkDelta",
            data: JSON.stringify(data),
        });
        let ids = response.map(row => row.id);

        let dts = table.getData();
        let deltaData = [];
        for(let i=0; i<dts.length; i++) {
                if(ids.includes(dts[i].id)) { deltaData.push(dts[i]); }
        }
        changeColorById(ids, deltaData, colorCode=COLOR_CODE.CHECK);

        return deltaData;
    }

    async function updateDelta(data) {
        // call API
        let response = await $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            url: "/api/config/updateDelta",
            data: JSON.stringify(data),
        });

	// fetch latest data
        await table.setData(url.data);

	// change color
        let ids = response.map(row => row.id);
	changeColorById(ids, [], colorCode=COLOR_CODE.UPDATE);

        // [Notification]
        if (ids.length > 0) {
            await Swal.fire({
                icon: 'success',
                html: '<h4>Notification</h4><br><p><strong>Configuration changed successfully!</strong></p><br><hr>Copyright &copy; 2022',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        } else {
            await Swal.fire({
                icon: 'warning',
                html: '<h4>Warning</h4><br><p><strong>Failed to change the configuration. Please try again.</strong></p><br><hr>Copyright &copy; 2022',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        }
    }

    const token = $('meta[name="_csrf"]').attr('content');
    const header = $('meta[name="_csrf_header"]').attr('content');
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });

    const url = {
        "data": '/api/config/parameters-data',
        "name": '/api/config/getDataList?attr=name',
        "dataLabel": '/api/config/getDataList?attr=dataLabel',
        "updatedBy": '/api/config/getDataList?attr=updatedBy',
        "updatedDatetime": '/api/config/getDataList?attr=updatedDatetime',
    };

    async function syncLoad(url) {
        const response = await fetch(url);
        const dataList = await response.json();
        return dataList;
    }

    const dataListName = await syncLoad(url.name);
    const dataListDataLabel = await syncLoad(url.dataLabel);
    const dataListUpdatedBy = await syncLoad(url.updatedBy);
    const dataListUpdatedDatetime = await syncLoad(url.updatedDatetime);

    //initialize table
    let table = new Tabulator("#example-table", {
        ajaxURL: url.data,                  //ajax URL
        progressiveLoadScrollMargin: 300,   //trigger next ajax load when scroll bar is 300px or less from the bottom of the table.
        height: "650px",
        layout: "fitDataTable",             //fit columns to width of table
        responsiveLayout: "hide",           //hide columns that dont fit on the table
        addRowPos: "top",                   //when adding a new row, add it to the top of the table
        history: true,                      //allow undo and redo actions on the table
        pagination: "local",                //paginate the data
        paginationSize: 50,                 //allow 7 rows per page of data
        paginationCounter: "rows",          //display count of paginated rows in footer
        selectable: false,
        movableColumns: false,              //allow column order to be changed
        resizableRows: false,               //allow row order to be changed
        initialSort: [                      //set the initial sort order of the data
            { column: "id", dir: "asc" },
        ],
        columns: [
            {
                title: "#ID", field: "id", visible: false,
            },
            {
                title: "orgId", field: "orgId", visible: false,
            },
            {
                title: "roomId", field: "roomId", visible: false,
            },
            {
                title: "tableId", field: "tableId", visible: false,
            },
            {
                "title": "上一次更新",
                columns: [
                    {
                        title: "負責人", field: "updatedBy", hozAlign: "center", width: 200, headerHozAlign: "center",
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedBy },
                    },
                    {
                        title: "時間", field: "updatedDatetime", hozAlign: "center", width: 250, headerHozAlign: "center",
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedDatetime },
                    },
                ],
                headerHozAlign: "center",
            },
            {
                title: "表", field: "name", hozAlign: "center", headerHozAlign: "center", width: 300,
                headerFilter: "select", headerFilterParams: { values: dataListName },
            },
            {
                "title": "參數",
                columns: [
                    {
                        title: "標籤", field: "dataLabel", hozAlign: "center", width: 450, headerHozAlign: "center",
                        headerFilter: "select", headerFilterParams: { values: dataListDataLabel },
                    },
                    {
                        title: "數值", field: "dataValue", hozAlign: "center", width: 100, headerHozAlign: "center", editor: "input",
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

    $('#check').on('click', function () {
        const req = async () => {
            let data = table.getData();

            // [Check] Delta
            await checkDelta(data);
        }
        req();
    });

    $('#save').on('click', function () {
        const req = async () => {
            let rawData = table.getData();

            // [Check] Delta
            const deltaData = await checkDelta(rawData);

            // [Confirmation] Save or not?
            const response = await Swal.fire({
                html: '<h4>Confirmation</h4><br><p>Do you want to save the changes?</p><br><hr>Copyright &copy; 2022',
                showCancelButton: true,
                confirmButtonText: 'Save',
            });
            let decision = response.value;
            if (decision) {
                // [Save] Delta
                updateDelta(deltaData);
            } else {
            }
        }
        req();
    });
}

request();
