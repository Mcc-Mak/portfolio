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
            { id: 1, name: "Oli Bob", progress: 12, gender: "male", rating: 1, col: "red", dob: "19/02/1984", car: 1 },
            { id: 2, name: "Mary May", progress: 1, gender: "female", rating: 2, col: "blue", dob: "14/05/1982", car: true },
            { id: 3, name: "Christine Lobowski", progress: 42, gender: "female", rating: 0, col: "green", dob: "22/05/1982", car: "true" },
            { id: 4, name: "Brendon Philips", progress: 100, gender: "male", rating: 1, col: "orange", dob: "01/08/1980" },
            { id: 5, name: "Margret Marmajuke", progress: 16, gender: "female", rating: 5, col: "yellow", dob: "31/01/1999" },
            { id: 6, name: "Frank Harbours", progress: 38, gender: "male", rating: 4, col: "red", dob: "12/05/1966", car: 1 },
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
                { column: "name", dir: "asc" },
            ],
            columnDefaults: {
                tooltip: true,         //show tool tips on cells
            },
            columns: [                 //define the table columns
                {
                    title: "Name",
                    field: "name",
                    editor: "input",
                },
                {
                    title: "Gender",
                    field: "gender",
                    width: 95,
                    editor: "select",
                    editorParams: {
                        values: ["male", "female"]
                    },
                    editable: false,
                },
                {
                    title: "Rating",
                    field: "rating",
                    formatter: "star",
                    hozAlign: "center",
                    width: 100,
                    editor: true,
                    editable: false,
                },
                {
                    title: "Color",
                    field: "col",
                    width: 130,
                    editor: "input",
                    editable: false,
                },
                {
                    title: "Date Of Birth",
                    field: "dob",
                    width: 130,
                    sorter: "date",
                    hozAlign: "center",
                    editable: false,
                },
                {
                    title: "Driver",
                    field: "car",
                    width: 90,
                    hozAlign: "center",
                    formatter: "tickCross",
                    sorter: "boolean",
                    editor: true,
                    editable: false,
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

<body style="background-image: url('/qr-code-project/statics/img/paper_texture_1.JPG'),url('/qr-code-project/statics/img/paper_texture_1.JPG');">
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center p-3">
            <i class="fa fa-table" aria-hidden="true"> Sample Table</i>
        </div>
        <div class="d-flex justify-content-center p-3">
            <div id="table-display"></div>
            <input value="" hidden />
        </div>
    </div>
</body>