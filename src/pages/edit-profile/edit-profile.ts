import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
  public form: FormGroup;

  /**
  * @name Uname
  * @type {Any}
  * @public
  * @description     Model for managing the user Name field
  */
  public Uname: any;

  /**
  * @name Udob
  * @type {Any}
  * @public
  * @description     Model for managing the user Date of Birth field
  */
  public Udob: any;

  /**
  * @name Uweight
  * @type {Any}
  * @public
  * @description     Model for managing the user weight field
  */
  public Uweight: any;

  /**
  * @name Uheight
  * @type {Any}
  * @public
  * @description     Model for managing the user height field
  */
  public Uheight: any;


  /**
    * @name recordID 
    * @type {any} 
    * @public
    * @description     Property to store the recordID for when an existing entry is being edited
    */
  public recordID: any = null;


  /**
  * @name isEdited
  * @type {Boolean}
  * @public
  * @description     Flag to be used for checking whether we are adding/editing an entry
  */
  public isEdited               : boolean = false;

  /**
   * @name baseURI 
   * @type {string} 
   * @private 
   * @description     Remote URI for retrieving data from and sending data to
   */
  private baseURI               : string  = "http://womanovaapp.com/";

   // Initialise module classes
   constructor(public navCtrl            : NavController,
              public http                : HttpClient,
              public NP                  : NavParams,
              public fb                  : FormBuilder,
              public toastCtrl           : ToastController) {

      // Create form builder validation rules
      this.form = fb.group({
        "u_name"                  : ["", Validators.required],
        "u_dob"                   : ["", Validators.required],
        "u_weight"                : ["", Validators.required],
        "u_height"                : ["", Validators.required]
     });
  }


  /**
    * Triggered when template view is about to be entered
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.selectEntry(this.NP.get("record"));
      this.isEdited = true;
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
      this.Uname        = item.u_name;
      this.Udob         = item.u_dob;
      this.Uweight      = item.u_weight;
      this.Uheight      = item.u_height;
      this.recordID     = item.t_token;
   }


   /**
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method updateEntry
    * @param name 			  {String} 			Name value from form field
    * @param dob 	        {Date} 			  Date value from form field
    * @param weight 			{Number} 			Weight Number value from form field
    * @param height 	    {Number} 			Height Number value from form field
    * @return {None}
    */
   updateEntry(name : string, dob : Date, weight : number, height: number) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "update", "u_name" : name, "u_dob" : dob, "u_weight" : weight, "u_height" : height, "t_token" : this.recordID },
          url       : any      	= this.baseURI + "profile_update.php";

    this.http
      .post(url, JSON.stringify(options))
      .subscribe(data => {
        // If the request was successful notify the user
        //  this.navCtrl.setRoot(ReminderHomePage);
        this.navCtrl.pop();
        this.sendNotification(`${name} was successfully updated`);
      },
        (error: any) => {
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
    let name: string = this.form.controls["u_name"].value,
      dob: Date = this.form.controls["u_dob"].value,
      weight: number = this.form.controls["u_weight"].value,
      height: number = this.form.controls["u_height"].value;

    this.updateEntry(name, dob, weight, height);
  }


  /**
   * Clear values in the page's HTML form fields
   *
   * @public
   * @method resetFields
   * @return {None}
   */
  resetFields(): void {
    this.Uname = "";
    this.Udob = "";
    this.Uweight = "";
    this.Uheight = "";
  }

  /**
   * Manage notifying the user of the outcome of remote operations
   *
   * @public
   * @method sendNotification
   * @param    message 	    {String} 			Message to be displayed in the notification
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
