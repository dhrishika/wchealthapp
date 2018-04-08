import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HealthWellnessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-health-wellness',
  templateUrl: 'health-wellness.html',
})
export class HealthWellnessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthWellnessPage');
  }

  cancerPrevention(){
    this.navCtrl.push('CancerPreventionPage');
  }

  otherHealthConcerns(){
    this.navCtrl.push('OtherHealthConcernsPage');
  }

  healthyLifestyle(){
    this.navCtrl.push('HealthyLifestylePage');
  }

}
