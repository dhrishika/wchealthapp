import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  tabComponent?: any;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  pages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: "ProfilePage" },
    { title: 'Symptoms Diary', name: 'PrimaryTabsPage', component: 'SymptomDiaryHomePage', tabComponent: "SymptomDiaryHomePage" },
    { title: 'Reminders', name: 'PrimaryTabsPage', component: 'RemindersPage', tabComponent: "RemindersPage"},
    { title: 'About Us', name: 'AboutUsPage', component: "AboutUsPage"},
    { title: 'Logout', name: 'LogoutPage', component: "LogoutPage"}
  ];


  rootPage: any = PrimaryTabsPage;
  pages: Array<{title: string, component: any}>;


  public storage : Storage;
  private baseURI: string = "http://womanovaapp.com/";

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private storage2: Storage, 
    public menu: MenuController, public http: HttpClient) {
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Profile', component: "ProfilePage" },
    //   { title: 'Symptoms Diary', component: "SymptomDiaryHomePage" },
    //   { title: 'Reminders', component: "RemindersPage" },
    //   { title: 'About Us', component: "AboutUsPage" },
    //   { title: 'Logout', component: "LogoutPage" }
    // ];

    this.storage = storage2;
    this.storage.get('authToken').then(() => {
      this.enableMenu(true);
    });
    this.enableMenu(true);

    this.checkLogin();
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.push(page.component);
    this.nav.setRoot(this.rootPage, {componentFromNavParams: page.component});
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  checkLogin(): void {
    this.storage.get('authToken').then((token) => {
      let headers : any = new HttpHeaders({ 'Content-Type': 'application/json' }),
          options : any = { "t_token": token, "key": "checkLogin" },
          url     : any = this.baseURI + "home.php";

      this.http.post(url, JSON.stringify(options))
        .subscribe((data: any) => {
          if (data && data['success']) {
            // If the request was successful notify the user
            // this.navCtrl.setRoot(ReminderHomePage);
          }
          else {
            console.log(data);
            this.enableMenu(true);
          }

        },
          (error: any) => {
            console.log("Error is", error);
            this.enableMenu(false);
          });
    });
  }
  
}