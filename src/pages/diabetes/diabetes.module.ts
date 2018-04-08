import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiabetesPage } from './diabetes';

@NgModule({
  declarations: [
    DiabetesPage,
  ],
  imports: [
    IonicPageModule.forChild(DiabetesPage),
  ],
})
export class DiabetesPageModule {}
