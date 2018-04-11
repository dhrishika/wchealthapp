import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MedicineHomePage } from '../medicine-home/medicine-home';
import { Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-add-medicine',
  templateUrl: 'add-medicine.html',
})
export class AddMedicinePage {

    hours: number;
    minutes: number;
    
     /**
      * @name form
      * @type {FormGroup}
      * @public
      * @description     Define FormGroup property for managing form validation / data retrieval
      */
     public formM                   : FormGroup;
  
     public medName : any;
     public medSDate  : any;
     public medEDate  : any;
     public medTime  : any;
     public medNoPills  : any;
     public medRepeat  : any;
     public storage : Storage;
  
  
  
  
     /**
      * @name isEdited
      * @type {Boolean}
      * @public
      * @description     Flag to be used for checking whether we are adding/editing an entry
      */
     public isEdited               : boolean = false;
     public hideForm               : boolean = false;
     public pageTitle              : string;
     public itemID               : any      = null;
  
     private baseURI               : string  = "http://womanovaapp.com/";
  
  
  
  
     // Initialise module classes
     constructor(public navCtrl    : NavController,
                 public http       : HttpClient,
                 public NP         : NavParams,
                 public fb         : FormBuilder,
                 public toastCtrl  : ToastController,
                 private storage2: Storage)
     {
        this.storage = storage2;
        
        // Create form builder validation rules
        this.formM = fb.group({
           "m_name"                  : ["", Validators.required],
           "m_start_date"                  : ["", Validators.required],
           "m_end_date"           : ["", Validators.required],
           "m_time"                  : ["", Validators.required],
           "noOfPills"           : ["", Validators.required],
           "m_repeat"           : ["", Validators.required]
        });

        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
     }

     timeChange(time){
        this.hours = time.hour;
        this.minutes = time.minute;
      }
  
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
        this.medName = item.m_name;
        this.medSDate = item.m_start_date;
        this.medEDate = item.m_end_date;
        this.medTime = item.m_time;
        this.medNoPills = item.noOfPills;
        this.medRepeat = item.m_repeat;
        this.itemID = item.m_id;
     }
  
     createEntry(name : string, np : number, sDate : Date, eDate : Date, time : String, repeat : String) : void
     {
        this.storage.get('authToken').then((token) => {
            let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "t_token":token, "key" : "create", "m_name" : name, "noOfPills" : np, "m_start_date" : sDate, "m_end_date" : eDate, "m_time" : time, "m_repeat" : repeat },
            url       : any      	= this.baseURI + "create-medicine.php";
    
          this.http.post(url, JSON.stringify(options))
          .subscribe((data : any) =>
          {
              if(data && data['success']){
                // If the request was successful notify the user
                // this.navCtrl.setRoot(ReminderHomePage);
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
      */
     updateEntry(name : string, np : number, sDate : Date, eDate : Date, time : String, repeat : String) : void
     {
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "update", "m_name" : name, "noOfPills" : np, "m_start_date" : sDate, "m_end_date" : eDate, "m_time" : time, "m_repeat" : repeat, "m_id" : this.itemID },
        url       : any      	= this.baseURI + "update-medicine.php";
  
        this.http
        .post(url, JSON.stringify(options))
        .subscribe(data =>
        {
           // If the request was successful notify the user
        //    this.navCtrl.setRoot(MedicineHomePage);
        this.navCtrl.pop();
           this.sendNotification(`Congratulations the medicine: ${name} was successfully updated`);
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
        let name      : string 	= this.formM.controls["m_name"].value,
            headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= { "key" : "delete", "m_id" : this.itemID},
            url       : any      	= this.baseURI + "delete-medicine.php";
  
        this.http
        .post(url, JSON.stringify(options))
        .subscribe(data =>
        {
        //   this.navCtrl.setRoot(MedicineHomePage);
        this.navCtrl.pop();
          this.sendNotification(`Congratulations the medicine: ${name} was successfully deleted`);
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
        let name          : string = this.formM.controls["m_name"].value,
            np   : number    = this.formM.controls["noOfPills"].value,
            sdate : Date = this.formM.controls["m_start_date"].value,
            edate   : Date    = this.formM.controls["m_end_date"].value,
            time          : string = this.formM.controls["m_time"].value,
            repeat   : string    = this.formM.controls["m_repeat"].value;
  
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
        this.medName           = "";
        this.medNoPills    = "";
        this.medSDate           = "";
        this.medEDate    = "";
        this.medTime           = "";
        this.medRepeat    = "";
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