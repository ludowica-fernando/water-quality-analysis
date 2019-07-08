import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-water-info-map',
  templateUrl: './water-info-map.component.html',
  styleUrls: ['./water-info-map.component.css']
})
export class WaterInfoMapComponent implements OnInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  private _basemap = 'streets';

  constructor() { }

  async initializeMap() {
    try {

      const [Map, MapView, FeatureLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/layers/FeatureLayer"
      ]);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new Map(mapProperties);

      let featureLayer = new FeatureLayer({
        url: "https://services6.arcgis.com/7IDhwz9HO1TkqD4I/arcgis/rest/services/water_information/FeatureServer/0"
      });

      map.add(featureLayer);
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        map: map,
        zoom: 10,
        center: [80, 7] // Sets center point of view using longitude,latitude
      };

      const mapView: esri.MapView = new MapView(mapViewProperties)

      return mapView;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  ngOnInit() {
    this.initializeMap().then((mapView) => {
      this.houseKeeping(mapView);
    });
  }

  houseKeeping(mapView) {
    mapView.when(() => {
      console.log("map loaded");
    });
  }

}
