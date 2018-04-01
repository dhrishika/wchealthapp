import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-reminder-home',
  templateUrl: 'reminder-home.html',
})


export class ReminderHomePage {



  /**
   * @name items
   * @type {Array}
   * @public
   * @description     Used to store returned PHP data
   */
  public items: Array<any> = [];
  public storage: Storage;


  constructor(public navCtrl: NavController,
    public http: HttpClient,
    private storage2: Storage) {
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
  ionViewWillEnter(): void {
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
  load(): void {
    this.storage.get('authToken').then((token) => {
      this.http
        .get('https://essence-of-you.000webhostapp.com/read.php?t_token='+ token +'&ts=' + Date.now())
        .subscribe((data: any) => {
          console.dir(data);
          this.items = data;
        },
          (error: any) => {
            console.dir(error);
          });
    });

  }




  /**
   * Allow navigation to the AddTechnologyPage for creating a new entry
   *
   * @public
   * @method addEntry
   * @return {None}
   */
  addEntry(): void {
    this.navCtrl.push('AddReminderPage');
  }




  /**
   * Allow navigation to the AddTechnologyPage for amending an existing entry
   * (We supply the actual record to be amended, as this method's parameter,
   * to the AddTechnologyPage
   *
   * @public
   * @method viewEntry
   * @param param 		{any} 			Navigation data to send to the next page
   * @return {None}
   */
  viewEntry(param: any): void {
    this.navCtrl.push('AddReminderPage', param);
  }

}