import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContraceptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contraception',
  templateUrl: 'contraception.html',
})
export class ContraceptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraceptionPage');
  }

  hormonalContraception(){
    this.navCtrl.push('HormonalContraceptionPage');
  }

  iud(){
    this.navCtrl.push('IudPage');
  }

  permanentSterilization(){
    this.navCtrl.push('PermanentSterilizationPage');
  }

}
