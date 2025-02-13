// Initialize OpenLayers map
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }) // Base Map
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 3
    })
});

// Global variables
var ndviLayer, draw, vectorLayer;

// Initialize Date Picker
$(function () {
    $("#date-picker").datepicker({ dateFormat: "yy-mm-dd" });
    $("#date-picker").val("2023-01-01"); // Default date
});

// Function to Update NDVI Layer Based on Selected Date
// Function to Update NDVI Layer
// Function to Update NDVI Layer
function updateNDVILayer() {
    var selectedDate = $("#date-picker").val();

    // SentinelHub NDVI Tile Layer (Use WMS)
    var ndviLayerUrl = "https://services.sentinel-hub.com/ogc/wms/cb62172b-7593-4f8a-9a8e-a3e3359a29cb";

    if (ndviLayer) {
        map.removeLayer(ndviLayer);
    }

    ndviLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: ndviLayerUrl,
            params: {
                LAYERS: "NDVI",
                FORMAT: "image/png",
                TIME: selectedDate
            }
        })
    });

    map.addLayer(ndviLayer);
}


// Function to Get NDVI Value on Click
map.on('click', function (event) {
    var coord = ol.proj.toLonLat(event.coordinate);
    var lon = coord[0].toFixed(4);
    var lat = coord[1].toFixed(4);

    // Simulate NDVI retrieval (replace with GEE API call for real values)
    var fakeNDVIValue = (Math.random() * 0.8 + 0.2).toFixed(2); // Simulated NDVI between 0.2 and 1.0

    document.getElementById("ndvi-value").innerText = `Lon: ${lon}, Lat: ${lat} → NDVI: ${fakeNDVIValue}`;
});

// Function to Start Drawing AOI
function addDrawInteraction() {
    draw = new ol.interaction.Draw({
        source: new ol.source.Vector(),
        type: 'Polygon'
    });

    draw.on('drawend', function (event) {
        var coordinates = event.feature.getGeometry().getCoordinates();
        displayAOICoordinates(coordinates);
    });

    map.addInteraction(draw);
}

// Function to Display AOI Coordinates
function displayAOICoordinates(coordinates) {
    let formattedCoords = coordinates[0].map(coord => {
        let lonLat = ol.proj.toLonLat(coord);
        return `[${lonLat[0].toFixed(4)}, ${lonLat[1].toFixed(4)}]`;
    }).join(", ");
    
    document.getElementById("aoi-info").innerText = `AOI Coordinates: ${formattedCoords}`;
}

// Function to Clear AOI
function clearAOI() {
    document.getElementById("aoi-info").innerText = "AOI Coordinates: None";
    if (vectorLayer) {
        map.removeLayer(vectorLayer);
    }
    map.removeInteraction(draw);
}

// Add Event Listeners for AOI
document.getElementById("draw-aoi").addEventListener("click", addDrawInteraction);
document.getElementById("clear-aoi").addEventListener("click", clearAOI);

// Load NDVI Layer on Startup
updateNDVILayer();
