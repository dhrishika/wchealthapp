import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-add-symptom',
  templateUrl: 'add-symptom.html',
})
export class AddSymptomPage {

  public form                   : FormGroup;

  public taskName : any;
  public taskType  : any;
  public taskSDate  : any;
  public taskEDate  : any;
  public taskTime  : any;
  public taskRepeat  : any;
  
  public isEdited               : boolean = false;
  public pageTitle              : string;
  public recordID               : any      = null;

  private baseURI               : string  = "https://essence-of-you.000webhostapp.com/";
  hours: number;
  minutes: number;

  constructor(public navCtrl    : NavController,
    public http       : HttpClient,
    public NP         : NavParams,
    public fb         : FormBuilder,
    public toastCtrl  : ToastController,
    private localNotifications: LocalNotifications)
{

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
   createEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
   {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "create", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat },
        url       : any      	= this.baseURI + "create.php";

      this.http.post(url, JSON.stringify(options))
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.navCtrl.push('SymptomDiaryHomePage');
         this.sendNotification(`${name} was successfully added`);
      },
      (error : any) =>
      {
        console.log("Error is", error);
         this.sendNotification('Something went wrong!');
      });
   }
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
         this.navCtrl.push('SymptomDiaryHomePage');
         this.sendNotification(`${name} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }
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
        this.navCtrl.push('SymptomDiaryHomePage');
        this.sendNotification(`${name} was successfully deleted`);
      },
      (error : any) =>
      {
        console.log("Error = ", error);
        this.sendNotification('Something went wrong!');
      });
   }
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
