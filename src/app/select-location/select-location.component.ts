import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri; // Esri TypeScript Types

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;  // The <div> where we will place the map

  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = 'streets';
  // private _basemap = 'gray';
  private _loaded = false;

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() { }

  async initializeMap() {
    try {

      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, Graphic] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/Graphic"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      // const mapView: esri.MapView = new EsriMapView(mapViewProperties)
      const mapView: esri.MapView = new EsriMapView(mapViewProperties)

      // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };

      mapView.on("click", function (evt) {

        let pt = mapView.toMap({ x: evt.x, y: evt.y });
        console.log("Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3));

        var point = {
          type: "point",
          longitude: pt.longitude.toFixed(3),
          latitude: pt.latitude.toFixed(3)
        };

        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        });

        mapView.graphics.removeAll();
        mapView.graphics.add(pointGraphic);
      });

      return mapView;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }


  // Finalize a few things once the MapView has been loaded
  houseKeeping(mapView) {
    mapView.when(() => {
      // console.log('mapView ready: ', mapView.ready);
      this._loaded = mapView.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then((mapView) => {
      this.houseKeeping(mapView);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.center.currentValue);
    this._center.concat(changes.center.currentValue);
  }
}
