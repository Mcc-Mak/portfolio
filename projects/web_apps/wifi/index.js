const invisibleColumnCore = [
  "OrganisationCode",
  "LocationID",
  "DigitalCertificate",
  "Latitude",
  "Longitude",
  "MoreInformationEN",
  "MoreInformationTC",
  "MoreInformationLinkEN",
  "MoreInformationLinkTC",
  "RemarksEN",
  "RemarksTC",
];

const invisibleColumnMapper = {
  wifi: {
    fixed: [],
    non_fixed: [
      "AreaEN",
      "AreaTC",
      "DistrictEN",
      "DistrictTC",
      "AddressEN",
      "AddressTC",
      "Latitude",
      "Longitude",
      "VenueTypeEN",
      "VenueTypeTC",
    ],
  },
};

function initialize(table = null, category = "") {
  if (category === "fixed") {
    table
      .getColumns()
      .filter((column) => {
        return !invisibleColumnCore
          .concat(invisibleColumnMapper.wifi[`${category}`])
          .includes(column._column.definition.field);
      })
      .forEach((column) => {
        const def = column._column.definition;
        $("#filter-field").append(`<option value="${def.field}">${def.title}</option>`);
      });
  }
}

function refreshHeaderFilter(table = null, category = "") {
  if (category === "fixed") {
    const columnsWithFilter = [
      "SSID",
      "VenueTypeEN",
      "VenueTypeTC",
      "LocationNameEN",
      "LocationNameTC",
      "AreaEN",
      "AreaTC",
      "DistrictEN",
      "DistrictTC",
    ];
    const newColumns = table.getColumns().map((column) => {
      if (columnsWithFilter.includes(column._column.definition.field)) {
        column._column.definition.headerFilter = "select";
        column._column.definition.headerFilterFunc = "in";
        column._column.definition.headerFilterParams = {
          values: table
            .getData("active")
            .map((row) => row[column._column.definition.field])
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort(),
          multiselect: true,
        };
        column._column.definition.headerFilterPlaceholder = column._column.definition.field.endsWith("EN") ? "Select：" : "請選擇：";
      }
      return column._column.definition;
    });
    table.setColumns(newColumns);
  }

  invisibleColumnCore
    .concat(invisibleColumnMapper.wifi[`${category}`])
    .forEach((columnName) => {
      table.hideColumn(columnName);
    });
}

$(document).ready(async function () {
  const api = {
    wifi: {
      fixed: `./fixed-wi-fi-hk-locations.json`,
      non_fixed: `./non-fixed-wi-fi-hk-locations.json`,
    },
  };
  const MAX_NO_OF_WIFI_FIXED_SELECTION = 5;

  const map = L.map("map").setView([22.3193, 114.1694], 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; 2023-JUN",
  }).addTo(map);

  ["fixed", "non_fixed"].forEach(async (category) => {
    let table = new Tabulator(`#wifi_${category}_table`, {
      ajaxURL: `${api.wifi[category]}`,
      ajaxResponse: function (url, params, response) {
        const data = response.map((row) => {
          const filteredRow = Object.fromEntries(
            Object.entries(row).filter(([key]) => {
              return !key.includes("SC");
            })
          );
          return filteredRow;
        });
        return data;
      },
      height: category === "fixed" ? 480 : null,
      pagination: "local",
      paginationSize: 25,
      paginationCounter: "rows",
      selectable: category === "fixed" ? MAX_NO_OF_WIFI_FIXED_SELECTION : false,
      columns: [
        {
          title: "Latitude",
          field: "Latitude",
        },
        {
          title: "Longitude",
          field: "Longitude",
        },
        {
          title: "OrganisationCode",
          field: "OrganisationCode",
        },
        {
          title: "LocationID",
          field: "LocationID",
        },
        {
          title: "SSID",
          field: "SSID",
        },
        {
          title: "SupportHotline",
          field: "SupportHotline",
        },
        {
          title: "VenueTypeEN",
          field: "VenueTypeEN",
        },
        {
          title: "VenueTypeTC",
          field: "VenueTypeTC",
        },
        {
          title: "LocationNameEN",
          field: "LocationNameEN",
        },
        {
          title: "LocationNameTC",
          field: "LocationNameTC",
        },
        {
          title: "AreaEN",
          field: "AreaEN",
        },
        {
          title: "AreaTC",
          field: "AreaTC",
        },
        {
          title: "DistrictEN",
          field: "DistrictEN",
        },
        {
          title: "DistrictTC",
          field: "DistrictTC",
        },
        {
          title: "AddressEN",
          field: "AddressEN",
        },
        {
          title: "AddressTC",
          field: "AddressTC",
        },
        {
          title: "NumberOfHotspots",
          field: "NumberOfHotspots",
        },
        {
          title: "DigitalCertificate",
          field: "DigitalCertificate",
        },
        {
          title: "SupportEmail",
          field: "SupportEmail",
        },
        {
          title: "MoreInformationEN",
          field: "MoreInformationEN",
        },
        {
          title: "MoreInformationTC",
          field: "MoreInformationTC",
        },
        {
          title: "MoreInformationLinkEN",
          field: "MoreInformationLinkEN",
        },
        {
          title: "MoreInformationLinkTC",
          field: "MoreInformationLinkTC",
        },
        {
          title: "RemarksEN",
          field: "RemarksEN",
        },
        {
          title: "RemarksTC",
          field: "RemarksTC",
        },
      ],
    });

    table.on("tableBuilt", function () {
      $(`#wifi_${category}_title`).html(
        `WiFi (${category === "non_fixed" ? "Non-" : ""}Fixed)`
      );

      initialize(table, category);

      refreshHeaderFilter(table, category);
    });

    table.on("renderComplete", function () {
      refreshHeaderFilter(table, category);
    });

    if (category === "fixed") {
      table.setFilter("LocationNameTC", "in", ["香港教育大學"]);

      let markers = [];
      $("#filter-clear").on("click", function () {
        table.clearFilter(true);
        table.getSelectedRows().forEach((row) => {
          const cell = row._row.getCells()[0].getElement();
          cell.click();
        });
        refreshHeaderFilter(table, category);
      });
      $("#filter-add").on("click", function () {
        const filterData = {
          field: $("#filter-field").val(),
          type: $("#filter-type").val(),
          value: $("#filter-value").val(),
        };
        table.setFilter(filterData.field, filterData.type, filterData.value);
      });
      table.on("cellClick", function (e, cell) {
        const rowData = cell.getData();
        const latLng = [
          parseFloat(rowData.Latitude),
          parseFloat(rowData.Longitude),
        ];
        const matchedMarkers = markers.filter((marker) => {
          const markerLatLng = marker.getLatLng();
          return [markerLatLng.lat, markerLatLng.lng].toString() === latLng.toString();
        });
        if (matchedMarkers.length > 0) {
          matchedMarkers.forEach((marker) => {
            map.removeLayer(marker);
            const markerLatLng = marker.getLatLng();
            markers = markers.filter((m) => {
              const mLatLng = m.getLatLng();
              return (
                [markerLatLng.lat, markerLatLng.lng].toString() !==
                [mLatLng.lat, mLatLng.lng].toString()
              );
            });
          });
        } else {
          const marker = L.marker(latLng);
          marker.addTo(map);
          markers.push(marker);
        }
        if (markers.length > MAX_NO_OF_WIFI_FIXED_SELECTION) {
          map.removeLayer(markers.shift());
        }
        map.setView(latLng, 18);

        map.invalidateSize();
      });
    }
  });

  $("#map_on_off_button").on("click", function () {
    if ($("#map").is(":visible")) {
      $("#map").hide();
      $(this)
        .html("Show")
        .removeClass("btn-secondary")
        .addClass("btn-success");
    } else {
      $("#map").show();
      $(this)
        .html("Hide")
        .removeClass("btn-success")
        .addClass("btn-secondary");
    }
    map.invalidateSize();
  });

  const response = await $.ajax("./modified_datetime.log", {
    dataType: "text",
  });
  $("#modified_datetime").html(`${response.trim()}`);
});
