import { LogoutPage } from './../pages/logout/logout';
import { RegPageModule } from './../pages/reg/reg.module';
import { FaqsPage } from './../pages/faqs/faqs';
import { PostPage } from './../pages/post/post';
import { SymptomDiaryHomePageModule } from '../pages/symptom-diary-home/symptom-diary-home.module';
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
import { ProfilePage } from '../pages/profile/profile';
import { RemindersPage } from '../pages/reminders/reminders';
import { WordpressService } from '../services/wordpress.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // RegPage,
    // SymptomDiaryHomePage,
    ProfilePage,
    RemindersPage,
    PostPage,
    FaqsPage,
    LogoutPage

    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SymptomDiaryHomePageModule,
    RegPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegPage,
    SymptomDiaryHomePage,
    ProfilePage,
    RemindersPage,
    PostPage,
    FaqsPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    NativeStorage,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
