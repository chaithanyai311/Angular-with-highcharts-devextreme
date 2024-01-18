import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TestbedComponent } from './testbed/testbed.component';
import { MatrixTestbedComponent } from './matrix-testbed/matrix-testbed.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'testbed', component: TestbedComponent },
  { path: 'matrixTestbed', component: MatrixTestbedComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
