import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

     /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
   public form                   : FormGroup;

   public userEmail : any;
   public userPassword  : any;
   public userToken  : any;



   /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Flag to be used for checking whether we are adding/editing an entry
    */
   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;

   private baseURI               : string  = "https://essence-of-you.000webhostapp.com/";


  constructor(public navCtrl: NavController,
              public http       : HttpClient,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController) 
  {
      // Create form builder validation rules
      this.form = fb.group({
        "t_email"                  : ["", Validators.required],
        "t_password"           : ["", Validators.required],
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      this.userEmail    = item.t_email;
      this.userPassword = item.t_password;
      this.recordID     = item.id;
   }

   /**
    * Validate the login details that have been added to the page's HTML form with the database user table
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   tryLogin(email : string, password : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "login", "t_email" : email, "t_password" : password },
          url       : any      	= this.baseURI + "login.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations: ${email} has successfully logged in`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }

   /**
    * Handle data submitted from the page's HTML form
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   login() : void
   {
      let email          : string = this.form.controls["t_email"].value,
          password   : string    = this.form.controls["t_password"].value;


         this.tryLogin(email, password);
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
