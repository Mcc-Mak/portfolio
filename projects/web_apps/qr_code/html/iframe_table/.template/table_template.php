<head>
    <!-- jquery-3.6.3 -->
    <script src="/qr-code-project/statics/lib/jquery-3.6.3.js"></script>
    <!-- bootstrap-5.3.0 -->
    <script src="/qr-code-project/statics/lib/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/qr-code-project/statics/lib/bootstrap.min.css">
    <!-- awesome-6.3.0 -->
    <link href="/qr-code-project/statics/lib/awesome-6.3.0/css/fontawesome.css" rel="stylesheet">
    <link href="/qr-code-project/statics/lib/awesome-6.3.0/css/brands.css" rel="stylesheet">
    <link href="/qr-code-project/statics/lib/awesome-6.3.0/css/solid.css" rel="stylesheet">
    <!-- sweetalert2 -->
    <script src="/qr-code-project/statics/lib/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" href="/qr-code-project/statics/lib/sweetalert2.min.css">
    <!-- tabulator -->
    <link href="/qr-code-project/statics/lib/tabulator/dist/css/tabulator.min.css" rel="stylesheet">
    <script type="text/javascript" src="/qr-code-project/statics/lib/tabulator/dist/js/tabulator.min.js"></script>
</head>

<script type="module" defer>
    async function showNotification(settings) {
        return await Swal.fire(settings);
    }

    $(document).ready(function () {
        const tableData = [
            {
                "sequence": 1,
                "model_no": 1,
                "property_1": "value_1.1",
                "property_2": "value_2.1",
                "property_3": "value_3.1",
                "property_4": "value_4.1",
                "id": 1
            },
            {
                "sequence": 2,
                "model_no": 2,
                "property_1": "value_1.2",
                "property_2": "value_2.2",
                "property_3": "value_3.2",
                "property_4": "value_4.2",
                "id": 2
            },
            {
                "sequence": 3,
                "model_no": 3,
                "property_1": "value_1.3",
                "property_2": "value_2.3",
                "property_3": "value_3.3",
                "property_4": "value_4.3",
                "id": 3
            },
            {
                "sequence": 4,
                "model_no": 4,
                "property_1": "value_1.4",
                "property_2": "value_2.4",
                "property_3": "value_3.4",
                "property_4": "value_4.4",
                "id": 4
            },
            {
                "sequence": 5,
                "model_no": 5,
                "property_1": "value_1.5",
                "property_2": "value_2.5",
                "property_3": "value_3.5",
                "property_4": "value_4.5",
                "id": 5
            },
            {
                "sequence": 6,
                "model_no": 6,
                "property_1": "value_1.6",
                "property_2": "value_2.6",
                "property_3": "value_3.6",
                "property_4": "value_4.6",
                "id": 6
            },
            {
                "sequence": 7,
                "model_no": 7,
                "property_1": "value_1.7",
                "property_2": "value_2.7",
                "property_3": "value_3.7",
                "property_4": "value_4.7",
                "id": 7
            },
            {
                "sequence": 8,
                "model_no": 8,
                "property_1": "value_1.8",
                "property_2": "value_2.8",
                "property_3": "value_3.8",
                "property_4": "value_4.8",
                "id": 8
            },
            {
                "sequence": 9,
                "model_no": 9,
                "property_1": "value_1.9",
                "property_2": "value_2.9",
                "property_3": "value_3.9",
                "property_4": "value_4.9",
                "id": 9
            }
        ];

        let isEditable = [];
        const table = new Tabulator("#table-display", {
            data: tableData,           //load row data from array
            height: 400,
            autoResize: true,
            layout: "fitDataTable",      //fit columns to width of table
            responsiveLayout: "hide",  //hide columns that dont fit on the table
            addRowPos: "top",          //when adding a new row, add it to the top of the table
            history: true,             //allow undo and redo actions on the table
            pagination: "local",       //paginate the data
            paginationSize: 10,         //allow 7 rows per page of data
            paginationCounter: "rows", //display count of paginated rows in footer
            movableColumns: true,      //allow column order to be changed
            initialSort: [
                { column: "id", dir: "asc" },
            ],
            columnDefaults: {
                tooltip: true,         //show tool tips on cells
            },
            columns: [                 //define the table columns
                {
                    title: "",
                    field: "",
                    hozAlign: "center",
                    formatter: function () {
                        return '<input class="form-check-input border-primary" type="checkbox" value="" />';
                    },
                },
                {
                    title: "Sequence",
                    field: "sequence",
                    hozAlign: "center",
                    headerFilter: "input",
                },
                {
                    title: "Model No.",
                    field: "model_no",
                    hozAlign: "center",
                    width: 120,
                    headerFilter: "input",
                },
                {
                    title: "Property_1",
                    field: "property_1",
                    hozAlign: "center",
                    width: 130,
                    headerFilter: "input",
                },
                {
                    title: "Property_2",
                    field: "property_2",
                    hozAlign: "center",
                    width: 130,
                    headerFilter: "input",
                },
                {
                    title: "Property_3",
                    field: "property_3",
                    hozAlign: "center",
                    width: 130,
                    headerFilter: "input",
                },
                {
                    title: "Property_4",
                    field: "property_4",
                    hozAlign: "center",
                    width: 130,
                    headerFilter: "input",
                },
                {
                    title: "Action",
                    columns: [
                        {
                            title: "Edit",
                            field: "",
                            width: 90,
                            hozAlign: "center",
                            formatter: function () {
                                return `<i class="fa-sharp fa-solid fa-pen text-primary"></i>`;
                            },
                            cellClick: async (e, cell) => {
                                const rowData = cell.getData();
                                if (isEditable.includes(rowData.id)) {
                                    isEditable = isEditable.filter(v => v !== rowData.id);
                                } else {
                                    isEditable.push(rowData.id);
                                }
                            },
                        },
                        {
                            title: "Delete",
                            field: "",
                            width: 90,
                            hozAlign: "center",
                            formatter: function () {
                                return `<i class="fa-sharp fa-solid fa-trash text-danger"></i>`;
                            },
                            cellClick: async (e, cell) => {
                                const rowData = cell.getData();
                                cell.getTable().deleteRow(rowData.id);
                            },
                        },
                    ]
                },
            ],
        });
    });
</script>

<style>
    .tabulator-header-filter>input[type="search"] {
        border: groove;
        border-radius: 50px;
    }
</style>

<body
    style="background-image: url('/qr-code-project/statics/img/paper_texture_1.JPG'),url('/qr-code-project/statics/img/paper_texture_1.JPG');">
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center">
            <!-- justify-content-center -->
            <!-- <i class="fa fa-table" aria-hidden="true"> Sample Table</i> -->
            <div class="d-flex flex-row">
                <div class="d-flex align-items-center p-5">
                    <button type="button" class="btn btn-success">New Record</button>
                </div>
                <div class="d-flex align-items-center p-5">
                    <button type="button" class="btn btn-info">Download Code Image</button>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center p-3">
            <div id="table-display"></div>
            <input value="" hidden />
        </div>
    </div>
</body>