import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-view-symptom',
  templateUrl: 'view-symptom.html',
})
export class ViewSymptomPage {


    /**
    * @name sympName
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Name field
    */
    public sympName : any;

      /**
    * @name sympType
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Type field
    */
    public sympType  : any;

    /**
    * @name sympesc
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Description field
    */
    public sympDesc  : any;

    /**
    * @name sympDate
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Date field
    */
    public sympDate  : any;

    /**
    * @name sympTime
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Time field
    */
    public sympTime  : any;

    /**
    * @name sympMood
    * @type {Any}
    * @public
    * @description     Model for managing the Symptom Diary Mood field
    */
    public sympMood  : any;

    /**
     * @name ID 
     * @type {any} 
     * @public
     * @description     Property to store the recordID for when an existing entry is being edited
     */
    public ID : any = null;

    /**
     * @name items
     * @type {any}
     * @public
     * @description     Property to store the record parameters and pass it to the Edit page
     */
    public items: any;

    public storage: Storage;
  
  
    constructor(public navCtrl: NavController,
      public NP: NavParams,
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
    ionViewWillEnter() : void
    {
       this.selectEntry(this.NP.get("record"));
       this.items = this.NP.get("record");
    }
  

    selectEntry(item: any): void {
      this.sympName = item.s_name;
      this.sympDesc = item.s_description;
      this.sympDate = item.s_date;
      this.sympTime = item.s_time;
      this.sympType = item.s_type;
      this.sympMood = item.s_mood;
      this.ID       = item.s_id;
    }


    /**
     * Allow navigation to the AddSymptomPage for amending an existing entry
     * (We supply the actual record to be amended, as this method's parameter,
     * to the AddSymptomPage
     *
     * @public
     * @method viewEntry
     * @param param 		{any} 			Navigation data to send to the next page
     * @return {None}
     */
    viewEntry(param : any) : void
    {
      this.navCtrl.push('AddSymptomPage', param);      
    }

}