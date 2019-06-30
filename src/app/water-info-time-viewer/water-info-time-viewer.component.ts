import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Options } from 'ng5-slider';
import esri = __esri;
import { Filter } from '../models/filter';
import { Location } from '../models/location';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-water-info-time-viewer',
  templateUrl: './water-info-time-viewer.component.html',
  styleUrls: ['./water-info-time-viewer.component.css']
})
export class WaterInfoTimeViewerComponent implements OnInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  // years = [2017, 2018, 2019, 2020];
  // selected: number = 0;
  selectedParameter: string = 'pH'
  // month: number = 1;

  // filter: Filter = new Filter();

  location: Location = new Location();

  // options: Options = {
  //   step: 1,
  //   showTicks: true,
  //   showTicksValues: true,
  //   stepsArray: [
  //     { value: 1, legend: 'January' },
  //     { value: 2, legend: 'February' },
  //     { value: 3, legend: 'Average' },
  //     { value: 4, legend: 'Good' },
  //     { value: 5, legend: 'Good' },
  //     { value: 6, legend: 'Excellent' },
  //     { value: 7, legend: 'Excellent' },
  //     { value: 8, legend: 'Excellent' },
  //     { value: 9, legend: 'Excellent' },
  //     { value: 10, legend: 'Excellent' },
  //     { value: 11, legend: 'Excellent' },
  //     { value: 12, legend: 'December' }
  //   ]
  // };

  historyData: any[] = [];

  view: any[] = [650, 200];
  showXAxis = true;
  showYAxis = true;
  showDataLabel = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Value';


  constructor(private locationService: LocationService) { }


  async initializeMap() {

    try {
      var self = this;

      const [Map, MapView, FeatureLayer, GraphicsLayer, QueryTask, Query, Legend, Expand] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/widgets/Legend",
        "esri/widgets/Expand",
      ]);

      // URL to feature service containing points representing the water info
      let urlFeature = "https://services6.arcgis.com/7IDhwz9HO1TkqD4I/arcgis/rest/services/water_info/FeatureServer/0";

      // Define the popup content for each result
      var popupTemplate = {
        title: "{id}, {name}",
        content: [
          {
            type: "fields",
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
            ]
          },
          {
            type: "media", // MediaContentElement
            mediaInfos: [
              {
                title: "<b>Mexican Fan Palm</b>",
                type: "image",
                caption: "tree species",
                value: {
                  sourceURL:
                    "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"
                }
              }
            ]
          },
        ],
        outFields: ["*"]
      };

      // Create graphics layer and symbol to use for displaying the results of query
      var resultsLayer = new GraphicsLayer();

      var qTask = new QueryTask({
        url: urlFeature
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


      const view = new MapView({
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
      });


      // init
      view.when(function () {

        params.where = "";

        qTask
          .execute(params)
          .then(getResults)
          .catch(promiseRejected);


        const elementHistory = document.getElementById("history");

        const expandHistory = new Expand({
          view: view,
          content: elementHistory,
          expandIconClass: "esri-icon-filter",
          group: "top-left"
        });

        view.ui.add(expandHistory, "top-left");
        // view.ui.add("filter", "bottom-right");
        // view.ui.add("history", "bottom-left");

        // Call doQuery() each time the button is clicked
        // document.getElementById("doBtn").addEventListener("click", doQuery);
      });


      view.on("click", function (event) {
        // console.log(event);
        view.hitTest(event).then(function (response) {
          // check if a feature is returned from the resultsLayer
          const layer = response.results.filter(function (result) {
            return result.graphic.layer === resultsLayer;
          });

          const graphic = layer[0].graphic

          // console.log(graphic);

          self.fetchHistory(graphic);

        });
      });


      // Executes each time the button is clicked
      // var doQuery = function () {
      //   // Clear the results from a previous query
      //   resultsLayer.removeAll();

      //   // view.ui.add(legend, "top-right");

      //   var loc = self.filter.location;
      //   var location = ` '${loc}' `

      //   var yearStart = self.filter.year;
      //   var yearEnd = self.filter.year;

      //   var monthStart = self.month
      //   var monthEnd = monthStart + 1;

      //   if (monthEnd == 13) {
      //     monthEnd = 1;
      //     yearEnd = yearStart + 1;
      //   }

      //   var startYearStr = ` '${yearStart}-${monthStart}-01' `
      //   var endYearStr = ` '${yearEnd}-${monthEnd}-01' `

      //   var attributeName = "name ";
      //   var expressionSignEqual = "= ";
      //   var attributeDate = "date ";
      //   var expressionSignBetween = "BETWEEN ";
      //   var expressionSignAnd = "AND ";

      //   var whereQuery = "";

      //   var whereQuery = attributeName + expressionSignEqual + location + expressionSignAnd +
      //     attributeDate + expressionSignBetween + startYearStr + expressionSignAnd + endYearStr;

      //   // if (location != null) {
      //   //   whereQuery += attributeName + expressionSignEqual + location;
      //   // }

      //   // if (yearStart != null && monthStart != null && yearEnd != null && monthEnd != null) {
      //   //   whereQuery += attributeDate + expressionSignBetween + startYearStr + expressionSignAnd + endYearStr;
      //   // }

      //   console.log(whereQuery);

      //   params.where = whereQuery;

      //   // executes the query and calls getResults() once the promise is resolved
      //   // promiseRejected() is called if the promise is rejected

      //   qTask
      //     .execute(params)
      //     .then(getResults)
      //     .catch(promiseRejected);
      // }

      // Called each time the promise is resolved

      var getResults = function (response) {

        // console.log(response);

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
        // document.getElementById("printResults").innerHTML = peakResults.length + " results found!";
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

  // selectOption(id) {
  //   // console.log(id);
  //   this.selected = parseInt(id);
  // }

  // onUserChange(id) {
  //   // console.log(id);
  //   this.month = id;
  // }

  // onChange(input) {

  // if (input.name == 'parameter') {
  //   this.filter.parameter = input.value;
  // }
  // else if (input.name == 'location') {
  //   this.filter.location = input.value;
  // }
  // else if (input.name == 'year') {
  //   this.filter.year = input.value;
  // }
  // // console.log(input.value);
  // // console.log(this.filter);
  // }

  onChangeParameter(val) {
    // console.log(val);
    this.selectedParameter = val;
    this.processHistory();
  }

  fetchHistory(graphic) {

    // console.log(graphic);

    let locationId = graphic.attributes.id;

    this.locationService.get(locationId).subscribe(data => {

      // console.log(data);
      this.location = data;
      this.processHistory();
    });
  }

  processHistory() {

    this.historyData = [];

    this.location.waterInfoSet.forEach(waterInfo => {

      let o = {
        "name": String(waterInfo.date).split(" ")[0],
        "value": waterInfo[this.selectedParameter]
      };

      this.historyData.push(o);

    });

    this.historyData = [...this.historyData];
  }
}
