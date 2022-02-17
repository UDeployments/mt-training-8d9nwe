import { Farm } from './farm';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { SelectedFarmService } from './selected-farm.service';

@Component({
  selector: 'mt-sample-list',
  templateUrl: './mt-sample-list-index.component.html',
})
export class MtSampleListIndexComponent implements OnInit {
  dataFarmsBackup: Array<any>;
  constructor(
    public service: DataService,
    public selectfarm: SelectedFarmService
  ) {} // End constructor()

  ngOnInit() {
    this.fireAPIFarms(
      '/assets/mock-data.json',
      (listFarms: Array<Farm>) => {
        this.selectfarm.dataFarms = listFarms;
      },
      (e: any) => {
        console.log('Posible error in request', e);
      },
      (e: any) => {
        console.log('Posible request with service', e);
      }
    );
  } // End function ngOnInit()

  handleError() {
    // The button start request to API to get data, but the url is wrong (case of test with error and notify to user)
    this.fireAPIFarms(
      '/assets/mock.json',
      (listFarms: Array<Farm>) => {
        this.selectfarm.dataFarms = listFarms;
      },
      (e: any) => {
        window.alert('Exception has ocurred to try consume the API');
        console.error('Exception has ocurred to try consume the API', e);
      },
      (e: any) => {
        window.alert('Exception has ocurred, problem with the service');
        console.error('Exception has ocurred, problem with the service', e);
      }
    );
  } // End function handleError()

  fireAPIFarms(
    url: string,
    correctAction: any,
    errorAction: any,
    catchAction: any
  ) {
    this.service
      .getFarms(url)
      .then(
        (listFarms: Array<Farm>) => {
          correctAction(listFarms);
        },
        (e) => {
          errorAction(e);
        }
      )
      .catch((e) => {
        catchAction(e);
      });
  } // End function fireAPIFarms()

  onRowSelected(ev: any) {
    this.selectfarm.displayDetail(ev.data);
  } // End function onRowSelected()

  applyFilter(ev: any) {
    // This action is use to evit consume the API and backup the variable and optimize the filters
    if (this.dataFarmsBackup == undefined)
      this.dataFarmsBackup = this.selectfarm.dataFarms;

    // Restore a datasource with the backup
    this.selectfarm.dataFarms = this.dataFarmsBackup;
    // Clean the Detail Grid when refresh data
    this.selectfarm.dataDetailFarm = undefined;
    switch (ev.target.value) {
      case 'no':
        this.selectfarm.dataFarms = this.selectfarm.dataFarms.filter(
          (item: any) => {
            return item['FarmNo'].substring(0, 3) == '100';
          }
        );
        break;
      case 'activedate':
        this.selectfarm.dataFarms = this.selectfarm.dataFarms.filter(
          (item: any) => {
            return item['ActiveDate'].split('-')[0] == '2020';
          }
        );
        break;
    }
  } // End function applyFilter()
} // End class MtSampleListIndexComponent
