import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-view-reminder',
  templateUrl: 'view-reminder.html',
})
export class ViewReminderPage {


/**
    * @name taskName
    * @type {Any}
    * @public
    * @description     Model for managing the task reminder Name field
    */
   public taskName               : any;

   /**
   * @name taskType
   * @type {Any}
   * @public
   * @description     Model for managing the task reminder Type field
   */
   public taskType               : any;

   /**
   * @name taskSDate
   * @type {Any}
   * @public
   * @description     Model for managing the task reminder Start Date field
   */
   public taskSDate              : any;

   /**
   * @name taskEDate
   * @type {Any}
   * @public
   * @description     Model for managing the task reminder End Date field
   */
   public taskEDate              : any;

   /**
   * @name taskTime
   * @type {Any}
   * @public
   * @description     Model for managing the task reminder Time field
   */
   public taskTime               : any;

   /**
   * @name taskRepeat
   * @type {Any}
   * @public
   * @description     Model for managing the task reminder Repeat field
   */
   public taskRepeat             : any;

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
      this.taskName     = item.t_name;
      this.taskType     = item.t_type;
      this.taskSDate    = item.t_start_date;
      this.taskEDate    = item.t_end_date;
      this.taskTime     = item.t_time;
      this.taskRepeat   = item.t_repeat;
      this.recordID     = item.t_id;
   }


    /**
     * Allow navigation to the AddReminderPage for amending an existing entry
     * (We supply the actual record to be amended, as this method's parameter,
     * to the AddReminderPage
     *
     * @public
     * @method viewEntry
     * @param param 		{any} 			Navigation data to send to the next page
     * @return {None}
     */
    viewEntry(param : any) : void
    {
      this.navCtrl.push('AddReminderPage', param);      
    }

}
