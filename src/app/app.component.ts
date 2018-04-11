import { FaqsPage } from './../pages/faqs/faqs';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "RegPage";
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;


  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: "ProfilePage" },
      { title: 'Symptoms Diary', component: "SymptomDiaryHomePage" },
      { title: 'Reminders', component: "RemindersPage" },
      { title: 'FAQS', component: "FaqsPage" },
      { title: 'Logout', component: "LogoutPage" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  profile(){
    this.nav.setRoot("ProfilePage");
  }

  sym(){
    this.nav.setRoot("SymptomDiaryHomePage");
  }
    
  
}