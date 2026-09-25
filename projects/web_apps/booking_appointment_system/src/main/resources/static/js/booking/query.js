/**
[Editor(cell)]          http://tabulator.info/docs/5.1/edit#edit-builtin
[Filter(headerColumn)]  http://tabulator.info/docs/5.1/filter#func-builtin
*/

const url = {
    "data": '/api/booking/query-data',
    "nameEngOrg": '/api/booking/getDataList?attr=org',
    "nameEngRoom": '/api/booking/getDataList?attr=room',
    "nameEngUser": '/api/booking/getDataList?attr=user',
    "dateStart": '/api/booking/getDataList?attr=dateStart',
    "timeStart": '/api/booking/getDataList?attr=timeStart',
    "dateEnd": '/api/booking/getDataList?attr=dateEnd',
    "timeEnd": '/api/booking/getDataList?attr=timeEnd',
    "updatedDatetime": '/api/booking/getDataList?attr=updatedDatetime',
    "updatedBy": '/api/booking/getDataList?attr=updatedBy',
};

async function syncLoad(url) {
    const response = await fetch(url);
    const dataList = await response.json();
    return dataList;
}

const request = async () => {

    const dataListOrg = await syncLoad(url.nameEngOrg);
    const dataListRoom = await syncLoad(url.nameEngRoom);
    const dataListUser = await syncLoad(url.nameEngUser);
    const dataListDateStart = await syncLoad(url.dateStart);
    const dataListTimeStart = await syncLoad(url.timeStart);
    const dataListDateEnd = await syncLoad(url.dateEnd);
    const dataListTimeEnd = await syncLoad(url.timeEnd);
    const dataListUpdatedDatetime = await syncLoad(url.updatedDatetime);
    const dataListUpdatedBy = await syncLoad(url.updatedBy);

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
                "title": "上一次更新",
                columns: [
	            {
                        title: "負責人", field: "updatedBy", hozAlign: "center", width: 150, headerHozAlign: "center",
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedBy },
                    },
                    {
                        title: "時間", field: "updatedDatetime", formatter: "datetime", hozAlign: "center", width: 250, headerHozAlign: "center",
                        formatterParams: {
                            inputFormat: "yyyy-MM-dd HH:mm:ss",
                            outputFormat: "yyyy-MM-dd HH:mm:ss",
                            invalidPlaceholder: "(invalid date)",
                        },
                        headerFilter: "select", headerFilterParams: { values: dataListUpdatedDatetime },
                    },
                ],
                headerHozAlign: "center",
            },
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
                title: "申請人", field: "nameEngUser", hozAlign: "center", headerHozAlign: "center", width: 130,
                headerFilter: "select", headerFilterParams: { values: dataListUser },
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

    $('#export-csv').on('click', function() {
        let now = new Date();
        let nowObject = {
            year: now.getFullYear(),
            month: ("0" + (now.getMonth()+1)).slice(-2),
            day: ("0" + now.getDate()).slice(-2),
        };

        table.download(
            "csv",
            `${nowObject.year}.${nowObject.month}.${nowObject.day}_BAS_BookingQuery.csv`,
            {delimiter: ","}
        );
    });
}

request();
