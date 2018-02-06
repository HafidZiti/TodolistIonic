import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../modules/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from "../login/login";



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor( public ofAuth: AngularFireAuth,
               public navCtrl: NavController,
               public navParams: NavParams) {
  }

  async register(user : User){
    try {
    const result = await this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result){
        this.navCtrl.push(LoginPage);
      }
    }catch (e) {
      console.error(e);
    }
  }
}
