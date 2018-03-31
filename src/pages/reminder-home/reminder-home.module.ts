import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderHomePage } from './reminder-home';

@NgModule({
  declarations: [
    ReminderHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderHomePage),
  ],
})
export class ReminderHomePageModule {}
