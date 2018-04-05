import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ReproductiveProblemsPage } from '../reproductive-problems/reproductive-problems';



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

   yourBody(){
    this.navCtrl.push('YourBodyPage');
  } 

  healthyLiving(){
    this.navCtrl.push('HealthyLivingPage');
  }
  
  mensuration(){
    this.navCtrl.push('MensurationPage');
  }
  
  cancerPrevention(){
    this.navCtrl.push('CancerPreventionPage');
  }
 
  contraception(){
    this.navCtrl.push('ContraceptionPage');
  }

  genitalConcerns(){
    this.navCtrl.push('GenitalConcernsPage');
  }
 
  menopause(){
    this.navCtrl.push('MenopausePage');
  }

  others(){
    this.navCtrl.push('OthersPage');
  }
  
  repro(){
    this.navCtrl.push('ReproductiveProblemsPage');
  }

  faq(){
    this.navCtrl.push('FaqsPage');
  }

}