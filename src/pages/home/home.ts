import { Component } from '@angular/core';
import {IonicPage,AlertController, NavController, ToastController} from 'ionic-angular';
import {TodoServiceProvider} from "../../services/todo-liste";
import {TodoItem, TodoList} from "../../modules/Todoliste";
import {ItemesPage} from "../itemes/itemes";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Todos:TodoList[];


  constructor(private ofAuth:AngularFireAuth,
              private toost : ToastController,
    public service:TodoServiceProvider, public navCtrl: NavController, public alertCtrl:AlertController, public serviceliste:TodoServiceProvider) {
    service.getList().subscribe(data=>this.Todos=data);
  }


  ionViewWillLoad(){
      this.ofAuth.authState.subscribe(data=>{
        if(data && data.email && data.uid){
          this.toost.create({
            message:'Bienvenue dans Todolliste ${data.email}',
            duration : 3000
          }).present();
        }
        else {
          this.toost.create({
            message:'vous n\'êtez pas authentifié',
            duration: 3000
          }).present();
          }
      });
  }

  nbr_non_fini(lists:TodoItem[]):number
  {
    let compteur = 0;
    if (lists.length!=0){
      for ( let t of  lists){
        if (!t.complete)
        {
          compteur++;
        }
      }
      return compteur;
    }else {
      return -1;
    }

  }

  itemSelected(todo: string) {
    console.log("Selected Item", todo);
  }


  onloadItemsPage(param, name:string){
     this.navCtrl.push(ItemesPage, {id:param,name:name});
  }


  btn_add_clicked() {
    let prompt = this.alertCtrl.create({
      title: 'New Liste',
      message: "Enter a name for this new List you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            this.serviceliste.addList(data.title);
            console.log('Saved clicked');
            console.log(data.title);

            //this.showToast('middle');
          }
        }
      ]
    });
    prompt.present();
  }



}
