import { SymptomDiaryHomePage } from './../pages/symptom-diary-home/symptom-diary-home';
import { ReminderHomePageModule } from './../pages/reminder-home/reminder-home.module';
import { HomeModule } from './../pages/home/home.module';
import { RegPageModule } from './../pages/reg/reg.module';
import { SymptomDiaryHomePageModule } from '../pages/symptom-diary-home/symptom-diary-home.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule} from '@ionic/storage';
import { WordpressService } from '../services/wordpress.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
<<<<<<< HEAD
import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';
import { ReminderHomePage } from '../pages/reminder-home/reminder-home';
=======
>>>>>>> 0b1d8e0a81a85f2afa3d12d930f91abc3d0d18da



@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    PrimaryTabsPage,
    // ReminderHomePage,
    // SymptomDiaryHomePage
        
=======
>>>>>>> 0b1d8e0a81a85f2afa3d12d930f91abc3d0d18da
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SymptomDiaryHomePageModule,
    ReminderHomePageModule,
    RegPageModule,
    HomeModule,

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    PrimaryTabsPage,
    ReminderHomePage,
    SymptomDiaryHomePage
=======
>>>>>>> 0b1d8e0a81a85f2afa3d12d930f91abc3d0d18da
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    NativeStorage,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
