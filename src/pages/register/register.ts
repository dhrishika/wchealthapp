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

  /**
    * @name userEmail
    * @type {Any}
    * @public
    * @description      Model for managing the User Email field
    */
  public userEmail: any;

  /**
  * @name userPassword
  * @type {Any}
  * @public
  * @description      Model for managing the User Password field
  */
  public userPassword: any;

  /**
  * @name userName
  * @type {Any}
  * @public
  * @description      Model for managing the User Name field
  */
  public userName: any;

  /**
  * @name userDOB
  * @type {Any}
  * @public
  * @description      Model for managing the User Date of Birth field
  */
  public userDOB: any;

  /**
  * @name userWeight
  * @type {Any}
  * @public
  * @description      Model for managing the User Weight field
  */
  public userWeight: any;

  /**
  * @name userHeight
  * @type {Any}
  * @public
  * @description      Model for managing the User Height field
  */
  public userHeight: any;


  /**
   * @name isEdited
   * @type {Boolean}
   * @public
   * @description     Flag to be used for checking whether we are adding/editing an entry
   */
  public isEdited: boolean = false;


  private baseURI: string = "http://womanovaapp.com/";

  constructor(public navCtrl: NavController,
    public NP: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {
    // Create form builder validation rules
    this.form = fb.group({
      "t_email": ["", Validators.required],
      "t_password": ["", Validators.required],
      "u_name": ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      "u_dob": [""],
      "u_weight": [""],
      "u_height": [""],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  /**
   * Save a new user that has been added to the page's HTML form
   * Use angular's http post method to submit the record data
   *
   * @public
   * @method createEntry
   * @param email 			{String} 			Email value from form field
   * @param password 	  {String} 			Password value from form field
   * @param name 			  {String} 			Name value from form field
   * @param dob 			  {Date} 			  Date of Birth value from form field
   * @param weight 			{Number} 			Weight value from form field
   * @param height 			{Number} 			Height value from form field
   * @return {None}
   */
  tryRegister(email: String, password: String, name: String, dob: Date, weight: Number, height: Number): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "login", "t_email": email, "t_password": password, "u_name": name, "u_dob": dob, "u_weight": weight, "u_height": height },
      url: any = this.baseURI + "register.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        if (data && data['success']) {
          this.navCtrl.pop();
          this.sendNotification(`Congratulations: ${email} has successfully registered`);
        }
        else {
          this.sendNotification('This email already exists!');
        }
      },
        (error: any) => {
          console.log("Error is", error);
          this.sendNotification('Something went wrong!');
        });
  }


  /**
  * Handle data submitted from the page's HTML form
  *
  * @public
  * @method register
  * @return {None}
  */
  register(): void {
    let email: string = this.form.controls["t_email"].value,
      password: string = this.form.controls["t_password"].value,
      name: string = this.form.controls["u_name"].value,
      dob: Date = this.form.controls["u_dob"].value,
      weight: Number = this.form.controls["u_weight"].value,
      height: Number = this.form.controls["u_height"].value;


    this.tryRegister(email, password, name, dob, weight, height);
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
