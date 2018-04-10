import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObesityPage } from './obesity';

@NgModule({
  declarations: [
    ObesityPage,
  ],
  imports: [
    IonicPageModule.forChild(ObesityPage),
  ],
})
export class ObesityPageModule {}
