import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule} from '@ionic/storage';
import { RegPage } from '../pages/reg/reg';
import { SymptomDiaryHomePage } from '../pages/symptom-diary-home/symptom-diary-home';
<<<<<<< HEAD
import { RemindersPage } from '../pages/reminders/reminders';
import { ProfilePage } from '../pages/profile/profile';
=======
import { ProfilePage } from '../pages/profile/profile';
import { RemindersPage } from '../pages/reminders/reminders';
>>>>>>> 6373dcf711286cc719642bd27e41e7eb6d76bda6

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegPage,
    SymptomDiaryHomePage,
<<<<<<< HEAD
    RemindersPage,
    ProfilePage
=======
    ProfilePage,
    RemindersPage

    
    
>>>>>>> 6373dcf711286cc719642bd27e41e7eb6d76bda6
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegPage,
    SymptomDiaryHomePage,
<<<<<<< HEAD
    RemindersPage,
    ProfilePage
=======
    ProfilePage,
    RemindersPage
>>>>>>> 6373dcf711286cc719642bd27e41e7eb6d76bda6
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
