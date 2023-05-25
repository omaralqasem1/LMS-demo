import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmsRoutingModule } from './lms-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    LmsRoutingModule
  ]
})
export class LmsModule { }
