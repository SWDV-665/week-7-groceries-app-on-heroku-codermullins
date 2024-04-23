import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing'
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  items = [];
  errorMessage: string;
  dataChangedSubscription: Subscription;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public inputService: InputDialogServiceProvider, public socialSharing: SocialSharing, public dataService: GroceriesServiceProvider) {
    this.dataChangedSubscription = dataService.dataChanged$.subscribe((dataChanged: boolean) => {

        this.loadItems();

    })
  }


  ionViewDidLoad() {
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
   });
    
  }


  editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = this.toastCtrl.create({
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

