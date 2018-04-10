import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbnormalBleedingPage } from './abnormal-bleeding';

@NgModule({
  declarations: [
    AbnormalBleedingPage,
  ],
  imports: [
    IonicPageModule.forChild(AbnormalBleedingPage),
  ],
})
export class AbnormalBleedingPageModule {}
