import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreastCancerPage } from './breast-cancer';

@NgModule({
  declarations: [
    BreastCancerPage,
  ],
  imports: [
    IonicPageModule.forChild(BreastCancerPage),
  ],
})
export class BreastCancerPageModule {}
