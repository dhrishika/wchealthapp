import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HighBloodPressurePage } from './high-blood-pressure';

@NgModule({
  declarations: [
    HighBloodPressurePage,
  ],
  imports: [
    IonicPageModule.forChild(HighBloodPressurePage),
  ],
})
export class HighBloodPressurePageModule {}
