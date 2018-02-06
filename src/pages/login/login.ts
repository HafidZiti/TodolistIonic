import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../modules/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {tryCatch} from "rxjs/util/tryCatch";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user  = {} as User;

  constructor(private ofAuth:AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  login(user:User){
    try {
      const result = this.ofAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if (result){
        this.navCtrl.push(HomePage);

      }
    }catch (e)
    {
      console.error(e)
    }

  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}
