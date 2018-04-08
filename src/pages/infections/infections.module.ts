import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfectionsPage } from './infections';

@NgModule({
  declarations: [
    InfectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InfectionsPage),
  ],
})
export class InfectionsPageModule {}
