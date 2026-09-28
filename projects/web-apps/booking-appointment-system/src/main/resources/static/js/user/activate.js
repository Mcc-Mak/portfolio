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

    async function checkDelta(data) {
        // call API
        let response = await $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            url: "/api/user/checkDelta",
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
            url: "/api/user/activateUser",
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

    const url = {
        "data": '/api/user/query-data?usage=activate',

        "username": '/getDataList?usage=activate&attr=username',
        "role": '/getDataList?usage=activate&attr=role',
        "nameEng": '/getDataList?usage=activate&attr=nameEng',
        "isEnable": '/getDataList?usage=activate&attr=isEnable',
        "updatedBy": '/getDataList?usage=activate&attr=updatedBy',
        "updatedDate": '/getDataList?usage=activate&attr=updatedDate',
        "updatedTime": '/getDataList?usage=activate&attr=updatedTime',

        "roleAll": '/getDataList?usage=activate&attr=roleAll',
    };

    async function syncLoad(url) {
        const response = await fetch(url);
        const dataList = await response.json();
        return dataList;
    }

    const dataListUsername = await syncLoad(url.username);
    const dataListRole = await syncLoad(url.role);
    const dataListNameEng = await syncLoad(url.nameEng);
    const dataListIsEnable = await syncLoad(url.isEnable);
    const dataListUpdatedBy = await syncLoad(url.updatedBy);
    const dataListUpdatedDate = await syncLoad(url.updatedDate);
    const dataListUpdatedTime = await syncLoad(url.updatedTime);

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
            { column: "username", dir: "asc" },
            { column: "role", dir: "asc" },
        ],
        columns: [
            {
                title: "#ID", field: "id", visible: false,
            },
            {
                title: "身份", field: "role", hozAlign: "center", headerHozAlign: "center", width: 180,
                formatter: function (cell) {
                    return `<pre>${roleMapAll[cell.getValue()]}</pre>`;
                },
                headerFilter: "select", headerFilterParams: { values: dataListRole },
                editor: "select", editorParams: { values: roleMapAll },
            },
            {
                title: "有效", field: "isEnable", hozAlign: "center", headerHozAlign: "center", width: 80,
                headerFilter: "select", headerFilterParams: { values: dataListIsEnable }, formatter: "tickCross",
                editor: "select", editorParams: { values: isEnableMapAll },
            },
            {
                title: "用戶名", field: "username", hozAlign: "center", headerHozAlign: "center", width: 200,
                headerFilter: "select", headerFilterParams: { values: dataListUsername },
            },
            {
                title: "稱謂", field: "nameEng", hozAlign: "center", headerHozAlign: "center", width: 200,
                headerFilter: "select", headerFilterParams: { values: dataListNameEng },
            },
            {
                "title": "更新資料",
                columns: [
                    {
                        title: "日期", field: "updatedDatetime", formatter: "datetime", hozAlign: "center", width: 150, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm:ss",
                            outputFormat: "yyyy-MM-dd",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedDate },
                    },
                    {
                        title: "時間", field: "updatedDatetime2", formatter: "datetime", hozAlign: "center", width: 100, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm:ss",
                            outputFormat: "HH:mm:ss",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedTime },
                    },
                    {
                        title: "用戶", field: "updatedBy", hozAlign: "center", headerHozAlign: "center", width: 200,
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedBy },
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
                // console.log('[Parameters] Cancelled.');
            }
        }
        req();
    });

}

request();
