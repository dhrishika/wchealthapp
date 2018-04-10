import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  


   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

      /**
    * Allow navigation to the AddTechnologyPage for creating a new entry
    *
    * @public
    * @method login
    * @return {None}
    */
   goLogin() : void
   {
      this.navCtrl.push('LoginPage');
   }

   /**
    * Allow navigation to the Login Page for validating user credentials
    *
    * @public
    * @method login
    * @return {None}
    */
   goRegister() : void
   {
    this.navCtrl.push('RegisterPage');
   }

 femaleBody(){
    this.navCtrl.push('FemaleBodyPage');
  } 

  health(){
    this.navCtrl.push('HealthWellnessPage');
  }
  
  repro(){
    this.navCtrl.push('ReproductionPage');
  }

  faq(){
    this.navCtrl.push('FaqsPage');
  }

}