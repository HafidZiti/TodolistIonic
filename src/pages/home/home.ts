import {Component} from '@angular/core';
import {IonicPage, AlertController, NavController, ToastController, Item} from 'ionic-angular';
import {TodoServiceProvider} from "../../services/todo-liste";
import {TodoItem, TodoList} from "../../modules/Todoliste";
import {ItemesPage} from "../itemes/itemes";
import {AngularFireAuth} from "angularfire2/auth";

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ServicesFirebaseSeviceProvider} from "../../services/services-firebase";
//import {ToArrayPipe} from "../../pipes/to-array/to-array";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Todos: TodoList[];

  constructor(private ofAuth: AngularFireAuth,
              private toost: ToastController,
              private db: AngularFireDatabase,
              public service: TodoServiceProvider,
              private serviceFire: ServicesFirebaseSeviceProvider,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
             // private arraypipe : ToArrayPipe,
              public serviceliste: TodoServiceProvider) {
  }

  ngOnInit() {
    this.getTodoLists();
    //console.log("for test", this.Todos);
  }

  getTodoLists() {
    console.log("data01",this.Todos);
    this.serviceFire.getListsFire().subscribe(data => {this.Todos = data;});
   console.log("data",this.Todos);
   /* for (let todo of this.Todos){
      console.log("ach hada", todo.name);
    }*/
  }

  ionViewWillLoad() {
    this.ofAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.presentToast('Bienvenue dans Todolliste ' + data.email);
      }
      else {
        this.presentToast('vous n\'êtez pas authentifié');
      }
    });
  }

  nbr_non_fini(Items): number {
  //  let Items = this.array_pipe.transform(items);

    let compteur = 0;
    if (Items != null) {
      for (let t of  Items) {

        if (!t.complete) {
          compteur++;
        }
      }
      return compteur;
    } else {
      return -1;
    }
  }

  itemSelected(todo: string) {
    console.log("Selected Item", todo);
  }


    onloadItemsPage(_todoliste: TodoList) {
    this.navCtrl.push(ItemesPage, {details: _todoliste});
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
            this.serviceFire.insertListeFire(data.title)
              .then(_ => this.presentToast('List succesfuly added'))
              .catch(err => this.presentToast('Something wrong happened'))
          }
        }
      ]
    });
    prompt.present();
  }

  presentToast(message: string) {
    let toast = this.toost.create({
      message: message,
      duration: 3000,
      cssClass: "text-center",
    });
    toast.present();
  }


}
