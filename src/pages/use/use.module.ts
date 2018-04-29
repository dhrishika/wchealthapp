import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsePage } from './use';

@NgModule({
  declarations: [
    UsePage,
  ],
  imports: [
    IonicPageModule.forChild(UsePage),
  ],
})
export class UsePageModule {}
