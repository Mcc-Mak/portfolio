/**
[Editor(cell)]          http://tabulator.info/docs/5.1/edit#edit-builtin
[Filter(headerColumn)]  http://tabulator.info/docs/5.1/filter#func-builtin
*/

const request = async () => {

    async function dropBooking(data) {
	let userNameEng = $('input[name="userNameEng"]')[0].getAttribute('value');

	// [Confirmation]
        const conf = await Swal.fire({
            html: `<h4>Confirmation</h4><br><p><strong>Are you proceeding to drop booking appointment for the followings?</strong><br><h3>取消約見</h3><table class="table"><thead><tr><th scope="col">組織</th><th scope="col">房間</th><th scope="col">預約 (開始)</th><th scope="col">預約 (結束)</th><th scope="col">預約者</th></tr></thead><tbody><tr><th scope="row">${data.nameEngOrg}</th><td>${data.nameEngRoom}</td><td>${data.timeslotStart}</td><td>${data.timeslotEnd}</td><td>${userNameEng}</td></tr></tbody></table></p><hr><p>Copyright &copy; 2022</p>`,
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
            url: "/api/booking/dropBooking",
            data: JSON.stringify(data),
        });

	// [Refresh]
	$('#refresh').click();

	// [Notification]
        if (response == 1) {
            await Swal.fire({
                icon: 'success',
                html: '<h4>Notification</h4><br><p><strong>Booking appointment dropped successfully!</strong></p><br><hr>Copyright &copy; 2022',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        } else {
            await Swal.fire({
                icon: 'warning',
                html: '<h4>Warning</h4><br><p><strong>Failed to drop the booking appointment. Please try again.</strong></p><br><hr>Copyright &copy; 2022',
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
        "data": '/api/booking/query-data?usage=drop',
        "nameEngOrg": '/api/booking/getDataList?attr=org&usage=drop',
        "nameEngRoom": '/api/booking/getDataList?attr=room&usage=drop',
        "nameEngUser": '/api/booking/getDataList?attr=user&usage=drop',
        "dateStart": '/api/booking/getDataList?attr=dateStart&usage=drop',
        "timeStart": '/api/booking/getDataList?attr=timeStart&usage=drop',
        "dateEnd": '/api/booking/getDataList?attr=dateEnd&usage=drop',
        "timeEnd": '/api/booking/getDataList?attr=timeEnd&usage=drop',
    };

    async function syncLoad(url) {
        const response = await fetch(url);
        const dataList = await response.json();
        return dataList;
    }

    const dataListOrg = await syncLoad(url.nameEngOrg);
    const dataListRoom = await syncLoad(url.nameEngRoom);
    const dataListUser = await syncLoad(url.nameEngUser);
    const dataListDateStart = await syncLoad(url.dateStart);
    const dataListTimeStart = await syncLoad(url.timeStart);
    const dataListDateEnd = await syncLoad(url.dateEnd);
    const dataListTimeEnd = await syncLoad(url.timeEnd);

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
            { column: "timeslotStart", dir: "asc" },
        ],
        columns: [
            {
                title: "組織", field: "nameEngOrg", hozAlign: "center", headerHozAlign: "center", width: 100,
                headerFilter: "select", headerFilterParams: { values: dataListOrg },
            },
            {
                title: "房間", field: "nameEngRoom", hozAlign: "center", headerHozAlign: "center", width: 100,
                headerFilter: "select", headerFilterParams: { values: dataListRoom },
            },
            {
                "title": "預約 (開始)",
                columns: [
                    {
                        title: "日期", field: "timeslotStart", formatter: "datetime", hozAlign: "center", width: 150, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm",
                            outputFormat: "yyyy-MM-dd",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListDateStart },
                    },
                    {
                        title: "時間", field: "timeslotStart2", formatter: "datetime", hozAlign: "center", width: 100, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm",
                            outputFormat: "HH:mm",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListTimeStart },
                    },
                ],
                headerHozAlign: "center",
            },
            {
                "title": "預約 (結束)",
                columns: [
                    {
                        title: "日期", field: "timeslotEnd", formatter: "datetime", hozAlign: "center", width: 150, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm",
                            outputFormat: "yyyy-MM-dd",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListDateEnd },
                    },
                    {
                        title: "時間", field: "timeslotEnd2", formatter: "datetime", hozAlign: "center", width: 100, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm",
                            outputFormat: "HH:mm",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListTimeEnd },
                    },
                ],
                headerHozAlign: "center",
            },
            {
                title: "預約者", field: "nameEngUser", hozAlign: "center", headerHozAlign: "center", width: 200,
            },
            {
                title: "行動", field: "nameEngUser", hozAlign: "center", headerHozAlign: "center", width: 80,
                formatter: function (cell) {
                    let data = cell.getRow().getData();
                    if (data.nameEngUser == "") {
                        return '';
                    } else {
                        return '<img src="/image/BIN.PNG" width="35px" height="35px" class="addBooking"/>';
                    }
                },
                cellClick: function (e, cell) {
                    let data = cell.getRow().getData();
                    if (data.nameEngUser == "") {
                        // [Notification]
                        Swal.fire({
                            icon: 'warning',
                            html: '<h4>Warning</h4><br><p><strong>No appointment made on this timeslot yet...</strong></p><br><hr>Copyright &copy; 2022',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false
                        });
                    } else {
                        const req = async () => { await dropBooking(data); }
                        req();
                    }
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

    $('#clear-all').on('click', function () {
        table.setData(url.data);
        table.clearFilter(true);
    });

    $('#refresh').on('click', function () {
        table.setData(url.data);
    });

}

request();
