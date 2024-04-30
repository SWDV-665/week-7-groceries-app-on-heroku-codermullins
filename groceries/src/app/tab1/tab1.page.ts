import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GroceriesServiceProvider } from 'src/providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from 'src/providers/input-dialog-service/input-dialog-service';
import { Share } from '@capacitor/share';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  title = "Grocery List";

  items: any[];
  errorMessage: string;
  dataChangedSubscription: Subscription;
  
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController,public dataService: GroceriesServiceProvider, public inputService: InputDialogServiceProvider) {
    this.dataChangedSubscription = dataService.dataChanged$.subscribe((dataChanged: boolean) =>{
      this.loadItems();
    })
  }

  ionViewDidEnter() {
    this.loadItems()
  }

  ionViewDidLeave() {
    if(this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  loadItems() {
   this.dataService.getItems()
    .subscribe(
      items => this.items =items,
      error => this.errorMessage =<any>error);
  }

  deleteItem(id) {
    this.dataService.deleteItem(id);
  }

  async shareItem(item, index) {
    console.log("Sharing item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Sharing Item - " + index + "...",
      duration: 3000
    });
    toast.present();
    const options ={
      text: "Grocery Item - Name : " + item.name + " - Quantity: " + item.Quantity + " - Section: " + item.Section,
      subject: "Shared via Groceries app"
    }
   
    await Share.share(options).then(() => {
    console.log("Item was Shared!!!!");

   }).catch((error) => {
    console.error("Error Sharing ", error);
   });
    
  }


  async editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Editing Item - " + item._id + "...",
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
