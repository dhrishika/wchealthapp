import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewReminderPage } from './view-reminder';

@NgModule({
  declarations: [
    ViewReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewReminderPage),
  ],
})
export class ViewReminderPageModule {}
