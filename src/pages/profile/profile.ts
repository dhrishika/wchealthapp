import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

     /**
      * @name items
      * @type {Array}
      * @public
      * @description     Used to store returned PHP data
      */
     public items : Array<any> = [];
     public storage: Storage;

     /**
      * @name item
      * @type {any}
      * @description    Used to store the name returned from PHP
      */
     public item: any;
  
  
     constructor(public navCtrl: NavController,
                 public http   : HttpClient,
                 private storage2: Storage,
                 private alertCtrl: AlertController)
     {
      this.storage = storage2;
     }
  
     /**
      * Triggered when template view is about to be entered
      * Returns and parses the PHP data through the load() method
      *
      * @public
      * @method ionViewWillEnter
      * @return {None}
      */
     ionViewWillEnter() : void
     {
        this.load();
     }
  
  
     /**
      * Retrieve the JSON encoded data from the remote server
      * Using Angular's Http class and an Observable - then
      * assign this to the items array for rendering to the HTML template
      *
      * @public
      * @method load
      * @return {None}
      */
     load() : void
     {
      this.storage.get('authToken').then((token) => {
        this.http
          .get('http://womanovaapp.com/profile_read.php?t_token='+ token +'&ts=' + Date.now())
          .subscribe((data: any) => {
            console.dir(data);
            this.items = data;
            this.item = this.items[0].u_name;
          },
            (error: any) => {
              console.dir(error);
            });
      });
     }


    /**
     * Allow navigation to the EditProfile for amending an existing entry
     * (We supply the actual record to be amended, as this method's parameter,
     * to the EditProfile
     *
     * @public
     * @method viewEntry
     * @param param 		{any} 			Navigation data to send to the next page
     * @return {None}
     */
    viewEntry(param: any): void {
      this.navCtrl.push('EditProfilePage', param);
    }

    goHome(): void {
      this.navCtrl.setRoot('HomePage');
    }

    show_badge_1(): void{
      let alert = this.alertCtrl.create({
        title: 'Badge 1',
        subTitle: 'You have answered atleast 1 whole quiz 100% correctly',
        buttons: ['Dismiss']
      });
      alert.present();
    }

    show_badge_2(){
      let alert = this.alertCtrl.create({
        title: 'Badge 2',
        subTitle: 'You have answered at least 5 questions correctly',
        buttons: ['Dismiss']
      });
      alert.present();
    }

    show_badge_3(){
      let alert = this.alertCtrl.create({
        title: 'Badge 3',
        subTitle: 'You have answered atleast 10 questions in total',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }