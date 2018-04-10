import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthWellnessPage } from './health-wellness';

@NgModule({
  declarations: [
    HealthWellnessPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthWellnessPage),
  ],
})
export class HealthWellnessPageModule {}
