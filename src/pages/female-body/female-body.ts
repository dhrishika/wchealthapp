import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FemaleBodyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-female-body',
  templateUrl: 'female-body.html',
})
export class FemaleBodyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FemaleBodyPage');
  }

  genitalConcerns(){
    this.navCtrl.push('GenitalConcernsPage');
  }

  yourBody(){
    this.navCtrl.push('YourBodyPage');
  }

  pelvicFloorProblems(){
    this.navCtrl.push('PelvicFloorProblemsPage');

  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }
}
