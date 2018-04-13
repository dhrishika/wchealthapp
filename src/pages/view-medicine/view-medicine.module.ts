import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMedicinePage } from './view-medicine';

@NgModule({
  declarations: [
    ViewMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMedicinePage),
  ],
})
export class ViewMedicinePageModule {}
