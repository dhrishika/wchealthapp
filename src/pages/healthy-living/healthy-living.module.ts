import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyLivingPage } from './healthy-living';

@NgModule({
  declarations: [
    HealthyLivingPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyLivingPage),
  ],
})
export class HealthyLivingPageModule {}
