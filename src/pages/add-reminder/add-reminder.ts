import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage} from '@ionic/storage';
import * as moment from 'moment';

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
      * @name arr
      * @type {any[]}
      * @description    Array that will contain the dates between the start and end dates
      */
    arr                             : any[] = [];

    /**
      * @name notifications
      * @type {any[]}
      * @description    Array that we will contain all the local notifications the user adds
      */
    notifications                   : any[] = [];


    /**
     * @name hours
     * @type {number}
     * @description     Represent the hour of the day that the user wants to be notified
    */
    hours                           : number;

    /**
     * @name minutes
     * @type {number}
     * @description     Represent the minutes of the day that the user wants to be notified
     */
    minutes                         : number;

    /**
     * @name notifyTime
     * @type {any}
     * @description     Contain an ISO datetime string to set a default time for the <ion-datetime> input field
     */
    notifyTime: any;


    public storage                  : Storage;
  
   /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description      Flag to be used for checking whether we are adding/editing an entry
    */
    public isEdited               : boolean = false;

    /**
     * @name pageTitle
     * @type {String}
     * @public
     * @description     Property to help set the page title
     */
    public pageTitle                : string;


    /**
     * @name baseURI 
     * @type {string} 
     * @private 
     * @description     Remote URI for retrieving data from and sending data to
     */
    private baseURI               : string  = "http://womanovaapp.com/";

    /**
     * @name notifyID
     * @type {any}
     * @public
     * @description     Property to store notification IDs in the task reminder table
     */
    public notifyID             : any;

    /**
     * @name IDs
     * @type {any}
     * @public
     * @description     Property to update the notification IDs for when an existing entry is being edited    
     */
    public IDs                  : any;

    /**
     * @name minDate
     * @type {any}
     * @description     Property to manage the minimum date for start date
     */
    minStartDate  : any;

    /**
     * @name minDate
     * @type {any}
     * @description     Property to manage the minimum date for end date
     */
    minEndDate  : any;
  

     // Initialise module classes
    constructor(public navCtrl              : NavController,
                 public http                : HttpClient,
                 public NP                  : NavParams,
                 public fb                  : FormBuilder,
                 public toastCtrl           : ToastController,
                 private storage2           : Storage, 
                 public localNotifications  : LocalNotifications)
    {
        this.storage = storage2;
        
        // Create form builder validation rules
        this.form = fb.group({
          "t_name"                   : ["", Validators.required],
          "t_type"                   : ["", Validators.required],
          "t_start_date"             : ["", Validators.required],
          "t_end_date"               : [""],
          "t_time"                   : ["", Validators.required],
          "t_repeat"                 : ["", Validators.required],
          "t_notifyID"               : [""]
        });

        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();

        this.taskTime = moment(new Date()).format(); 

        this.minStartDate = new Date().toISOString();
    }


    /**
      * This function listens for change in the <ion-datetime> input
      * that we will add to getNotify function
      * 
      * @param time 
      */
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
      this.taskName     = item.t_name;
      this.taskType     = item.t_type;
      this.taskSDate    = item.t_start_date;
      this.taskEDate    = item.t_end_date;
      this.taskTime     = item.t_time;
      this.taskRepeat   = item.t_repeat;
      this.notifyID     = item.t_notifyID;
      this.recordID     = item.t_id;
    }
  
    
     /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param type 	    {String} 			Type value from form field
    * @param sDate 			{Date} 			  Start Date value from form field
    * @param eDate 	    {Date} 			  End Date value from form field
    * @param time 			{String} 			Time value from form field
    * @param repeat 	  {String} 			Repeat value from form field
    * @return {None}
    */
   createEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
   {
        this.getDifference();
        this.storage.get('authToken').then((token) => {
            let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                options 	: any		= { "t_token" : token, "key" : "create", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat, "t_notifyID" : this.notifyID.toString() },
                url       : any      	= this.baseURI + "create.php";
        
          this.http.post(url, JSON.stringify(options))
          .subscribe((data : any) =>
          {
              if(data && data['success']){
                // If the request was successful notify the user
                this.scheduleNotification();
                this.navCtrl.pop();
                this.sendNotification(`Congratulations the reminder: ${name} was successfully added`);
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
    * @param type 	        {String} 			Type value from form field
    * @param sDate 			{Date} 			    Start Date value from form field
    * @param eDate 	        {Date} 			    End Date value from form field
    * @param time 			{String} 			Time value from form field
    * @param repeat 	    {String} 			Repeat value from form field
    * @return {None}
    */
   updateEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
   {
        let startDate = moment(this.taskSDate, "YYYY-MM-DD"),
            endDate   = moment(this.taskEDate, "YYYY-MM-DD"),
            daysDiff  = 0;

        console.log("Notify ID", this.notifyID);

        this.IDs = this.notifyID.split(',');

        console.log("Array od additional ids", this.IDs);
        
        if(this.taskRepeat.match("day")){
        daysDiff = endDate.diff(startDate, "days");
        }
        else if(this.taskRepeat.match("week")){
        daysDiff = endDate.diff(startDate, "weeks");
        }
        else if(this.taskRepeat.match("month")){
        daysDiff = endDate.diff(startDate, "months");
        }

        if(daysDiff > this.IDs.length){
            for(let i =0; i<=daysDiff; i++){
                this.IDs.push(Math.random().toFixed(10));
            }
        }

        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "key" : "update", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat, "t_notifyID" : this.IDs.toString(), "t_id" : this.recordID },
            url       : any      	= this.baseURI + "update.php";
        
        this.http
        .post(url, JSON.stringify(options))
        .subscribe(data =>
        {
           // If the request was successful notify the user
          this.navCtrl.pop();
          this.sendNotification(`Congratulations the reminder: ${name} was successfully updated`);
          this.updateNotification();
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
      let name        : string 	= this.form.controls["t_name"].value,
          headers 	  : any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	  : any		= { "key" : "delete", "t_id" : this.recordID},
          url         : any      	= this.baseURI + "delete.php";

      this.http
      .post(url, JSON.stringify(options))
      .subscribe(data =>
      {
        this.navCtrl.pop();
        this.sendNotification(`Congratulations the reminder: ${name} was successfully deleted`);
        this.cancelNotification();
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
      let name          : string    = this.form.controls["t_name"].value,
          type          : string    = this.form.controls["t_type"].value,
          sdate         : Date      = this.form.controls["t_start_date"].value,
          edate         : Date      = this.form.controls["t_end_date"].value,
          time          : string    = this.form.controls["t_time"].value,
          repeat        : string    = this.form.controls["t_repeat"].value;

      if(this.isEdited)
      {
        this.updateEntry(name, type, sdate, edate, time, repeat);
      }
      else
      {
        this.createEntry(name, type, sdate, edate, time, repeat);
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
      this.taskName         = "";
      this.taskType         = "";
      this.taskSDate        = "";
      this.taskEDate        = "";
      this.taskTime         = "";
      this.taskRepeat       = "";
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
  
    /** 
    * Manage creating IDs based on the difference between Start and End Dates
    * to use it for creating notification
   */
   getDifference(){
    this.notifyID = [];
    let startDate = moment(this.taskSDate, "YYYY-MM-DD"),
        endDate   = moment(this.taskEDate, "YYYY-MM-DD"),
        daysDiff  = 0;

    if(this.taskRepeat.match("day")){
      daysDiff = endDate.diff(startDate, "days");
    }
    if(this.taskRepeat.match("week")){
      daysDiff = endDate.diff(startDate, "weeks");
    }
    if(this.taskRepeat.match("month")){
      daysDiff = endDate.diff(startDate, "months");
    }

    for(let i =0; i<=daysDiff +1; i++){
      this.notifyID.push(Math.random().toFixed(10));
    }
    console.log("Days differene", daysDiff);
    console.log("the notification Array", this.notifyID);
  }
 
  /** 
   * Manage creating notification to notify the user about 
   * the created reminder
   * 
  */
  scheduleNotification(){
    //set the start Date
   let firstDate = new Date(this.taskSDate);
   firstDate.setHours(this.hours);
   firstDate.setMinutes(this.minutes);

   // set the End Date
   let lastDate = new Date(this.taskEDate);
   lastDate.setHours(this.hours);
   lastDate.setMinutes(this.minutes);

   // convert dates to moments object
   let SDate = moment(firstDate);
   let EDate = moment(lastDate);

   // check if user included End Date
   if(this.taskEDate === ""){
     let notification = {
         id: this.notifyID[0],
         title: 'Reminder Notification',
         text: `Do not forget your ${this.taskName}`,
         at: firstDate,
         every: this.taskRepeat
       };

       this.localNotifications.schedule(notification);
       console.log("Single Notification to be schedualed", notification);
   }

   // the user included an End Date
   else {
     while(SDate <= EDate){
      // create an array of dates from start untill end dates
      let date = SDate.toDate();
      date.setHours(this.hours);
      date.setMinutes(this.minutes);
      this.arr.push(date);
       
      if(this.taskRepeat.match("day")){
          SDate = moment(SDate).add(1, 'days');
      }
      else if(this.taskRepeat.match("week")){
          SDate = moment(SDate).add(1, 'week');
      }
      else if(this.taskRepeat.match("month")){
          SDate = moment(SDate).add(1, 'month');
      }
      else{
          SDate = SDate;
      }
     }
     console.log("dates array", this.arr);
     // create notification objects
     let i : number = 0;
     for(let day of this.arr){
         let notification = {
             id: this.notifyID[i],
             title: 'Reminder Notification',
             text: `Do not forget your ${this.taskName}`,
             at: day
           };
           i = i + 1;
           this.notifications.push(notification);
           
     }
     console.log("Notifications to be schedualed", this.notifications);
     // schedule the array of notifications
     this.localNotifications.schedule(this.notifications);
   }
  }


  /** 
   * Manage cancel notifications and create new notifications
   * based on the updated Start and End Dates
  */
  updateNotification(){
    //cancel any schedualed notifications
    this.localNotifications.cancel(this.IDs);       
    console.log("Update: notification canceled", this.IDs);

   // create new notification with the new start and end dated
   let firstDate = new Date(this.taskSDate);
   firstDate.setHours(this.hours);
   firstDate.setMinutes(this.minutes);

   let lastDate = new Date(this.taskEDate);
   lastDate.setHours(this.hours);
   lastDate.setMinutes(this.minutes);

   let SDate = moment(firstDate);
   let EDate = moment(lastDate);

   if(this.taskEDate == "0000-00-00"){
     let notification = {
         id: this.IDs[0],
         title: 'Reminder Notification',
         text: `Do not forget your ${this.taskName}`,
         at: firstDate,
         every: this.taskRepeat
       };

       this.localNotifications.schedule(notification);
       console.log("Single Notification to be updated", notification);
   }

   else {
     while(SDate <= EDate){
      let date = SDate.toDate();
      date.setHours(this.hours);
      date.setMinutes(this.minutes);
      this.arr.push(date);

      if(this.taskRepeat.match("day")){
          SDate = moment(SDate).add(1, 'days');
      }
      else if(this.taskRepeat.match("week")){
          SDate = moment(SDate).add(1, 'week');
      }
      else if(this.taskRepeat.match("month")){
          SDate = moment(SDate).add(1, 'month');
      }
      else{
          SDate = SDate;
      }
     }
     console.log("dates array", this.arr);
     let i : number = 0;
     for(let day of this.arr){
      // day.setHours(this.hours);
      // day.setMinutes(this,this.minutes);
       let notification = {
           id: this.IDs[i],
           title: 'Reminder Notification',
           text: `Do not forget your ${this.taskName}`,
           at: day
         };
         i = i + 1;
         this.notifications.push(notification);
           
     }
     console.log("Notifications to be updated", this.notifications);
     this.localNotifications.schedule(this.notifications);
   }
  }


  /** 
   * Manage canceling notifications if the user delete the reminder
   * 
  */
  cancelNotification(){
    this.IDs = this.notifyID.split(',');
    this.localNotifications.cancel(this.IDs);       
    console.log("Delete: notification canceled", this.IDs);
 }
}