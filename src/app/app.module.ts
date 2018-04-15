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
import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';



@NgModule({
  declarations: [
    MyApp,
    PrimaryTabsPage    
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
    PrimaryTabsPage,
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
