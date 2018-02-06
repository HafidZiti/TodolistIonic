import { Component } from '@angular/core';
import {Modal, AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TodoServiceProvider} from "../../services/todo-liste";
import {TodoItem} from "../../modules/Todoliste";
import get = Reflect.get;

@Component({
  selector: 'page-itemes',
  templateUrl: 'itemes.html',
})

export class ItemesPage {

  public id_liste;
  public name_liste;
  public liste_items : TodoItem[];
  public display_edit:boolean=false;

   testCheckboxOpen: boolean;
   testCheckboxResult;

  constructor(public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public serviceliste:TodoServiceProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

        this.id_liste = navParams.get("id");
        this.name_liste = navParams.get("name");
        serviceliste.getTodos(this.id_liste).subscribe(data=>this.liste_items=data);
        console.log(this.liste_items);
  }

  private openModal(id_liste,uuid,name,desc,complete) {
    let myData = {
      id_liste: id_liste,
      uuid : uuid,
      name : name,
      desc : desc,
      complete : complete
    }
    const myModal : Modal = this.modalCtrl.create('ModalPage', {dataName : myData});
    myModal.present();

    myModal.onDidDismiss((data => {
      console.log('OKK',data);
        if (data!=null)
        {
            let edit_item:TodoItem = {uuid:data.uuid, name: data.name, complete:data.complete};
            this.serviceliste.editTodo(id_liste,edit_item);
        }
    }));

  }


  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Tâche bien ajoutée!!',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }


  btn_add_clicked(id_liste:string) {
    let prompt = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a name for this new Task you're so keen on adding",
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

              this.serviceliste.addTodo(id_liste, data.title);
              console.log('Saved clicked');
              console.log(data.title);

              this.showToast('middle');
          }
        }
      ]
    });
    prompt.present();
  }

  public removeTodo(id_liste:string,uuid_todo:string){
    this.serviceliste.deleteTodo(id_liste,uuid_todo);
  }


  public JusteToEdit(id_liste,uuid,name,desc,complete){
        let prompt = this.alertCtrl.create({
          title: 'Edit Task',
          message: "Enter a name for this new Task you're so keen on adding",
          inputs: [
            {
              name: 'name',
              value:name
            },

            {
              name: 'desc',
              value:desc
            },

            {
              name: 'name',
              value:'slam'
            },

            {
              name: 'getLink',
              label: 'Get verification link again ?',
              type: "checkbox",
              checked: complete
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

               // this.serviceliste.addTodo(id_liste, data.title);
                console.log('Saved clicked');
                console.log(data);

                //this.showToast('middle');
              }
            }
          ]
        });
        prompt.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
