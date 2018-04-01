import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourBodyPage } from './your-body';

@NgModule({
  declarations: [
    YourBodyPage,
  ],
  imports: [
    IonicPageModule.forChild(YourBodyPage),
  ],
})
export class YourBodyPageModule {}
