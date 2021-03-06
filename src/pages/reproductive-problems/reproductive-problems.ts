import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReproductiveProblemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reproductive-problems',
  templateUrl: 'reproductive-problems.html',
})
export class ReproductiveProblemsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReproductiveProblemsPage');
  }

  breastProblems(){
    this.navCtrl.push('BreastProblemsPage');
  }

  fibroids(){
    this.navCtrl.push('FibroidsPage');
  }

  pelvicPain(){
    this.navCtrl.push('PelvicPainPage');
  }

  infertility(){
    this.navCtrl.push('InfertilityPage');
  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }

}
