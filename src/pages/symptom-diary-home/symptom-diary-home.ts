import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-symptom-diary-home',
  templateUrl: 'symptom-diary-home.html',
})

export class SymptomDiaryHomePage {
  /**
    * @name items
    * @type {Array}
    * @public
    * @description     Used to store returned PHP data
    */
   public items : Array<any> = [];
   public storage: Storage;

  constructor(public navCtrl: NavController, public http: HttpClient,
    private storage2: Storage) {
      this.storage = storage2;
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SymptomDiaryHomePage');
  // }
  ionViewWillEnter() : void
  {
     this.load();
  }
  load() : void
  {
    this.storage.get('authToken').then((token) => {
      this.http
        .get('https://essence-of-you.000webhostapp.com/symp_read.php?t_token='+ token +'&ts=' + Date.now())
        .subscribe((data: any) => {
          console.dir(data);
          this.items = data;
        },
          (error: any) => {
            console.dir(error);
          });
    });
  }
  addEntry() : void
  {
     this.navCtrl.push('AddSymptomPage');
  }
  viewEntry(param : any) : void
  {
     this.navCtrl.push('AddSymptomPage', param);
  }
}
//