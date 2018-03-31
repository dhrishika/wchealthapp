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

  public sympName : any;
  public sympType  : any;
  public sympDesc  : any;
  public sympDate  : any;
  public sympTime  : any;
  public sympMood  : any;
  
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
"s_name"                  : ["", Validators.required],
"s_description"           : [""],
"s_date"           : ["", Validators.required],
"s_time"                  : [""],
"s_type"           : ["", Validators.required],
"s_mood"           : ["", Validators.required]
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
         this.pageTitle     = 'Edit Symptom';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create Symptom';
      }
   }
   selectEntry(item : any) : void
   {
      this.sympName = item.s_name;
      this.sympDesc = item.s_description;
      this.sympDate = item.s_date;
      this.sympTime = item.s_time;
      this.sympType = item.s_type;
      this.sympMood = item.s_mood;
      this.recordID = item.s_id;
   }
   createEntry(name : string, description: string, date : Date, time : String, type : string, mood : String) : void
   {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "create", "s_name" : name, "s_description" : description, "s_date" : date, "s_time" : time, "s_type" : type, "s_mood" : mood },
        url       : any      	= this.baseURI + "symp_create.php";

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
  //  updateEntry(name : string, type : string, sDate : Date, eDate : Date, time : String, repeat : String) : void
  //  {
  //     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       options 	: any		= { "key" : "update", "t_name" : name, "t_type" : type, "t_start_date" : sDate, "t_end_date" : eDate, "t_time" : time, "t_repeat" : repeat, "t_id" : this.recordID },
  //       url       : any      	= this.baseURI + "update.php";

  //     this.http
  //     .post(url, JSON.stringify(options))
  //     .subscribe(data =>
  //     {
  //        // If the request was successful notify the user
  //        this.navCtrl.push('SymptomDiaryHomePage');
  //        this.sendNotification(`${name} was successfully updated`);
  //     },
  //     (error : any) =>
  //     {
  //        this.sendNotification('Something went wrong!');
  //     });
  //  }
  //  deleteEntry() : void
  //  {
  //     let name      : string 	= this.form.controls["t_name"].value,
  //         headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  //         options 	: any		= { "key" : "delete", "t_id" : this.recordID},
  //         url       : any      	= this.baseURI + "delete.php";

  //     this.http
  //     .post(url, JSON.stringify(options))
  //     .subscribe(data =>
  //     {
  //       this.navCtrl.push('SymptomDiaryHomePage');
  //       this.sendNotification(`${name} was successfully deleted`);
  //     },
  //     (error : any) =>
  //     {
  //       console.log("Error = ", error);
  //       this.sendNotification('Something went wrong!');
  //     });
  //  }
  //  saveEntry() : void
  //  {
  //     let name          : string = this.form.controls["t_name"].value,
  //         type   : string    = this.form.controls["t_type"].value,
  //         sdate : Date = this.form.controls["t_start_date"].value,
  //         edate   : Date    = this.form.controls["t_end_date"].value,
  //         time          : string = this.form.controls["t_time"].value,
  //         repeat   : string    = this.form.controls["t_repeat"].value;

  //     if(this.isEdited)
  //     {
  //        this.updateEntry(name, type, sdate, edate, time, repeat);
  //     }
  //     else
  //     {
  //        this.createEntry(name, description, date, time, type, mood);
  //         //---------------Create NOTIFICATION-----------------------------

  //         let startDateTime = new Date(this.taskSDate);
  //         let endDateTime = new Date(this.taskEDate);
      
  //         startDateTime.setHours(this.hours);
  //         startDateTime.setMinutes(this.minutes);
      
  //         let endDateNotification = endDateTime;
  //         endDateNotification.setHours(startDateTime.getHours() + 24);
          
  //         if(this.taskSDate != endDateNotification){
      
  //           let notification = {
  //             id: Math.random() * 101,
  //             title: 'Reminder Notification',
  //             text: `Do not forget your ${this.taskName}`,
  //             at: startDateTime,
  //             every: this.taskRepeat
  //           };
  //           this.localNotifications.schedule(notification);
  //           console.log("the notification is on: ", notification);
  //         }
  //         else if(endDateNotification > endDateTime){
  //           this.localNotifications.cancel(this.recordID);
  //         }  
  //     }
  //  }
   resetFields() : void
   {
      this.sympName           = "";
      this.sympDesc    = "";
      this.sympDate           = "";
      this.sympTime    = "";
      this.sympType           = "";
      this.sympMood    = "";
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