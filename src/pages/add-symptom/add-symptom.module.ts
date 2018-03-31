import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSymptomPage } from './add-symptom';

@NgModule({
  declarations: [
    AddSymptomPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSymptomPage),
  ],
})
export class AddSymptomPageModule {}
