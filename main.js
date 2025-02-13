gapi.load('client', initialize);

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
}
window.onload = initMap;

function initialize() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY', 
        discoveryDocs: ['https://earthengine.googleapis.com/$discovery/rest?version=v1']
    }).then(function () {
        console.log('GEE API Loaded');
    });
}

// Load an image (e.g., Sentinel-2)
var image = ee.Image('COPERNICUS/S2/20210801T000000_20210801T235959');

// Get the URL for the image tile layer
image.getMap({ min: 0, max: 3000, bands: ['B4', 'B3', 'B2'] }, function (mapId) {
    var geeTileUrl = `https://earthengine.googleapis.com/v1alpha/${mapId.mapid}/tiles/{z}/{x}/{y}?token=${mapId.token}`;
    
    var geeLayer = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return geeTileUrl.replace('{z}', zoom).replace('{x}', coord.x).replace('{y}', coord.y);
        },
        tileSize: new google.maps.Size(256, 256)
    });

    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 3
    });

    map.overlayMapTypes.push(geeLayer);
});
