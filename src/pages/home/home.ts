import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public storage: Storage;
  private baseURI: string = "http://womanovaapp.com/";

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public NP: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage2: Storage) {
    this.storage = storage2;
    // this.checkLogin();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      // showBackdrop: false,
      dismissOnPageChange: true,
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
  checkLogin(): void {
    this.storage.get('authToken').then((token) => {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = { "t_token": token, "key": "checkLogin" },
        url: any = this.baseURI + "home.php";

      this.http.post(url, JSON.stringify(options))
        .subscribe((data: any) => {
          if (data && data['success']) {
            // If the request was successful notify the user
            // this.navCtrl.setRoot(ReminderHomePage);
            
          }
          else {
            console.log(data);
            this.sendNotification(`You are not logged in!`);
            this.navCtrl.setRoot("RegPage");
          }

        },
          (error: any) => {
            console.log("Error is", error);
            this.sendNotification('Something went wrong!');
          });
    });
  }

  ionViewCanEnter(){
    console.log("Page will load");
    this.presentLoadingDefault();
    this.checkLogin();
  }

  /**
  * Allow navigation to the AddTechnologyPage for creating a new entry
  *
  * @public
  * @method login
  * @return {None}
  */
  goLogin(): void {
    this.navCtrl.push('LoginPage');
  }

  /**
   * Allow navigation to the Login Page for validating user credentials
   *
   * @public
   * @method login
   * @return {None}
   */
  goRegister(): void {
    this.navCtrl.push('RegisterPage');
  }

  femaleBody() {
    this.navCtrl.push('FemaleBodyPage');
  }

  health() {
    this.navCtrl.push('HealthWellnessPage');
  }

  repro() {
    this.navCtrl.push('ReproductionPage');
  }

  faqs() {
    this.navCtrl.push('FaqsPage');
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
