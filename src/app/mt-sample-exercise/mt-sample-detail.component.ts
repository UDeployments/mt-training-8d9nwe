import { Component } from '@angular/core';
import { SelectedFarmService } from './selected-farm.service';

@Component({
  selector: 'mt-sample-detail',
  templateUrl: './mt-sample-detail.component.html',
})
export class MtSampleDetailComponent {
  constructor(public selectedFarm: SelectedFarmService) {} // End constructor()
} // End class MtSampleDetailComponent
