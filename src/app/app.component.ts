import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

<<<<<<< HEAD
  // List of pages that can be navigated to from the left menu
  pages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: "ProfilePage" },
    { title: 'Symptoms Diary', name: 'PrimaryTabsPage', component: 'SymptomDiaryHomePage', tabComponent: "SymptomDiaryHomePage" },
    { title: 'Reminders', name: 'PrimaryTabsPage', component: 'RemindersPage', tabComponent: "RemindersPage"},
    { title: 'About Us', name: 'AboutUsPage', component: "AboutUsPage"},
    { title: 'Logout', name: 'LogoutPage', component: "LogoutPage"}
  ];


  rootPage: any = PrimaryTabsPage;
=======
  rootPage: any = "HomePage";
>>>>>>> 0b1d8e0a81a85f2afa3d12d930f91abc3d0d18da
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
    this.pages = [
      { title: 'Profile', component: "ProfilePage" },
      { title: 'Symptoms Diary', component: "SymptomDiaryHomePage" },
      { title: 'Reminders', component: "RemindersPage" },
      { title: 'About Us', component: "AboutUsPage" },
      { title: 'Logout', component: "LogoutPage" }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
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
  
}