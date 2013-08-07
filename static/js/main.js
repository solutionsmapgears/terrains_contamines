function App(){
    var self = this;

    this.selectors = null;

    this.map = null;

    App.prototype.init = function(){
        this.map = L.map('map', {
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
        }).addTo(this.map); 

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
            self.map.addLayer(markers) 
        });

        this.selectors = {
            entreprises: function(){ return $('#entreprises') }
        }

        this.bindEvents();
    }

    App.prototype.bindEvents = function(){
        this.selectors.entreprises().on('change', function(e){
            var lat = null, lon = null;
            switch($(this).find('option:selected').val()){
                case '1':
                    lon = -74;
                    lat = 42;
                    break;
                case '2':
                    lon = -78;
                    lat = 48;
                    break;
                case '3':
                    lon = -78;
                    lat = 50;
                    break;
                case '4':
                    lon = -72;
                    lat = 46;
                    break;
                case '5':
                    lon = -74;
                    lat = 44;
                    break;
                default:
                    break;
            }
            if(lat != null){
                self.map.setView([lat, lon], 12)
            }
        })
    }

    this.init();
}

$(document).ready(function() {
    var app = new App();
});
