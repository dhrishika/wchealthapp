import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyLifestylePage } from './healthy-lifestyle';

@NgModule({
  declarations: [
    HealthyLifestylePage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyLifestylePage),
  ],
})
export class HealthyLifestylePageModule {}
