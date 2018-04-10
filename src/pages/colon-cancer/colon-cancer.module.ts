import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColonCancerPage } from './colon-cancer';

@NgModule({
  declarations: [
    ColonCancerPage,
  ],
  imports: [
    IonicPageModule.forChild(ColonCancerPage),
  ],
})
export class ColonCancerPageModule {}
