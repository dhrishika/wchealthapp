import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FibroidsPage } from './fibroids';

@NgModule({
  declarations: [
    FibroidsPage,
  ],
  imports: [
    IonicPageModule.forChild(FibroidsPage),
  ],
})
export class FibroidsPageModule {}
