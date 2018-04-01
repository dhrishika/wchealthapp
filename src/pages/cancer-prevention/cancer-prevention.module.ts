import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancerPreventionPage } from './cancer-prevention';

@NgModule({
  declarations: [
    CancerPreventionPage,
  ],
  imports: [
    IonicPageModule.forChild(CancerPreventionPage),
  ],
})
export class CancerPreventionPageModule {}
