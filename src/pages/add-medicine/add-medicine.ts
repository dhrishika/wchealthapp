import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage} from '@ionic/storage';
import * as moment from 'moment';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-add-medicine',
  templateUrl: 'add-medicine.html',
})
export class AddMedicinePage {
    
    /**
      * @name formM
      * @type {FormGroup}
      * @public
      * @description     Define FormGroup property for managing form validation / data retrieval
      */
    public formM                   : FormGroup;
  

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
     * @name itemID 
     * @type {any} 
     * @public
     * @description     Property to store the recordID for when an existing entry is being edited
     */
    public itemID                   : any      = null;


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

    /**
     * @name storage
     * @type {Storage}
     * @description     Represent the token stored with the user account
     */
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
     * @description     Property to store notification IDs in the medicine reminder table
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
  

     // Initialise module classes
    constructor(public navCtrl              : NavController,
                 public http                : HttpClient,
                 public NP                  : NavParams,
                 public fb                  : FormBuilder,
                 public toastCtrl           : ToastController,
                 private storage2           : Storage, 
                 public localNotifications  : LocalNotifications,
                 public platform: Platform)
    {
        this.storage = storage2;
        
        // Create form builder validation rules
        this.formM = fb.group({
           "m_name"                  : ["", Validators.required],
           "m_start_date"            : ["", Validators.required],
           "m_end_date"              : [""],
           "m_time"                  : ["", Validators.required],
           "noOfPills"               : ["", Validators.required],
           "m_repeat"                : ["", Validators.required],
           "m_notifyID"              : [""]
        });

        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();

        this.medTime = moment(new Date()).format(); 

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
        this.medName    = item.m_name;
        this.medSDate   = item.m_start_date;
        this.medEDate   = item.m_end_date;
        this.medTime    = item.m_time;
        this.medNoPills = item.noOfPills;
        this.medRepeat  = item.m_repeat;
        this.notifyID   = item.m_notifyID;
        this.itemID     = item.m_id;
    }
  
    
    /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param np 	        {number} 			No of Pills from form field
    * @param sDate 			{Date} 			    Start Date value from form field
    * @param eDate 	        {Date} 			    End Date value from form field
    * @param time 			{String} 			Time value from form field
    * @param repeat 	    {String} 			Repeat value from form field
    * @return {None}
    */
    createEntry(name : string, np : number, sDate : Date, eDate : Date, time : String, repeat : String) : void
    {
        this.getDifference();
        this.storage.get('authToken').then((token) => {
            let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                options 	: any		= { "t_token" : token, "key" : "create", "m_name" : name, "noOfPills" : np, "m_start_date" : sDate, "m_end_date" : eDate, "m_time" : time, "m_repeat" : repeat, "m_notifyID" : this.notifyID.toString() },
                url         : any      	= this.baseURI + "create-medicine.php";
        
          this.http.post(url, JSON.stringify(options))
          .subscribe((data : any) =>
          {
              if(data && data['success']){
                // If the request was successful notify the user
                // this.navCtrl.setRoot(ReminderHomePage);
                this.scheduleNotification();
                this.navCtrl.pop();
                this.sendNotification(`Congratulations the medicine: ${name} was successfully added`);
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
      * @public
      * @method updateEntry
      * @param name 			{String} 			Name value from form field
      * @param np 	            {number} 			No of Pills from form field
      * @param sDate 			{Date} 			    Start Date value from form field
      * @param eDate 	        {Date} 			    End Date value from form field
      * @param time 			{String} 			Time value from form field
      * @param repeat 	        {String} 			Repeat value from form field
      * @return {None}
    */
    updateEntry(name : string, np : number, sDate : Date, eDate : Date, time : String, repeat : String) : void
    {
        let startDate = moment(this.medSDate, "YYYY-MM-DD"),
            endDate   = moment(this.medEDate, "YYYY-MM-DD"),
            daysDiff  = 0;

        console.log("Notify ID", this.notifyID);

        this.IDs = this.notifyID.split(',');

        console.log("Array od additional ids", this.IDs);
        
        if(this.medRepeat.match("day")){
        daysDiff = endDate.diff(startDate, "days");
        }
        else if(this.medRepeat.match("week")){
        daysDiff = endDate.diff(startDate, "weeks");
        }
        else if(this.medRepeat.match("month")){
        daysDiff = endDate.diff(startDate, "months");
        }

        if(daysDiff > this.IDs.length){
            for(let i =0; i<=daysDiff; i++){
                this.IDs.push(Math.random().toFixed(10));
            }
        }

        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "key" : "update", "m_name" : name, "noOfPills" : np, "m_start_date" : sDate, "m_end_date" : eDate, "m_time" : time, "m_repeat" : repeat, "m_notifyID" : this.IDs.toString(), "m_id" : this.itemID },
            url         : any      	= this.baseURI + "update-medicine.php";
    
        this.http
        .post(url, JSON.stringify(options))
        .subscribe(data =>
        {
           // If the request was successful notify the user
            this.navCtrl.pop();
            this.sendNotification(`Congratulations the medicine: ${name} was successfully updated`);
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
        let name        : string 	= this.formM.controls["m_name"].value,
            headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "key" : "delete", "m_id" : this.itemID},
            url         : any      	= this.baseURI + "delete-medicine.php";
  
        this.http
        .post(url, JSON.stringify(options))
        .subscribe(data =>
        {
        //   this.navCtrl.setRoot(MedicineHomePage);
        this.navCtrl.pop();
          this.sendNotification(`Congratulations the medicine: ${name} was successfully deleted`);
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
        let name          : string      = this.formM.controls["m_name"].value,
            np            : number      = this.formM.controls["noOfPills"].value,
            sdate         : Date        = this.formM.controls["m_start_date"].value,
            edate         : Date        = this.formM.controls["m_end_date"].value,
            time          : string      = this.formM.controls["m_time"].value,
            repeat        : string      = this.formM.controls["m_repeat"].value;
  
        if(this.isEdited)
        {
           this.updateEntry(name, np, sdate, edate, time, repeat);
        }
        else
        {
           this.createEntry(name, np, sdate, edate, time, repeat);
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
        this.medName            = "";
        this.medNoPills         = "";
        this.medSDate           = "";
        this.medEDate           = "";
        this.medTime            = "";
        this.medRepeat          = "";
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
    let startDate = moment(this.medSDate, "YYYY-MM-DD"),
        endDate   = moment(this.medEDate, "YYYY-MM-DD"),
        daysDiff  = 0;

    if(this.medRepeat.match("day")){
    daysDiff = endDate.diff(startDate, "days");
    }
    if(this.medRepeat.match("week")){
    daysDiff = endDate.diff(startDate, "weeks");
    }
    if(this.medRepeat.match("month")){
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
   let firstDate = new Date(this.medSDate);
   firstDate.setHours(this.hours);
   firstDate.setMinutes(this.minutes);

   // set the End Date
   let lastDate = new Date(this.medEDate);
   lastDate.setHours(this.hours);
   lastDate.setMinutes(this.minutes);

   // convert dates to moments object
   let  SDate = moment(firstDate),
        LDate = moment(lastDate);

   // check if user included End Date
   if(this.medEDate === ""){
     let notification = {
         id: this.notifyID[0],
         title: 'Reminder Notification',
         text: `Do not forget your ${this.medName}`,
         at: firstDate,
         every: this.medRepeat
       };

       this.localNotifications.schedule(notification);
       console.log("Single Notification to be schedualed", notification);
   }

   // the user included an End Date
   else {
       while(SDate <= LDate){
            let date = SDate.toDate();
            date.setHours(this.hours);
            date.setMinutes(this.minutes);
            this.arr.push(date);

           if(this.medRepeat.match("day")){
               SDate = moment(SDate).add(1, 'day');
            }
            else if(this.medRepeat.match("week")){
                SDate = moment(SDate).add(1, 'week');
            }
            else if(this.medRepeat.match("month")){
                SDate = moment(SDate).add(1, 'month');
            }
            else{
                SDate = SDate;
            }
       }
       let i = 0;
       for(let day of this.arr){
        let notification = {
            id: this.notifyID[i],
            title: 'Reminder Notification',
            text: `You have a ${this.medName} medicine reminder`,
            at: day
        };
        i++;
        this.notifications.push(notification);
        this.localNotifications.schedule(notification);
       }
       console.log("Notifications to be schedualed", this.notifications);

       
    //    this.localNotifications.schedule(this.notifications);
   }
  }


  /** 
   * Manage cancel notifications and create new notifications
   * based on the updated Start and End Dates
  */
  updateNotification(){
//     //cancel any schedualed notifications
//     this.localNotifications.cancel(this.IDs);
//     console.log("Update--- ", this.IDs);
    
//    // create new notification with the new start and end dated
//    let firstDate = new Date(this.medSDate);
//    firstDate.setHours(this.hours);
//    firstDate.setMinutes(this.minutes);

//    let lastDate = new Date(this.medEDate);
//    lastDate.setHours(this.hours);
//    lastDate.setMinutes(this.minutes);

//    let SDate = moment(firstDate);
//    let EDate = moment(lastDate);

//    if(this.medEDate == "0000-00-00"){
//      let notification = {
//          id: this.IDs[0],
//          title: 'Reminder Notification',
//          text: `Do not forget your ${this.medName}`,
//          at: firstDate,
//          every: this.medRepeat
//        };

//        this.localNotifications.schedule(notification);
//        console.log("Single Notification to be updated", notification);
//    }

//    else {
//      while(SDate <= EDate){
//         let date = SDate.toDate();
//         date.setHours(this.hours);
//         date.setMinutes(this.minutes);
//         this.arr.push(date);

//        if(this.medRepeat.match("day")){
//            SDate = moment(SDate).add(1, 'days');
//        }
//        else if(this.medRepeat.match("week")){
//            SDate = moment(SDate).add(1, 'week');
//        }
//        else if(this.medRepeat.match("month")){
//            SDate = moment(SDate).add(1, 'month');
//        }
//        else{
//            SDate = SDate;
//        }
//      }
//      console.log("dates array", this.arr);
//      let i : number = 0;
//      for(let day of this.arr){
//         let notification = {
//            id: this.IDs[i],
//            title: 'Reminder Notification',
//            text: `Do not forget your ${this.medName}`,
//            at: day
//          };
//          i = i + 1;
//          this.notifications.push(notification);
           
//      }
//      console.log("Notifications to be updated", this.notifications);
//      this.localNotifications.schedule(this.notifications);
//    }
  }


  /** 
   * Manage canceling notifications if the user delete the reminder
   * 
  */
  cancelNotification(){
//    this.IDs = this.notifyID.split(',');
//    this.localNotifications.cancel(this.IDs);       
//    console.log("Delete: notification canceled", this.IDs);

 }
}