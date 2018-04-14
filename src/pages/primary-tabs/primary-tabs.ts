import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PrimaryTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-primary-tabs',
  templateUrl: 'primary-tabs.html'
})
export class PrimaryTabsPage {

  t1Root = 'HomePage'
  t2Root = 'ReminderHomePage'
  t3Root = 'SymptomDiaryHomePage'


  constructor(public navCtrl: NavController) {}

}
