import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgMaterialShared} from '../ng-material-shared.module';


import { FacultyRoutingModule } from './faculty-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgMaterialShared,
    FacultyRoutingModule
  ]
})
export class FacultyModule { }
