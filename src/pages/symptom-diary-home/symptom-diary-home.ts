import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public http: HttpClient) {
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
     this.http
     .get('https://essence-of-you.000webhostapp.com/symp_read.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
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
