function App(){
    var self = this;

    App.prototype.init = function(){
        var map = L.map('map', {
            zoom: 5,
            minZoom: 5,
            maxZoom: 18,
            center: new L.LatLng(55, -72)
        });
        L.tileLayer('http://osm-t1.mapgears.com/mapcache/tms/1.0.0/osm@g/{z}/{x}/{y}.png', {
            maxZoom: 18,
            tms: true,
            dragging: true,
            zoomAnimation:true
        }).addTo(map); 

        $.getJSON("data/terrains-contamines.json", function(json) {
            var markers = L.markerClusterGroup({
                maxClusterRadius: 50
            });
            var points = new L.geoJson(json, {
                onEachFeature: function (feature, layer) {
                    var popupContent = feature.properties.Adresse
                    layer.bindPopup(popupContent);
                }
            })

            markers.addLayer(points)
            map.addLayer(markers) 
        });
    }
}

$(document).ready(function() {
    var app = new App();
    app.init();
});
