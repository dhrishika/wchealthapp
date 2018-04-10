import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CervicalCancerPage } from './cervical-cancer';

@NgModule({
  declarations: [
    CervicalCancerPage,
  ],
  imports: [
    IonicPageModule.forChild(CervicalCancerPage),
  ],
})
export class CervicalCancerPageModule {}
