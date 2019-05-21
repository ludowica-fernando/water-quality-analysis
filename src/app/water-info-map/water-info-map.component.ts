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

  private _basemap = 'hybrid';

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
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
      });

      map.add(featureLayer);

      const spatialProperties: esri.SpatialReferenceProperties = {
        wkid: 102100
      };

      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        map: map,
        extent: {
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: spatialProperties
        }
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

    });
  }

}
