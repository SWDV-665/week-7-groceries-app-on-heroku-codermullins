import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  items = [
    {
      name: "Milk",
      section: "Dairy",
      quantity: 1
    },
    {
      name: "Steak",
      section: "Meat",
      quantity: 4
    },
    {
      name: "Rice",
      section: "International",
      quantity: 4
    },
    {
      name: "Chips",
      section: "Snacks",
      quantity: 2
    }
  ]

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  deleteItem(item, index) {
    console.log("removing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing Item - " + index + "...",
      duration: 3000
    });
    toast.present();

    this.items.splice(index, 1);
  }

  addItem() {
    console.log("Add new item");
    this.showAddItemPrompt();
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add new item",
      message: "Enter a new item for the list",
      inputs: [
        {
          name: "name",
          placeholder: 'Name'
        },
        {
          name: "section",
          placeholder: 'Section'
        },
        {
          name: "quantity",
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Canceled");
          }
        },
        {
          text: "Save",
          handler: item => {
            console.log("Saved clicked", item);
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }
}

