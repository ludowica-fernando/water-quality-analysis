import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Options } from 'ng5-slider';
import esri = __esri;
import { Filter } from '../models/filter';

@Component({
  selector: 'app-water-info-time-viewer',
  templateUrl: './water-info-time-viewer.component.html',
  styleUrls: ['./water-info-time-viewer.component.css']
})
export class WaterInfoTimeViewerComponent implements OnInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  years = [2017, 2018, 2019, 2020];
  selected: number = 0;
  month: number = 1;

  filter: Filter = new Filter();

  options: Options = {
    step: 1,
    showTicks: true,
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: 'January' },
      { value: 2, legend: 'February' },
      { value: 3, legend: 'March' },
      { value: 4, legend: 'April' },
      { value: 5, legend: 'May' },
      { value: 6, legend: 'June' },
      { value: 7, legend: 'July' },
      { value: 8, legend: 'August' },
      { value: 9, legend: 'Sep.' },
      { value: 10, legend: 'Oct.' },
      { value: 11, legend: 'Nov.' },
      { value: 12, legend: 'Dec.' }
    ]
  };

  constructor() { }

  async initializeMap() {

    try {
      var self = this;

      const [Map, MapView, FeatureLayer, GraphicsLayer, QueryTask, Query] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query"
      ]);

      // URL to feature service containing points representing the water info
      let peaksUrl = "https://services6.arcgis.com/7IDhwz9HO1TkqD4I/arcgis/rest/services/water_information/FeatureServer/0";

      // Define the popup content for each result
      var popupTemplate = {
        // autocasts as new PopupTemplate()
        title: "{id}, {name}",
        fieldInfos: [
          {
            fieldName: "date",
            label: "date",
            format: {
              dateFormat: 'short-date'
            }
          },
          {
            fieldName: "hw",
            label: "hw",
            format: {
              places: 4,
              digitSeperator: true
            }
          },
          {
            fieldName: "longitude",
            label: "longitude",
            format: {
              places: 4,
              digitSeperator: true
            }
          },
          {
            fieldName: "latitude",
            label: "latitude",
            format: {
              places: 4,
              digitSeperator: true
            }
          }
        ],
        content:
          "<b><a href='https://en.wikipedia.org/wiki/Topographic_prominence'>latitude :</a>" +
          "</b> {latitude})" +
          "<br><b><a href='https://en.wikipedia.org/wiki/Topographic_isolation'>longitude :</a>" +
          "</b> {longitude})" +
          "<br><b> date :</b> {date}" +
          "<br><b> hw :</b> {hw})"
      };

      // Create graphics layer and symbol to use for displaying the results of query
      var resultsLayer = new GraphicsLayer();

      var qTask = new QueryTask({
        url: peaksUrl
      });

      // Set the query parameters to always return geometry and all fields
      // Returning geometry allows us to display results on the map/view
      var params = new Query({
        returnGeometry: true,
        outFields: ["*"]
      });

      var map = new Map({
        basemap: "streets",
        layers: [resultsLayer] // add graphics layer to the map
      });


      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        map: map,
        zoom: 10,
        center: [80, 7],
        popup: {
          dockEnabled: true,
          dockOptions: {
            position: "top-right",
            breakpoint: false
          }
        }
      };

      const view: esri.MapView = new MapView(mapViewProperties)

      // Call doQuery() each time the button is clicked
      view.when(function () {
        view.ui.add("filter", "bottom-right");
        view.ui.add("timeslider", "bottom-left");
        document.getElementById("doBtn").addEventListener("click", doQuery);
      });


      // Executes each time the button is clicked
      var doQuery = function () {
        // Clear the results from a previous query
        resultsLayer.removeAll();

        var loc = self.filter.location;
        var location = ` '${loc}' `


        var yearStart = self.filter.year;
        var yearEnd = self.filter.year;

        var monthStart = self.month
        var monthEnd = monthStart + 1;

        if (monthEnd == 13) {
          monthEnd = 1;
          yearEnd = yearStart + 1;
        }

        var startYearStr = ` '${yearStart}-${monthStart}-01' `
        var endYearStr = ` '${yearEnd}-${monthEnd}-01' `

        var attributeName = "name ";
        var attributeEqual = "= ";
        var attributeDate = "date ";
        var expressionSignBetween = "BETWEEN ";
        var expressionSignAnd = "AND ";

        var whereQuery = attributeName + attributeEqual + location + expressionSignAnd +
          attributeDate + expressionSignBetween + startYearStr + expressionSignAnd + endYearStr;

        console.log(whereQuery);

        params.where = whereQuery;

        // executes the query and calls getResults() once the promise is resolved
        // promiseRejected() is called if the promise is rejected

        qTask
          .execute(params)
          .then(getResults)
          .catch(promiseRejected);
      }

      // Called each time the promise is resolved
      var getResults = function (response) {

        // Loop through each of the results and assign a symbol and PopupTemplate
        // to each so they may be visualized on the map
        var peakResults = response.features.map(function (feature) {
          // Sets the symbol of each resulting feature to a cone with a
          // fixed color and width. The height is based on the mountain's elevation

          feature.symbol = {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            color: "dodgerblue",
            size: "20px",  // pixels
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          };

          feature.popupTemplate = popupTemplate;
          return feature;
        });

        resultsLayer.addMany(peakResults);

        // console.log(resultsLayer)

        // animate to the results after they are added to the map
        view.goTo(peakResults).then(function () {
          view.popup.open({
            features: peakResults,
            featureMenuOpen: true,
            updateLocationEnabled: true
          });
        });

        // print the number of results returned to the user
        document.getElementById("printResults").innerHTML = peakResults.length + " results found!";
      }

      // Called each time the promise is rejected
      var promiseRejected = function (error) {
        console.error("Promise rejected: ", error.message);
      }

      return view;
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

  selectOption(id) {
    console.log(id);
    this.selected = parseInt(id);
  }

  onUserChange(id) {
    // console.log(id);
    this.month = id;
  }

  onChange(input) {

    if (input.name == 'parameter') {
      this.filter.parameter = input.value;
    }
    else if (input.name == 'location') {
      this.filter.location = input.value;
    }
    else if (input.name == 'year') {
      this.filter.year = input.value;
    }
    // console.log(input.value);
    console.log(this.filter);
  }
}
