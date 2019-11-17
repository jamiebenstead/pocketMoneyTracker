import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * TODO - 
   *  *Amount to 2 decimal places.
   *  *Notifications
   *  *Record money logged
   *  *View record of a child
   *  *Delete/Edit record of a child
   */

  constructor(private nativeStorage: NativeStorage, public plt: Platform) {
    plt.ready().then(() => {
      console.log("ready");
      this.onLoadGetChildren();
      //this.clearData();
    });
  }

  showChildrenView = true;
  createChildForm = false;

  createChildButtonDiv = true;
  saveOrBackButtonDiv = false;

  children = [];
  childName = '';
  amount = null;

  onLoadGetChildren(){
    this.nativeStorage.getItem("Children")
      .then(
          data => this.children = data,//this.returnedData(data),
          error => console.error(error)
    );
  }

  //!Poss unneeded function
  returnedData(data){
    this.children = data;
  }

  createChild(){
    this.showChildrenView = false;
    this.createChildForm = true;

    this.createChildButtonDiv = false;
    this.saveOrBackButtonDiv = true;
  }

  save(){
    var child = {
      name: this.childName,
      amount: this.amount
    }

    this.children.push(child);
    console.log(this.children);

    this.nativeStorage.setItem("Children", this.children)
      .then(
        () => console.log("Stored - name: " + this.childName + " Amount: " +this.amount),
        error => console.error("Error storying item - " + error),
      );
      this.back();
  }

  
  //*Navigation functions
  back(){
    this.showChildrenView = true;
    this.createChildForm = false;

    this.createChildButtonDiv = true;
    this.saveOrBackButtonDiv = false;
  }

  resetFields(){
    this.childName = '';
    this.amount = null;
  }

  //*Testing functions
  getItem(){
    this.nativeStorage.getItem("Children")
      .then(
        data => console.log(data),
        error => console.error(error)
    );
  }

  clearData(){
    console.log("data cleared...");
    this.nativeStorage.clear()
    .then(
      data => this.returnedData(data),
      error => console.error(error)
    );
  }   
}
