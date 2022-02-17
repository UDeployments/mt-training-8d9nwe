import { Farm } from './farm';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedFarmService {
  constructor() {} // End constructor()

  public dataFarms: Array<Farm>;
  public dataDetailFarm: Array<Farm>;

  displayDetail(detailData: any) {
    this.dataDetailFarm = this.dataFarms.filter((item: any) => {
      return item['Id'] == detailData['Id'];
    });
  } // End function displayDetail()
} // End class SelectedFarmService
