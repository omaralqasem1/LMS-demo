import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { LmsRoutingModule } from './lms-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesService } from './categories/services/categories.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LmsRoutingModule,
    MatToolbarModule,
    SharedModule,
    MatMenuModule
  ],
  providers: [CategoriesService]
})
export class LmsModule { }
