import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

 

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  deleteItem(item, index) {
    console.log("removing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing Item - " + index + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.deleteItem(index);
    
  }

  shareItem(item, index) {
    console.log("Sharing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: "Sharing Item - " + index + "...",
      duration: 3000
    });
    toast.present();
    var options ={
      message: "Grocery Item - Name : " + item.name + " - Quantity: " + item.Quantity + " - Section: " + item.Section,
      subject: "Shared via Groceries app"
    }
   
    this.socialSharing.shareWithOptions(options).then(() => {
    console.log("Item was Shared!!!!");

   }).catch((error) => {
    console.error("Error Sharing ", error);
   })
    
  }


  editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = this.toastCtrl.create({
      message: "Editing Item - " + index + "...",
      duration: 3000
    });
    toast.present();

    this.inputService.showPrompt(item, index);
  }

  addItem() {
    console.log("Add new item");
    this.inputService.showPrompt();
  }

  
}

