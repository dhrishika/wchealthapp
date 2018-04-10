import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrokePage } from './stroke';

@NgModule({
  declarations: [
    StrokePage,
  ],
  imports: [
    IonicPageModule.forChild(StrokePage),
  ],
})
export class StrokePageModule {}
