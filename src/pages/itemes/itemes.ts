import {Component} from '@angular/core';
import {Modal, AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TodoServiceProvider} from "../../services/todo-liste";
import {TodoItem, TodoList} from "../../modules/Todoliste";
import get = Reflect.get;
import {ServicesFirebaseSeviceProvider} from "../../services/services-firebase";

@Component({
  selector: 'page-itemes',
  templateUrl: 'itemes.html',
})

export class ItemesPage {

  public CurrenetList: TodoList;
  public name_liste;
  public liste_items: Set<TodoItem>;
  public display_edit: boolean = false;

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public serviceliste: TodoServiceProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private serviceFire: ServicesFirebaseSeviceProvider,
              public modalCtrl: ModalController) {

    this.CurrenetList = navParams.get("details");

    // this.liste_items=this.CurrenetList.items;
  }


  ngOnInit() {
    this.getItemsOfList();
  }

  getItemsOfList() {
    this.serviceFire.GetItemsList(this.CurrenetList).subscribe(data => {
      if (data.items) {
        console.log('bien execute', data.items);
        this.liste_items = data.items;
      }
      else {
        this.liste_items = new Set();
      }
    })
  }

  private openModal(id_liste, uuid, name, desc, complete) {
    let myData =
      {
      id_liste: id_liste,
      uuid: uuid,
      name: name,
      desc: desc,
      complete: complete
      }
    const myModal: Modal = this.modalCtrl.create('ModalPage', {dataName: myData});
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        let edit_item: TodoItem = {uuid: data.uuid, name: data.name, desc: data.desc, complete: data.complete};
        this.serviceFire.updateItemFromList(this.CurrenetList, edit_item);
        //this.serviceliste.editTodo(id_liste, edit_item);
      }
    }));
  }


  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }


  btn_add_clicked(id_liste: string) {
    let prompt = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a name for this new Task you're so keen on adding",
      inputs: [
        {
          name: 'titre',
          placeholder: 'Titre'
        },
        {
          name: 'desc',
          placeholder: 'Description ...'
        }
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
            this.serviceFire.insertItemFire(this.CurrenetList, data);
            console.log('Saved clicked');
            console.log(data.title);

            this.showToast('middle', 'Tâche bien ajoutée!!');
          }
        }
      ]
    });
    prompt.present();
  }

  public removeTodo(id_item) {

    let prompt = this.alertCtrl.create({
      title: 'Delete Item',
      message: "Are you sure you want to delete this Item?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Yes',
          handler: _ => this.serviceFire.removeItemFromList(this.CurrenetList, id_item)
            .then(_ => {
              this.getItemsOfList();
              this.showToast('middle', 'successful removal')
            })
            .catch(err => console.log("Deletion is not successful"))
        }]
    });
    prompt.present();


  }

  public JusteToEdit(id_liste, uuid, name, desc, complete) {
    let prompt = this.alertCtrl.create({
      title: 'Edit Task',
      message: "Enter a name for this new Task you're so keen on adding",
      inputs: [
        {
          name: 'name',
          value: name
        },

        {
          name: 'desc',
          value: desc
        },

        {
          name: 'name',
          value: 'slam'
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
