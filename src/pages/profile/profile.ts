import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
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
  
  
     constructor(public navCtrl: NavController,
                 public http   : HttpClient,
                 private storage2: Storage)
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
          },
            (error: any) => {
              console.dir(error);
            });
      });
     }
  
  }