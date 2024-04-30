import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../groceries-service/groceries-service';
import { AlertController } from '@ionic/angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public http: HttpClient, public dataService: GroceriesServiceProvider, public alertCtrl: AlertController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  async showPrompt(item?, index?) {
    const prompt = await this.alertCtrl.create({
      header: item ? "Edit item" : "Add New item",
      message: item ? "Edit item in the list" : "Please Add New Item",
      inputs: [
        {
          name: "name",
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: "section",
          placeholder: 'Section',
          value: item ? item.section : null
        },
        {
          name: "quantity",
          placeholder: 'Quantity',
          value: item ? item.quantity : null
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
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    await prompt.present();
  }

}
