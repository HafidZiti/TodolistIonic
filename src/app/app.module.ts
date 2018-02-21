import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Item} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TodoServiceProvider} from "../services/todo-liste";
import {ItemesPage} from "../pages/itemes/itemes";
import { AngularFireModule } from 'angularfire2';
import {FIREBASE_ِCONFIG} from "./app.firebase.config";
import{AngularFireAuthModule} from 'angularfire2/auth';
import{AngularFireDatabaseModule} from 'angularfire2/database';
import {LoginPage} from "../pages/login/login";
import { ServicesFirebaseSeviceProvider } from '../services/services-firebase';
import { PipesModule }    from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
      ContactPage,
    HomePage,
    TabsPage,
    ItemesPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_ِCONFIG),
    AngularFireDatabaseModule,
    PipesModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ItemesPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesFirebaseSeviceProvider
  ]
})
export class AppModule {}
