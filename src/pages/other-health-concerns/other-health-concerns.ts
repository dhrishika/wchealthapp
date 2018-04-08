import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OtherHealthConcernsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-health-concerns',
  templateUrl: 'other-health-concerns.html',
})
export class OtherHealthConcernsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherHealthConcernsPage');
  }

  heartDiseases(){
    this.navCtrl.push('HeartDiseasesPage');
  }

  stroke(){
    this.navCtrl.push('StrokePage');
  }

  diabetes(){
    this.navCtrl.push('DiabetesPage');
  }

  highBloodPressure(){
    this.navCtrl.push('HighBloodPressurePage');
  }

  obesity(){
    this.navCtrl.push('ObesityPage');
  }

}
