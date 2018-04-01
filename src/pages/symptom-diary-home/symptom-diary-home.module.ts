import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SymptomDiaryHomePage } from './symptom-diary-home';

@NgModule({
  declarations: [
    SymptomDiaryHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SymptomDiaryHomePage),
  ],
})
export class SymptomDiaryHomePageModule {}
