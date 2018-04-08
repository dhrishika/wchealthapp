import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeartDiseasesPage } from './heart-diseases';

@NgModule({
  declarations: [
    HeartDiseasesPage,
  ],
  imports: [
    IonicPageModule.forChild(HeartDiseasesPage),
  ],
})
export class HeartDiseasesPageModule {}
