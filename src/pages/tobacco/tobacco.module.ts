import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TobaccoPage } from './tobacco';

@NgModule({
  declarations: [
    TobaccoPage,
  ],
  imports: [
    IonicPageModule.forChild(TobaccoPage),
  ],
})
export class TobaccoPageModule {}
