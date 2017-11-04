import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import {UtilService} from '../../../../providers/util.service';

@Component({
  selector: 'customer-reports',
  templateUrl: 'customerreports.html'
})
export class CustomerReports implements AfterViewInit{
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas1') barCanvas1;
  barChart: any;
  barChart1: any;
  selectedCustomer: any;
  data: any;
  turnoverData: any;
  qGrowthData: any;
  reports: any;
  constructor(private utilService: UtilService, private navParams: NavParams) {
    this.selectedCustomer = navParams.get('selectedCustomer');
    this.data= [
      {
        title: 'Turnover in Lacs',
        icon: 'arrow-dropright',
        showDetails: false,
        index: 0
      },
      {
        title: 'Quarterly Growth over LY',
        icon: 'arrow-dropright',
        showDetails: false,
        index: 1
      },
      {
        title: 'Collection Details',
        icon: 'arrow-dropright',
        showDetails: false,
        index: 2
      },
      {
        title: 'Cheque Bounced List',
        icon: 'arrow-dropright',
        showDetails: false,
        index: 3
      },
      {
        title: 'C Form Summary Report',
        icon: 'arrow-dropright',
        showDetails: false,
        index: 4
      }
    ];
    this.reports = {
      collectiondetails: [
        {docno: "409107", date: "10.08.2015", amount: "89,259"},
        {docno: "408308", date: "30.07.2015", amount: "124,637"},
        {docno: "408112", date: "28.07.2015", amount: "85,016"},
        {docno: "406848", date: "25.07.2015", amount: "48,126"},
        {docno: "406847", date: "20.07.2015", amount: "76,248"},
        {docno: "406846", date: "30.06.2015", amount: "83,331"},
        {docno: "406424", date: "17.06.2015", amount: "56,701"},
        {docno: "406423", date: "09.06.2015", amount: "54,811"},
        {docno: "405583", date: "27.05.2015", amount: "175,778"}
      ],
      chequeBounceList: [
        {docno: "067360", date: "24.07.2015", amount: "329,311"},
        {docno: "057886", date: "20.07.2015", amount: "65,525"}
      ],
      cFormList: [
        {year: "2014", qtr: "Q1", expected: "154,785", received: "154,785", balance: "0"},
        {year: "2014", qtr: "Q2", expected: "254,612", received: "254,612", balance: "0"},
        {year: "2014", qtr: "Q3", expected: "698,547", received: "698,547", balance: "0"},
        {year: "2014", qtr: "Q4", expected: "20,546", received: "20,546", balance: "0"},
        {year: "2015", qtr: "Q1", expected: "198,564", received: "114,578", balance: "83,986"},
        {year: "2015", qtr: "Q2", expected: "385,684", received: "0", balance: "385,684"}
      ]
    }
  }
  ngAfterViewInit() {
    this.turnoverData = {
      type: 'bar',
      data: {
        labels: ["FY 12 Q1", "FY 13 Q1", "FY 14 Q1", "FY 15 Q1"],
        datasets: [{
          data: [57.25, 35.10, 40.06, 22.52],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: { display: false }
      }

    }
    this.barChart = new Chart(this.barCanvas.nativeElement, this.turnoverData);


      this.qGrowthData = {
        type: 'bar',
        data: {
          labels: ["FY 14 Q2", "FY 15 Q2"],
          datasets: [{
            data: [1863, 816],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: { display: false }
        }

      }
      this.barChart1 = new Chart(this.barCanvas1.nativeElement, this.qGrowthData);

  }

toggleDetails(data) {
  if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'arrow-dropright';
  } else {
      data.showDetails = true;
      data.icon = 'arrow-dropdown';
      for(var i=0; i < this.data.length; i++){
        var otherData = this.data[i];
        if(otherData.index != data.index){
          otherData.showDetails = false;
          otherData.icon = 'arrow-dropright';
        }
      }
  }
}

}
