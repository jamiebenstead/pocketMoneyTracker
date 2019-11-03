import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {
    nativeStorage: NativeStorage;

    this.getAmount();
  }

  init(){
    console.log("init func");
  }

  amount;
  time;

  testFunc(){
    console.log(this.amount);
    console.log("testFunc");
    
    NativeStorage.setItem('amount', this.amount)
      .then(
        () => console.log("Stored: " + this.amount),
        error => console.error("Error storing amount", error)
    );
  }

  getAmount(){
    NativeStorage.getItem('amount')
      .then(
        data => { this.amount = data},
        error => console.error(error)
    );
  }

  logValues(){
    console.log(this.amount);
    console.log(this.time);
  }

}
