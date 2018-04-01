import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {

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
this.navCtrl.push('LoginPage')
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
this.navCtrl.push('RegisterPage')
}


}
