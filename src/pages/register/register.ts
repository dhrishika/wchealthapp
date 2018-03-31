import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  /**
 * @name form
 * @type {FormGroup}
 * @public
 * @description     Define FormGroup property for managing form validation / data retrieval
 */
  public form: FormGroup;

  public userEmail: any;
  public userPassword: any;



  /**
   * @name isEdited
   * @type {Boolean}
   * @public
   * @description     Flag to be used for checking whether we are adding/editing an entry
   */
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;

  private baseURI: string = "https://essence-of-you.000webhostapp.com/";

  constructor(public navCtrl: NavController, 
    public NP: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
      // Create form builder validation rules
      this.form = fb.group({
        "t_email"                  : ["", Validators.required],
        "t_password"           : ["", Validators.required],
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   tryRegister(email : string, password : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "login", "t_email" : email, "t_password" : password },
          url       : any      	= this.baseURI + "register.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations: ${email} has successfully registered`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }
      /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method register
    * @return {None}
    */
   register() : void
   {
      let email          : string = this.form.controls["t_email"].value,
          password   : string    = this.form.controls["t_password"].value;


         this.tryRegister(email, password);
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
