import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineHomePage } from './medicine-home';

@NgModule({
  declarations: [
    MedicineHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineHomePage),
  ],
})
export class MedicineHomePageModule {}
