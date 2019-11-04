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
    //this.getSchedule();
  }

  init(){
    console.log("init func");
  }

  amount;
  schedule;
  time;
  
  daily;
  weekly;

  getSchedule(){
    NativeStorage.getItem('schedule')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  setSchedule(){
    //this.schedule = true;
    console.log(this.schedule);
    if(this.schedule === 'daily'){
      this.daily = true;
      this.weekly = false;
    } 
    if(this.schedule === 'weekly'){
      this.daily = false;
      this.weekly = true;
    }
  }

  saveSettings(){
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
    console.log(this.schedule);
    console.log(this.time);
  }

}
