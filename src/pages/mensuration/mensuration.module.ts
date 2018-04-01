import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensurationPage } from './mensuration';

@NgModule({
  declarations: [
    MensurationPage,
  ],
  imports: [
    IonicPageModule.forChild(MensurationPage),
  ],
})
export class MensurationPageModule {}
