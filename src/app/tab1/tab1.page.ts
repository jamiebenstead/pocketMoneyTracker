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
   *  *Notifications -  This is the key area. Get this sorted so basic function of the app is working, then work on additional features like tracking...
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

  editChildDiv = false;

  children = [];
  childName = '';
  amount = null;

  onLoadGetChildren(){
    this.nativeStorage.getItem("Children")
      .then(
          data => this.children = data,
          error => console.error(error)
    );
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
      amount: this.amount.toFixed(2)
    }

    this.children.push(child);
    console.log(this.children);

    this.nativeStorage.setItem("Children", this.children)
      .then(
        () => console.log("Stored - name: " + this.childName + " Amount: " +this.amount.toFixed(2)),
        error => console.error("Error storying item - " + error),
      );
      this.back();
  }

  editName = ''
  editAmount = ''

  editChild(sender){
    this.editName = sender.name;
    this.editAmount = sender.amount;

    this.editChildDiv = true;
    this.showChildrenView = false;

    this.createChildButtonDiv = false;
    this.saveOrBackButtonDiv = true;
  }

  
  //*Navigation functions
  back(){
    this.showChildrenView = true;
    this.editChildDiv = false;
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
      data => console.log(data),
      error => console.error(error)
    );
  }   
}
