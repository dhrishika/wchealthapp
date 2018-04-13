import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-view-medicine',
  templateUrl: 'view-medicine.html',
})
export class ViewMedicinePage {


    /**
    * @name medName
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder Name field
    */
    public medName                  : any;

    /**
    * @name medSDate
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder Start Date field
    */
    public medSDate                 : any;

    /**
    * @name medEDate
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder End Date field
    */
    public medEDate                 : any;

    /**
    * @name medTime
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder Time field
    */
    public medTime                  : any;

    /**
    * @name medNoPills
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder Number of Pills field
    */
    public medNoPills               : any;

    /**
    * @name medName
    * @type {Any}
    * @public
    * @description      Model for managing the medicine reminder Repeat field
    */
    public medRepeat                : any;

    /**
     * @name recordID 
     * @type {any} 
     * @public
     * @description     Property to store the recordID for when an existing entry is being edited
     */
    public recordID               : any      = null;

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
  

    /**
    * Assign the navigation retrieved data to properties
    * used as models on the page's HTML form
    *
    * @public
    * @method selectEntry
    * @param item 		{any} 			Navigation data
    * @return {None}
    */
   selectEntry(item : any) : void
   {
       this.medName    = item.m_name;
       this.medSDate   = item.m_start_date;
       this.medEDate   = item.m_end_date;
       this.medTime    = item.m_time;
       this.medNoPills = item.noOfPills;
       this.medRepeat  = item.m_repeat;
       this.recordID     = item.m_id;
   }


    /**
     * Allow navigation to the AddMedicinePage for amending an existing entry
     * (We supply the actual record to be amended, as this method's parameter,
     * to the AddMedicinePage
     *
     * @public
     * @method viewEntry
     * @param param 		{any} 			Navigation data to send to the next page
     * @return {None}
     */
    viewEntry(param : any) : void
    {
      this.navCtrl.push('AddMedicinePage', param);      
    }

}