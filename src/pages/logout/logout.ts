import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  public storage : Storage;
  private baseURI               : string  = "http://womanovaapp.com/";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient,
              public toastCtrl: ToastController,
              private storage2: Storage) 
              {
              this.storage = storage2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  logOut(){
    this.storage.get('authToken').then((token) => {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"t_token":token, "key" : "logout" },
          url       : any      	= this.baseURI + "logout.php";
          // this.navCtrl.setRoot(HomePage);

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe(async (data : any) =>
      {
         // If the request was successful notify the user
         if(data && data['success']){
          await this.storage.set('authToken', data['t_token']); 
          // this.hideForm   = true;
          // this.storage.get('authToken').then((val) => {
            this.sendNotification(`Congratulations: You have successfully logged out`);
            this.navCtrl.setRoot('RegPage');
          // });
         }
         else{
          this.sendNotification('Could not log out!');
         }
      },
      (error : any) =>
      {
         this.sendNotification('Authentication in server failed!');
      });
    });
  }
  sendNotification(message : string)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         duration      : 3000
     });
     notification.present();
  }

}
