import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  todaData_recive;
  completeORnot;

  constructor(private view: ViewController, public navParams: NavParams) {
  }


  chargeData() {
    console.log("donnée changées", this.todaData_recive);
    this.view.dismiss(this.todaData_recive);
  }

  ionViewWillLoad() {
    let data = this.navParams.get('dataName');
    console.log('message receve', data);
    this.completeORnot = data.complete;
    this.todaData_recive = data;
  }

  closeModal() {
    this.view.dismiss(null);
  }


}
