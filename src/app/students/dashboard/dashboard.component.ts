import { Component, OnInit } from '@angular/core';


import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let SeriesLabel = require('highcharts/modules/series-label');


Boost(Highcharts);
More(Highcharts);
noData(Highcharts);
SeriesLabel(Highcharts);

// Highcharts.wrap(Highcharts.Axis.prototype, 'getPlotLinePath', function(proceed) {
//   var path = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
//   if (path) {
//       path.flat = false;
//   }
//   return path;
// });


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var obj:any = {

      title: {
          text: ''
      },
  
      subtitle: {
          text: 'Source: thesolarfoundation.com'
      },
  
      yAxis: {
          title: {
              text: 'Number of Employees'
          }
      },
  
      xAxis: {
          accessibility: {
              rangeDescription: 'Range: 2010 to 2017'
          }
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2010
          }
      },
  
      series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
  };

  const chart = Highcharts.chart('semester-chart-container', obj, (chart: any) => {
    console.log(chart);
  });

  var semsterWiseObj:any = {
                          chart: {
                              type: 'pie',
                          },
                          title: {
                              text: ''
                          },
                          subtitle: {
                              text: '3D donut in Highcharts'
                          },
                          plotOptions: {
                              pie: {
                                  innerSize: 80,
                                  depth: 10
                              }
                          },
                          series: [{
                              name: 'Delivered amount',
                              data: [
                                  ['Bananas', 8],
                                  ['Kiwi', 3],
                                  ['Mixed nuts', 1],
                                  ['Oranges', 6]
                              ]
                          }]
                      };

                      const semsterWiseChart = Highcharts.chart('semester-wise-chart-container', semsterWiseObj, (chart: any) => {
                        console.log(chart);
                      });
                    
  }

}
