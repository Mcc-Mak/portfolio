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

    async function deleteUser(data) {
                let userNameEng = $('input[name="userNameEng"]')[0].getAttribute('value');

                // [Confirmation]
                const conf = await Swal.fire({
                    html: `<h4>Confirmation</h4><br><p><strong>Are you proceeding to delete this user?</strong><br><h3>刪除用戶</h3><table class="table"><thead><tr><th scope="col">身份</th><th scope="col">用戶名</th><th scope="col">稱謂</th></tr></thead><tbody><tr><th scope="row">${roleMapAll[data.role]}</th><td>${data.username}</td><td>${data.nameEng}</td></tr></tbody></table></p><hr><p>Copyright &copy; 2022</p>`,
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    allowOutsideClick: false
                });
                let decision = conf.value;
                if (!decision) {
                    return;
                }

                // call API
                let response = await $.ajax({
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    cache: false,
                    url: "/api/user/deleteUser",
                    data: JSON.stringify(data),
                });

                // [Notification]
                if (response == 1) {
                    await Swal.fire({
                        icon: 'success',
                        html: '<h4>Notification</h4><br><p><strong>User deleted successfully!</strong></p><br><hr>Copyright &copy; 2022',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    });
                } else {
                    await Swal.fire({
                        icon: 'warning',
                        html: '<h4>Warning</h4><br><p><strong>Failed to delete the user. Please try again.</strong></p><br><hr>Copyright &copy; 2022',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    });
                }

                // [Refresh]
                $('#refresh').click();
    }

    const url = {
        "data": '/api/user/query-data?usage=delete',

        "username": '/getDataList?usage=delete&attr=username',
        "role": '/getDataList?usage=delete&attr=role',
        "nameEng": '/getDataList?usage=delete&attr=nameEng',
        "isEnable": '/getDataList?usage=delete&attr=isEnable',
        "updatedBy": '/getDataList?usage=delete&attr=updatedBy',
        "updatedDate": '/getDataList?usage=delete&attr=updatedDate',
        "updatedTime": '/getDataList?usage=delete&attr=updatedTime'
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
                title: "#ID", field: "userId", visible: false,
            },
            {
                title: "身份", field: "role", hozAlign: "center", headerHozAlign: "center", width: 180,
                formatter: function (cell) {
                    return `<pre>${roleMapAll[cell.getValue()]}</pre>`;
                },
                headerFilter: "select", headerFilterParams: { values: dataListRole },
            },
            {
                title: "有效", field: "isEnabled", hozAlign: "center", headerHozAlign: "center", width: 80,
                headerFilter: "select", headerFilterParams: { values: dataListIsEnable }, formatter:"tickCross"
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
            {
                title: "行動", field: "username", hozAlign: "center", headerHozAlign: "center", width: 80,
                formatter: function () {
                    return '<img src="/image/BIN.PNG" width="35px" height="35px" class="deleteUser"/>';
                },
                cellClick: function (e, cell) {
                    let data = cell.getRow().getData();

                    const req = async () => { await deleteUser(data); }
                    req();
                }
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

    $('#refresh').on('click', function () {
        table.setData(url.data);
    });

    $('#clear-all').on('click', function () {
        table.clearFilter(true);
        table.setData(url.data);
    });

}

request();
