import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-symptom',
  templateUrl: 'add-symptom.html',
})
export class AddSymptomPage {

    /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
    public form                   : FormGroup;

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


    public storage : Storage;
    
    /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Flag to be used for checking whether we are adding/editing an entry
    */
    public isEdited               : boolean = false;
  
    /**
     * @name pageTitle
     * @type {String}
     * @public
     * @description     Property to help set the page title
     */
    public pageTitle              : string;

    /**
     * @name recordID 
     * @type {any} 
     * @public
     * @description     Property to store the recordID for when an existing entry is being edited
     */
    public recordID               : any      = null;

    /**
     * @name baseURI 
     * @type {string} 
     * @private 
     * @description     Remote URI for retrieving data from and sending data to
     */
    private baseURI               : string  = "http://womanovaapp.com/";


  // Initialise module classes
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    private localNotifications: LocalNotifications,
    private storage2: Storage) {
    
      this.storage = storage2;

      // Create form builder validation rules
      this.form = fb.group({
        "s_name": ["", Validators.required],
        "s_description": [""],
        "s_date": ["", Validators.required],
        "s_time": [""],
        "s_type": ["", Validators.required],
        "s_mood": ["", Validators.required]
      });
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
  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Edit Symptom';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Create Symptom';
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
  selectEntry(item: any): void {
    this.sympName = item.s_name;
    this.sympDesc = item.s_description;
    this.sympDate = item.s_date;
    this.sympTime = item.s_time;
    this.sympType = item.s_type;
    this.sympMood = item.s_mood;
    this.recordID = item.s_id;
  }


    /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			  {String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @param date 			  {Date} 			  Date value from form field
    * @param time 			  {String} 			Time value from form field
    * @param type 			  {String []} 	Type array from form field
    * @param mood 			  {String} 			Mood value from form field
    * @return {None}
    */
    createEntry(name : string, description: string, date : Date, time : String, type : string[], mood : String) : void
    {
      this.storage.get('authToken').then((token) => {
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "t_token":token, "key" : "create", "s_name" : name, "s_description" : description, "s_date" : date, "s_time" : time, "s_type" : type.toString(), "s_mood" : mood },
            url       : any   = this.baseURI + "symp_create.php";

      this.http.post(url, JSON.stringify(options))
        .subscribe((data: any) => {
          if (data && data['success']) {
            // If the request was successful notify the user
            // this.navCtrl.setRoot(ReminderHomePage);
            this.navCtrl.pop();
            this.sendNotification(`${name} was successfully added`);

          }
          else {
            console.log(data);
            this.sendNotification(`${name} was not added successfully!`);
          }

        },
          (error: any) => {
            console.log("Error is", error);
            this.sendNotification('Something went wrong!');
          });
    });
  }

    /**
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    * @param name 			{String} 			Name value from form field
    * @param np 	      {number} 			No of Pills from form field
    * @param sDate 			{Date} 			  Start Date value from form field
    * @param eDate 	    {Date} 			  End Date value from form field
    * @param time 			{String} 			Time value from form field
    * @param repeat 	  {String} 			Repeat value from form field
    * @return {None}
    */
    updateEntry(name : string, description: string, date : Date, time : String, type : string[], mood : String) : void
    {
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "key" : "create", "s_name" : name, "s_description" : description, "s_date" : date, "s_time" : time, "s_type" : type.toString(), "s_mood" : mood, "s_id" : this.recordID },
            url       : any   = this.baseURI + "symp_update.php";

    this.http
      .post(url, JSON.stringify(options))
      .subscribe(data => {
        // If the request was successful notify the user
        this.navCtrl.pop();
        this.sendNotification(`${name} was successfully updated`);
      },
        (error: any) => {
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
  deleteEntry(): void {
    let name      : string    = this.form.controls["s_name"].value,
        headers   : any       = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options   : any       = { "key": "delete", "s_id": this.recordID },
        url       : any       = this.baseURI + "symp_delete.php";

    this.http
      .post(url, JSON.stringify(options))
      .subscribe(data => {
        this.navCtrl.pop();
        this.sendNotification(`${name} was successfully deleted`);
      },
        (error: any) => {
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
  saveEntry(): void {
    let name        : string    = this.form.controls["s_name"].value,
      description   : string    = this.form.controls["s_description"].value,
      date          : Date      = this.form.controls["s_date"].value,
      time          : string    = this.form.controls["s_time"].value,
      type          : string[]  = this.form.controls["s_type"].value,
      mood          : string    = this.form.controls["s_mood"].value;

    if (this.isEdited) {
      this.updateEntry(name, description, date, time, type, mood);
    }
    else {
      this.createEntry(name, description, date, time, type, mood);
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
    this.sympName       = "";
    this.sympDesc       = "";
    this.sympDate       = "";
    this.sympTime       = "";
    this.sympType       = "";
    this.sympMood       = "";
  }

  /**
  * Manage notifying the user of the outcome of remote operations
  *
  * @public
  * @method sendNotification
  * @param message 	{String} 			Message to be displayed in the notification
  * @return {None}
  */
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
