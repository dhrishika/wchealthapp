import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReminderHomePage } from '../reminder-home/reminder-home';
import { Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html'
})
export class AddReminderPage {



   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
   public form                   : FormGroup;

   public taskName : any;
   public taskType  : any;
   public taskSDate  : any;
   public taskEDate  : any;
   public taskTime  : any;
   public taskRepeat  : any;
   public storage : Storage;




   /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Flag to be used for checking whether we are adding/editing an entry
    */
   public isEdited               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;

   private baseURI               : string  = "https://essence-of-you.000webhostapp.com/";
   hours: number;
   minutes: number;


   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController,
               private localNotifications: LocalNotifications,
               private storage2: Storage)
   {
       this.storage = storage2;

      // Create form builder validation rules
      this.form = fb.group({
         "t_name"                  : ["", Validators.required],
         "t_type"           : ["", Validators.required],
         "t_start_date"                  : ["", Validators.required],
         "t_end_date"           : ["", Validators.required],
         "t_time"                  : ["", Validators.required],
         "t_repeat"           : ["", Validators.required]
      });
      this.hours = new Date().getHours();
      this.minutes = new Date().getMinutes();
   }

   timeChange(time){
    this.hours = time.hour;
    this.minutes = time.minute;
  }


   /**
    * Triggered when template view is about to be entered
    * Determine whether we adding or editing a record
    * based on any supplied navigation parameters
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Edit Reminder';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create Reminder';
      }
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
      this.taskName = item.t_name;
      this.taskType = item.t_type;
      this.taskSDate = item.t_start_date;
      this.taskEDate = item.t_end_date;
      this.taskTime = item.t_time;
      this.taskRepeat = item.t_repeat;
      this.recordID = item.t_id;
   }




   /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   createEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
   {
    this.storage.get('authToken').then((token) => {
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "t_token":token, "key" : "create", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat },
        url       : any      	= this.baseURI + "create.php";

      this.http.post(url, JSON.stringify(options))
      .subscribe((data : any) =>
      {
          if(data && data['success']){
            // If the request was successful notify the user
            // this.navCtrl.setRoot(ReminderHomePage);
            this.sendNotification(`${name} was successfully added`);
          }
          else{
            console.log(data);
            this.sendNotification(`${name} was not added successfully!`);
          }
         
      },
      (error : any) =>
      {
        console.log("Error is", error);
         this.sendNotification('Something went wrong!');
      });
    });
    
   }




   /**
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method updateEntry
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   updateEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "update", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat, "t_id" : this.recordID },
        url       : any      	= this.baseURI + "update.php";

      this.http
      .post(url, JSON.stringify(options))
      .subscribe(data =>
      {
         // If the request was successful notify the user
        //  this.navCtrl.setRoot(ReminderHomePage);
         this.sendNotification(`${name} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }




   /**
    * Remove an existing record that has been selected in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method deleteEntry
    * @return {None}
    */
   deleteEntry() : void
   {
      let name      : string 	= this.form.controls["t_name"].value,
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete", "t_id" : this.recordID},
          url       : any      	= this.baseURI + "delete.php";

      this.http
      .post(url, JSON.stringify(options))
      .subscribe(data =>
      {
        // this.navCtrl.setRoot(ReminderHomePage);
        this.sendNotification(`${name} was successfully deleted`);
      },
      (error : any) =>
      {
        console.log("Error = ", error);
        this.sendNotification('Something went wrong!');
      });
   }




   /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   saveEntry() : void
   {
      let name          : string = this.form.controls["t_name"].value,
          type   : string    = this.form.controls["t_type"].value,
          sdate : Date = this.form.controls["t_start_date"].value,
          edate   : Date    = this.form.controls["t_end_date"].value,
          time          : string = this.form.controls["t_time"].value,
          repeat   : string    = this.form.controls["t_repeat"].value;

      if(this.isEdited)
      {
         this.updateEntry(name, type, sdate, edate, time, repeat);
      }
      else
      {
         this.createEntry(name, type, sdate, edate, time, repeat);
          //---------------Create NOTIFICATION-----------------------------

          let startDateTime = new Date(this.taskSDate);
          let endDateTime = new Date(this.taskEDate);
      
          startDateTime.setHours(this.hours);
          startDateTime.setMinutes(this.minutes);
      
          let endDateNotification = endDateTime;
          endDateNotification.setHours(startDateTime.getHours() + 24);
          
          if(this.taskSDate != endDateNotification){
      
            let notification = {
              id: Math.random() * 101,
              title: 'Reminder Notification',
              text: `Do not forget your ${this.taskName}`,
              at: startDateTime,
              every: this.taskRepeat
            };
            this.localNotifications.schedule(notification);
            console.log("the notification is on: ", notification);
          }
          else if(endDateNotification > endDateTime){
            this.localNotifications.cancel(this.recordID);
          }  
      }
   }




   /**
    * Clear values in the page's HTML form fields
    *
    * @public
    * @method resetFields
    * @return {None}
    */
   resetFields() : void
   {
      this.taskName           = "";
      this.taskType    = "";
      this.taskSDate           = "";
      this.taskEDate    = "";
      this.taskTime           = "";
      this.taskRepeat    = "";
   }




   /**
    * Manage notifying the user of the outcome of remote operations
    *
    * @public
    * @method sendNotification
    * @param message 	{String} 			Message to be displayed in the notification
    * @return {None}
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}