import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TestbedComponent } from './testbed/testbed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxScrollViewModule,
  DxChartModule,
} from 'devextreme-angular';
import { MatrixTestbedComponent } from './matrix-testbed/matrix-testbed.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TestbedComponent,
    MatrixTestbedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxDateBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
