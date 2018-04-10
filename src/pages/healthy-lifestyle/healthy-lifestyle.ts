import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HealthyLifestylePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-healthy-lifestyle',
  templateUrl: 'healthy-lifestyle.html',
})
export class HealthyLifestylePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthyLifestylePage');
  }

  nutrition(){
    this.navCtrl.push('NutritionPage');
  }

  exercise(){
    this.navCtrl.push('ExercisePage');
  }

  tobacco(){
    this.navCtrl.push('TobaccoPage');
  }

}
